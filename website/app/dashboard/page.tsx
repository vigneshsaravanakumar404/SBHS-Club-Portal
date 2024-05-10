import * as React from "react";
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";


const clubs = [
  {
    "name": "Computer Science Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Computer Science Club is a student organization at the SBHS that aims to foster a community of students interested in computer science.",
    "Advisor": "Dr. Sampath Kannan",
    "advisor_avatar": "https://www.cis.upenn.edu/~kannan/images/sampath.jpg"
  },
  {
    "name": "Robotics Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Robotics Club is a student organization at the SBHS that focuses on building and programming robots.",
    "Advisor": "Dr. John Smith",
    "advisor_avatar": "https://example.com/avatar.jpg"
  },
  {
    "name": "FBLA Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The FBLA Club is a student organization at the SBHS that focuses on developing leadership skills and preparing students for careers in business.",
    "Advisor": "Dr. Jane Doe",
    "advisor_avatar": "https://example.com/avatar.jpg"
  },
  {
    "name": "Model United Nations Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Model United Nations Club is a student organization at the SBHS that simulates United Nations conferences and promotes global awareness and diplomacy.",
    "Advisor": "Dr. John Doe",
    "advisor_avatar": "https://example.com/avatar.jpg"
  },
  {
    "name": "Computer Science Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Computer Science Club is a student organization at the SBHS that aims to foster a community of students interested in computer science.",
    "Advisor": "Dr. Sampath Kannan",
    "advisor_avatar": "https://www.cis.upenn.edu/~kannan/images/sampath.jpg"
  },
  {
    "name": "Robotics Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Robotics Club is a student organization at the SBHS that focuses on building and programming robots.",
    "Advisor": "Dr. John Smith",
    "advisor_avatar": "https://example.com/avatar.jpg"
  },
  {
    "name": "FBLA Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The FBLA Club is a student organization at the SBHS that focuses on developing leadership skills and preparing students for careers in business.",
    "Advisor": "Dr. Jane Doe",
    "advisor_avatar": "https://example.com/avatar.jpg"
  },
  {
    "name": "Model United Nations Club",
    "image": "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXB1dGVyJTIwc2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": "The Model United Nations Club is a student organization at the SBHS that simulates United Nations conferences and promotes global awareness and diplomacy.",
    "Advisor": "Dr. John Doe",
    "advisor_avatar": "https://example.com/avatar.jpg"
  }
]

function Body() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {clubs.map((club) => (
        <div key={club.name} className="max-w-sm rounded overflow-hidden shadow-lg border border-white">
          <img className="w-full" src={club.image} alt={club.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{club.name}</div>
            <p className="text-gray-700 text-base">{club.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{club.Advisor}</span>
          </div>
        </div>
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
