"use server";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import prisma from "../db";

interface Props {
  event_id: string;
}

export default async function GetEventLogs(props: Props) {
  const session = await getServerSession(authOption);

  var user:
    | ({ advisorFor: { association_id: string; name: string; type: $Enums.AssociationType }[]; leadershipFor: { association_id: string; name: string; type: $Enums.AssociationType }[] } & {
        user_id: string;
        email: string;
        schoolId: string | null;
        name: string | null;
        avatar: string | null;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
      })
    | null = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email }, include: { leadershipFor: true, advisorFor: true } });
  }

  if (!session || !user) {
    return { success: false, error: "Not authenticated" };
  }
  var event = await prisma.event.findFirst({
    where: { event_id: props.event_id },
    include: { sharedWith: true, eventLogs: { include: { user: true }, orderBy: { time: "desc" } }, createdBy: true, associatedWith: true },
  });

  if (event == null) {
    return { success: false, redirect: true, error: "Not a valid checkin" };
  }

  var association = event.associatedWith;

  let allowed = false;
  if (user.role == "ADMIN" || user.role == "ADVISOR") allowed = true;
  else if (event?.owner_id == user.user_id) allowed = true;
  // @ts-ignore
  else if (event?.sharedWith.some((u) => u.user_id == user.user_id)) allowed = true;
  else if (user.advisorFor.some((a) => a.association_id == event?.association_id) || user.leadershipFor.some((a) => a.association_id == event?.association_id)) allowed = true;

  if (!allowed) {
    return { success: false, redirect: true, error: "No permissions" };
  } else {
    return { success: true, logs: event.eventLogs };
  }
}
