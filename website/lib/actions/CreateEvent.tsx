"use server";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db";

interface EventProps {
  name: string;
  association_id: string;
  locationIP: boolean;
  locationGEO: boolean;
}

function randomString(length: number, chars: string) {
  var result = "";
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export async function generateUniqueCode() {
  let code;
  let existingEvent;

  do {
    code = randomString(6, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    existingEvent = await prisma.event.findFirst({ where: { code: code } });
  } while (existingEvent);

  return code;
}

export default async function CreateEvent(props: EventProps) {
  const session = await getServerSession(authOption);
  var user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email }, include: { leadershipFor: true, advisorFor: true } });
  }

  if (!user || !session) {
    return { success: false, error: "Not authenticated" };
  }

  var association = null;
  if (props.association_id != "NO ASSOCIATION") {
    association = await prisma.association.findUnique({
      where: { association_id: props.association_id },
    });

    if (!association) return { success: false, error: "Not a valid association" };
  }

  let allowed = false;
  if (user?.role == "ADMIN" || user?.role == "ADVISOR")
    allowed = true;
  else if (association && (user?.advisorFor.some(a => a.association_id === props.association_id) || user?.leadershipFor.some(a => a.association_id === props.association_id)))
    allowed = true;
  else if (props.association_id == "NO ASSOCIATION" && user?.role == "TEACHER")
    allowed = true

  if (!allowed) {
    return { success: false, error: "No permissions" };
  }

  let createdBy = user?.user_id;

  let event;
  let code = await generateUniqueCode();
  if (props.association_id == "NO ASSOCIATION") {
    event = await prisma.event.create({
      data: {
        name: props.name,
        locationIP: props.locationIP,
        locationGEO: props.locationGEO,
        createdBy: { connect: { user_id: createdBy } },
        code: code,
      },
    });
  } else {
    event = await prisma.event.create({
      data: {
        name: props.name,
        associatedWith: {
          connect: { association_id: props.association_id },
        },
        locationIP: props.locationIP,
        locationGEO: props.locationGEO,
        createdBy: { connect: { user_id: createdBy } },
        code: code,
      },
    });
  }

  return { success: true, event: event };
}
