"use client"
import { IoMdRibbon } from "react-icons/io";
import { IoShield } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface AssociationCardProps {
  title?: string;
  verified?: boolean;
  role?: string;
  type?: string;
}

export default function AssociationCard(props: AssociationCardProps) {
  return (
    <div className="w-full max-w-sm bg-white border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer transition duration-300 ease-in-out transform hover:scale-105" onClick={() => { window.location.href = `/dashboard/association?name=${props.id}`; }}>
      <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>

      <div className="flex flex-col items-center pb-10">
        <img
          className="w-full h-32 mb-3 rounded-t-lg shadow-lg border-2bg-gray-100 dark:border-gray-700 object-cover"
          src={props.imageUrl}
          alt={props.name}
        />

        <div className="flex flex-col items-center">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {props.title}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <p className="text-center p-3">{props.description}</p>
          </span>
          <CardTitle className="flex flex-row gap-2 items-center justify-start">
              {}
              {props.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <MdVerified className="text-primary" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[30vw]">
                      This association is verified and was created by the
                      activities advisor.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {props.role == "leadership" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoMdRibbon className="text-primary" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[30vw]">
                      You are leadership for this association.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {props.role == "advisor" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoShield className="text-primary" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[30vw]">
                      You are an advisor for this association.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
        </div>
      </div>
    </div>
  );
}
