"use server";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/db";
import { $Enums, LogType, User } from "@prisma/client";
import { generateUniqueCode } from "./CreateEvent";

interface UpdateEventProps {
  event_id: string;
  name?: string;
  locationIP?: boolean;
  locationGEO?: boolean;
  regenerateCode?: boolean;
  active?: boolean;
  sharedWith?: User[];
}

export default async function UpdateEvent(props: UpdateEventProps) {
  const session = await getServerSession(authOption);

  if (!session) return { success: false, error: "Not authenticated" };

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

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  var event = await prisma.event.findFirst({ where: { event_id: props.event_id }, include: { sharedWith: true } });
  if (!event) return { success: false, error: "Not a valid event" };

  let allowed = false;

  if (user.role == "ADMIN" || user.role == "ADVISOR") allowed = true;
  else if (event?.owner_id == user.user_id) allowed = true;
  // @ts-ignore
  else if (event?.sharedWith.some((u) => u.user_id == user.user_id)) allowed = true;
  else if (user.advisorFor.some((a) => a.association_id == event?.association_id) || user.leadershipFor.some((a) => a.association_id == event?.association_id)) allowed = true;

  if (!allowed) {
    return { success: false, error: "No valid permissions" };
  }

  const updateData: any = {};
  const logData: any = [];

  if ("name" in props) {
    updateData.name = props.name;
    logData.push({
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      type: LogType.NAME,
      description: `Updated event name to ${props.name}`,
    });
  }

  if ("regenerateCode" in props && props.regenerateCode == true) {
    console.log("RAWR");
    updateData.code = await generateUniqueCode();
    logData.push({
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      type: LogType.CODE,
      description: `Regenerated code to ${updateData.code}`,
    });
  }

  if ("locationIP" in props) {
    updateData.locationIP = props.locationIP;
    logData.push({
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      type: LogType.LOCATION,
      description: `Set require IP location to ${props.locationIP}`,
    });
  }

  if ("locationGEO" in props) {
    updateData.locationGEO = props.locationGEO;
    logData.push({
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      type: LogType.LOCATION,
      description: `Set require geo location to ${props.locationGEO}`,
    });
  }

  if ("active" in props) {
    updateData.active = props.active;
    logData.push({
      user: { connect: { user_id: user.user_id } },
      event: { connect: { event_id: event.event_id } },
      type: LogType.ACTIVE,
      description: `Set active status to ${props.active}`,
    });
  }

  await prisma.$transaction([...logData.map((log: any) => prisma.eventLog.create({ data: log })), prisma.event.update({ where: { event_id: event.event_id }, data: updateData })]);

  const updatedEvent = await prisma.event.findFirst({ where: { event_id: props.event_id }, include: { sharedWith: true } });

  return { success: true, event: updatedEvent };
}
