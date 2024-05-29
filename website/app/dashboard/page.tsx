import React from "react";
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import AssociationCard from "@/components/Dashboard/AssociationCard";
import UnenrollButton from "@/components/Dashboard/UnenrollButton";


const ClubCard = ({ club }: { club: any }) => (
  <div className="w-full max-w-sm bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>

    <div className="flex flex-col items-center pb-10">
      <img
        className="w-full h-32 mb-3 rounded-t-lg shadow-lg border-2 border-red-200 dark:border-gray-700 object-cover"
        src={club.image}
        alt={club.name}
      />

      <div className="flex flex-col items-center">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {club.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <p className="text-center p-3">{club.description}</p>
        </span>

        <div className="flex -space-x-4 rtl:space-x-reverse">
          {club.advisors.map((advisor: { avatar: string }, index: number) => (
            <img
              key={index}
              className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              src={advisor.avatar}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);


export default async function Page() {
  const session = await getServerSession(authOption);
  let user;

  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
      include: {
        leadershipFor: true,
        advisorFor: true,
        checkedIn: {
          distinct: ["association_id"],
          include: { association: true },
        },
      },
    });
  }

  const associations: ({
    association_id: string;
    name: string;
    type: $Enums.AssociationType;
    role: string;
    imageUrl?: string;
    description?: string;
  } | null)[] = [];

  user?.advisorFor?.forEach((association) => {
    associations.push({ ...association, role: "advisor" });
  });

  user?.leadershipFor.forEach((association) => {
    if (
      !associations.some(
        (a) => a?.association_id === association.association_id
      )
    ) {
      associations.push({ ...association, role: "leadership" });
    }
  });

  // Add unique checkedIn associations
  user?.checkedIn.forEach((checkIn) => {
    if (
      !associations.some(
        (a) => a?.association_id === checkIn.association?.association_id
      )
    ) {
      // @ts-ignore
      associations.push({ ...checkIn.association, role: "default" });
    }
  });

  // Remove associated with name as undefined
  associations.forEach((association, index) => {
    if (association?.name === undefined) {
      associations.splice(index, 1);
    }
  });


  return (
    <div>
      <Header />
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
          {associations.map((item, index) => (
            <AssociationCard
              key={index}
              id={item?.association_id || ""}
              title={String(item?.name)}
              role={item?.role}
              verified={true}
              imageUrl={item?.imageUrl || ""}
              description={item?.description || ""}
            />
          ))}
        </div>
        <br />
      </div>
      <Footer />
    </div>
  );
}
