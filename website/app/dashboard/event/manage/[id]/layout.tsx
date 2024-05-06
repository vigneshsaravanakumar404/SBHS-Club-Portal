import { authOption } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {

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
    redirect("/");
  }
  var event = await prisma.event.findFirst({ where: { event_id: params.id }, include: { sharedWith: true } });

  if (event == null) {
    redirect("/dashboard");
  }
  
  let allowed = false;

  if (user.role == "ADMIN" || user.role == "ADVISOR") allowed = true;
  else if (event?.owner_id == user.user_id) allowed = true;
  // @ts-ignore
  else if (event?.sharedWith.some((u) => u.user_id == user.user_id)) allowed = true;
  else if (user.advisorFor.some((a) => a.association_id == event?.association_id) || user.leadershipFor.some((a) => a.association_id == event?.association_id)) allowed = true;

  if (!allowed) {
    redirect("/dashboard");
  }
  return <div>{children}</div>;
}
