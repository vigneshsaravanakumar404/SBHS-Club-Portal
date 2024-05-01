"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db";

interface CheckInProps {
  name: string;
  association_id: string;
  createdBy?: string;
  locationIP: boolean;
  locationGEO: boolean;
}

function randomString(length: number, chars: string) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

async function generateUniqueCode() {
  let code;
  let existingCheckIn;

  do {
    code = randomString(6, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
    existingCheckIn = await prisma.checkIn.findFirst({ where: { code: code } });
  } while (existingCheckIn);

  return code;
}




export default async function CreateCheckIn(props: CheckInProps) {
  const session = await getServerSession(authOption);
  var user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email }, include: { leadershipFor: true, advisorFor: true } });
  }

  if (props.association_id != "NO ASSOCIATION") {
    let association = await prisma.association.findUnique({
      where: { association_id: props.association_id },
    });

    if (!association) return { success: false, error: "Not a valid association" };
  }

  if (!props.createdBy) {
    props.createdBy = user?.user_id;
  }

  let event;
  let code = await generateUniqueCode();
  if (props.association_id == "NO ASSOCIATION") {
    event = await prisma.checkIn.create({
      data: {
        name: props.name,
        locationIP: props.locationIP,
        locationGEO: props.locationGEO,
        createdBy: { connect: { user_id: props.createdBy } },
        code: code
      },
    });
  } else {
    event = await prisma.checkIn.create({
      data: {
        name: props.name,
        associatedWith: {
          connect: { association_id: props.association_id },
        },
        locationIP: props.locationIP,
        locationGEO: props.locationGEO,
        createdBy: { connect: { user_id: props.createdBy } },
        code: code
      },
    });
  }

  return { success: true, event: event };
}
