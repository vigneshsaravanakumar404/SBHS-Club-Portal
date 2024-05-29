"use server"
import React from "react";
import { getServerSession } from "next-auth";
import { $Enums } from "@prisma/client";
import prisma from "@/lib/db";
import Header from "@/components/Dashboard/Header";
import AssociationHome from "@/components/Dashboard/AssociationHome";
import { authOption } from "../../api/auth/[...nextauth]/route";



export default async function Page(props: data) {
    const session = await getServerSession(authOption);
    let user;

    if (session?.user?.email) {
        user = await prisma.user.findFirst({
            where: { email: session.user.email },
            include: {
                leadershipFor: true,
                advisorFor: true,
                checkedIn: {
                    include: { association: true },
                },
            },
        });
    }

    // User Club Data 
    let isPartOfClub = [];
    user?.advisorFor?.forEach((association) => {
        isPartOfClub.push({ ...association, role: "advisor" });
    });
    user?.leadershipFor.forEach((association) => {
        isPartOfClub.push({ ...association, role: "leadership" });
    });
    user?.checkedIn.forEach((checkIn) => {
        isPartOfClub.push({ ...checkIn.association, role: "default" });
    });

    // All User CheckIns
    let checkIns = [];
    user?.checkedIn.forEach((checkIn) => {
        checkIns.push(checkIn);
    });

    // console.log("All CheckIns", checkIns);

    return (
        <div>
            <Header />
            <AssociationHome associatedClubs={isPartOfClub} checkInData={checkIns} />
        </div>
    );
}
