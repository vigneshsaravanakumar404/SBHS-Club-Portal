import { IoMdRibbon } from "react-icons/io";
import { IoShield } from "react-icons/io5";
import { MdVerified } from "react-icons/md";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface AssociationCardProps {
  title?: string;
  verified?: boolean;
  role?: string;
  type?: string;
}

export default function AssociationCard(props: AssociationCardProps) {
  return (
    <Card className="max-w-96">
      <CardTitle className="flex flex-row gap-2 items-center justify-start">
        {props.title}
        {props.verified && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <MdVerified className="text-primary" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[30vw]">This association is verified and was created by the activities advisor.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {props.role == "leadership" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoMdRibbon className="text-primary" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[30vw]">You are leadership for this association.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {props.role == "advisor" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoShield className="text-primary" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[30vw]">You are an advisor for this association.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}{" "}
      </CardTitle>
      <CardContent className="flex flex-col gap-2"></CardContent>
    </Card>
  );
}
