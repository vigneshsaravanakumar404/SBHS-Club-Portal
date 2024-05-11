import React from "react";
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import UnenrollButton from "@/components/Dashboard/UnenrollButton";


const clubs = [
  {
    "id": 11232,
    "name": "Computer Science Club",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Computer Science Club is a student organization at the SBHS that aims to foster a community of students interested in computer science.",
    "advisors": [
      {
        "name": "John Doe",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-1.jpg"
      },
      {
        "name": "Jane Doe",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-6.jpg"
      }
    ],
    "board": [
      {
        "name": "Jeff Bob",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-2.jpg"
      },
      {
        "name": "Jane Doe",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
      },
      {
        "name": "Alice Doe",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-4.jpg"
      },
      {
        "name": "Bob Doe",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      }
    ]
  },
  {
    "id": 23456,
    "name": "Mathematics Society",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Mathematics Society is dedicated to promoting interest and enthusiasm for mathematics among students at SBHS.",
    "advisors": [
      {
        "name": "Dr. Sarah Johnson",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-7.jpg"
      }
    ],
    "board": [
      {
        "name": "Michael Smith",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-8.jpg"
      },
      {
        "name": "Emily Brown",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-9.jpg"
      },
      {
        "name": "David Lee",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-10.jpg"
      },
      {
        "name": "Jennifer Clark",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-11.jpg"
      }
    ]
  },
  {
    "id": 34567,
    "name": "Debate Club",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Debate Club provides students with a platform to engage in structured debates, fostering critical thinking and public speaking skills.",
    "advisors": [
      {
        "name": "Professor Alex Turner",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-12.jpg"
      }
    ],
    "board": [
      {
        "name": "Sophia Garcia",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-13.jpg"
      },
      {
        "name": "Daniel Rodriguez",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-14.jpg"
      },
      {
        "name": "Olivia Martinez",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-15.jpg"
      },
      {
        "name": "William Thompson",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-16.jpg"
      }
    ]
  },
  {
    "id": 45678,
    "name": "Environmental Club",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Environmental Club aims to raise awareness about environmental issues and promote sustainable practices within the school community.",
    "advisors": [
      {
        "name": "Dr. Rachel Adams",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-17.jpg"
      }
    ],
    "board": [
      {
        "name": "Emma Wilson",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-18.jpg"
      },
      {
        "name": "Noah Johnson",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-19.jpg"
      },
      {
        "name": "Sophie Brown",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-20.jpg"
      },
      {
        "name": "Ethan Garcia",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-21.jpg"
      }
    ]
  },
  {
    "id": 56789,
    "name": "Art Club",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Art Club provides a space for students to explore their creativity through various artistic mediums and activities.",
    "advisors": [
      {
        "name": "Ms. Jessica Taylor",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-22.jpg"
      }
    ],
    "board": [
      {
        "name": "Liam Wilson",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-23.jpg"
      },
      {
        "name": "Ava Johnson",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-24.jpg"
      },
      {
        "name": "Mia Brown",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-25.jpg"
      },
      {
        "name": "Noah Garcia",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-26.jpg"
      }
    ]
  },
  {
    "id": 67890,
    "name": "Robotics Club",
    "image": "https://raw.githubusercontent.com/vigneshsaravanakumar404/skill-icons/main/icons/Python-Dark.svg",
    "description": "The Robotics Club engages students in hands-on projects and competitions to develop their skills in robotics and engineering.",
    "advisors": [
      {
        "name": "Mr. William Brown",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-27.jpg"
      }
    ],
    "board": [
      {
        "name": "Oliver Smith",
        "role": "President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-28.jpg"
      },
      {
        "name": "Sophia Johnson",
        "role": "Vice President",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-29.jpg"
      },
      {
        "name": "Ethan Brown",
        "role": "Secretary",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-30.jpg"
      },
      {
        "name": "Isabella Wilson",
        "role": "Treasurer",
        "avatar": "https://flowbite.com/docs/images/people/profile-picture-31.jpg"
      }
    ]
  }
];


const ClubCard = ({ club }: { club: any }) => (

  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>

    {/* Drop Down Menu */}
    <div className="flex justify-end px-4 pt-4">
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        id="dropdown"
        className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <UnenrollButton id={club.id} />
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col items-center pb-10">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg border-2 border-red-200 dark:border-gray-700"
        src={club.image}
        alt={club.name}
      />

      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {club.name}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        <p className="text-center p-3">{club.description}</p>
      </span>
      <div className="flex mt-4 md:mt-6">
        <a
          href="#"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add friend
        </a>
        <a
          href="#"
          className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Message
        </a>
      </div>
    </div>

  </div>
);


function Body() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
      <Body />
      <Footer />
    </div>
  );
}
