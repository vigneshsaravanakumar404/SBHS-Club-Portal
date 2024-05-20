import React from 'react';
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { $Enums } from "@prisma/client";
import AssociationCard from "@/components/Dashboard/AssociationCard";
import UnenrollButton from "@/components/Dashboard/UnenrollButton";


const clubs = [
  {
    "id": 11232,
    "name": "Computer Science Club",
    "image": `https://media.istockphoto.com/id/1500238408/photo/program-code-development-icon-on-a-digital-lcd-display-with-reflection.webp?b=1&s=170667a&w=0&k=20&c=CfaVabgMcwwc-ijzVAxNs_Sz6q3JVPJnlQ-Py-dpuAQ=`,
    "description": "The Computer Science Club is a student organization at the SBHS that aims to foster a community of students interested in computer science.",
    "advisors": [
      {
        "name": "John Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Jane Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Alice Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }

    ],
    "board": [
      {
        "name": "Jeff Bob",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Jane Doe",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Alice Doe",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Bob Doe",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  },
  {
    "id": 23456,
    "name": "Mathematics Society",
    "image": `https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=2000%2C1500&ssl=1`,
    "description": "The Mathematics Society is dedicated to promoting interest and enthusiasm for mathematics among students at SBHS.",
    "advisors": [
      {
        "name": "Dr. Sarah Johnson",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Dr. Sarah Johnson",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Dr. Sarah Johnson",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ],
    "board": [
      {
        "name": "Michael Smith",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Emily Brown",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "David Lee",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Jennifer Clark",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  },
  {
    "id": 34567,
    "name": "Debate Club",
    "image": `https://variety.com/wp-content/uploads/2020/11/Joe-Biden-Donald-Trump-Election-Coverage-Variety-1.jpg?crop=157px%2C0px%2C831px%2C576px&resize=1000%2C667`,
    "description": "The Debate Club provides students with a platform to engage in structured debates, fostering critical thinking and public speaking skills.",
    "advisors": [
      {
        "name": "John Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Jane Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Alice Doe",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ],
    "board": [
      {
        "name": "Sophia Garcia",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Daniel Rodriguez",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Olivia Martinez",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "William Thompson",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  },
  {
    "id": 45678,
    "name": "Environmental Club",
    "image": `https://static.vecteezy.com/system/resources/previews/021/950/414/large_2x/small-tree-growing-with-sunshine-in-garden-eco-concept-free-photo.jpg`,
    "description": "The Environmental Club aims to raise awareness about environmental issues and promote sustainable practices within the school community.",
    "advisors": [
      {
        "name": "Dr. Rachel Adams",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ],
    "board": [
      {
        "name": "Emma Wilson",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Noah Johnson",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Sophie Brown",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Ethan Garcia",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  },
  {
    "id": 56789,
    "name": "Art Club",
    "image": `https://i.pinimg.com/originals/0a/b0/99/0ab09927a3e9f81653edfab3297c8cbc.png`,
    "description": "The Art Club provides a space for students to explore their creativity through various artistic mediums and activities.",
    "advisors": [
      {
        "name": "Ms. Jessica Taylor",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ],
    "board": [
      {
        "name": "Liam Wilson",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Ava Johnson",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Mia Brown",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Noah Garcia",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  },
  {
    "id": 67890,
    "name": "Robotics Club",
    "image": `https://s24806.pcdn.co/wp-content/uploads/2019/07/t9i6020_VEX_roundrobin_042719_STRUPP.jpg`,
    "description": "The Robotics Club engages students in hands-on projects and competitions to develop their skills in robotics and engineering.",
    "advisors": [
      {
        "name": "Mr. William Brown",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ],
    "board": [
      {
        "name": "Oliver Smith",
        "role": "President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Sophia Johnson",
        "role": "Vice President",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Ethan Brown",
        "role": "Secretary",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      },
      {
        "name": "Isabella Wilson",
        "role": "Treasurer",
        "avatar": `https://flowbite.com/docs/images/people/profile-picture-${Math.floor(Math.random() * 5) + 1}.jpg`
      }
    ]
  }
];


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

function Body() {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
      {clubs.map((club) => (
        <ClubCard key={club.name} club={club} />
      ))}
    </div>
  );
}


export default function Page() {
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
