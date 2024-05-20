import * as React from "react";
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import AssociationCard from "@/components/Dashboard/AssociationCard";

export default async function Page() {
  const session = await getServerSession(authOption);
  let user;

  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
      include: { leadershipFor: true, advisorFor: true, checkedIn: { distinct: ["association_id"], include: { association: true } } },
    });
  }

  const associations: ({ association_id: string; name: string; type: $Enums.AssociationType; role: string } | null)[] = [];

  user?.advisorFor?.forEach((association) => {
    associations.push({ ...association, role: "advisor" });
  });

  user?.leadershipFor.forEach((association) => {
    if (!associations.some((a) => a?.association_id === association.association_id)) {
      associations.push({ ...association, role: "leadership" });
    }
  });

  // Add unique checkedIn associations
  user?.checkedIn.forEach((checkIn) => {
    if (!associations.some((a) => a?.association_id === checkIn.association?.association_id)) {
      associations.push({ ...checkIn.association, role: "default" });
    }
  });

  return (
    <div>
      <Header />
      <div>
        <div className="flex flex-col">
          {associations.map((item, index) => (
            <AssociationCard key={index} title={item?.name} role={item?.role} verified={true}></AssociationCard>
          ))}
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}
