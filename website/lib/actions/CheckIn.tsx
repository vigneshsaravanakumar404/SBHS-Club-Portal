"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../db";
import { headers } from "next/headers";

const acceptedIPs = "50.206.77.";
const latitudeSB = 40.373631;
const longitudeSB = -74.563698;

interface Base {
  user_id?: string;
  latitude?: number;
  longitude?: number;
}

interface WithID extends Base {
  checkin_id: string;
  code?: never;
}

interface WithCode extends Base {
  code: string;
  event_id?: never;
}

type CheckInProps = WithID | WithCode;

// TODO: add ability for association's to add users to check in manually
export default async function CheckIn(props: CheckInProps) {
  const session = await getServerSession(authOption);
  var user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email } });
  }

  if (!user || !session) {
    return { success: false, error: "Not authenticated" };
  }

  var event = null;
  if ("event_id" in props) {
    event = await prisma.event.findFirst({ where: { event_id: props.event_id }, include: {} });
  } else if ("code" in props) {
    event = await prisma.event.findFirst({ where: { code: props.code }, include: {} });
  }

  if (event == null) return { success: false, error: "A valid code or ID was not submitted." };

  if (event.active == false) {
    return { success: false, error: "This event is currently not active." };
  }

  const existingCheckInEntry = await prisma.checkIn.findFirst({
    where: {
      user_id: user.user_id,
      event_id: event.event_id,
    },
  });

  // If the user has already checked in, return an error
  if (existingCheckInEntry) {
    return { success: false, error: "You have already checked into this event." };
  }
  const ip = headers().get("x-forwarded-for");

  if (event.locationIP) {
    if (!ip?.startsWith(acceptedIPs) && ip != "::1") return { success: false, error: "You are not on the school WiFi" };
  }

  if (event.locationGEO) {
    if (getDistanceFromLatLonInKm(props.latitude ?? 0, props.longitude ?? 0, latitudeSB, longitudeSB) > 0.5)
      return { success: false, error: `You are not near SBHS. Your distance: ${getDistanceFromLatLonInKm(props.latitude ?? 0, props.longitude ?? 0, latitudeSB, longitudeSB)}` };
  }

  const checkInEntry = await prisma.checkIn.create({
    data: {
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      association: { connect: { association_id: event.association_id ?? undefined } },
    },
  });

  return { success: true, event: event };
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
