"use client";
import { Switch } from "@/components/ui/switch";
import UpdateEvent from "@/lib/actions/UpdateEvent";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GetEventDashboardData from "@/lib/actions/GetEventDashboardData";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import router from "next/router";
import { QRCode } from "react-qrcode-logo";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SharedCard from "@/components/SharedCard/SharedCard";

export default function EventDashboard({ params }: { params: { id: string } }) {
  type EventType = Prisma.EventGetPayload<{
    include: { sharedWith: true; eventLogs: { include: { user: true } }; createdBy: true; associatedWith: true; checkedIn: { include: { user: true } } };
  }>;
  const [event, setEvent] = useState<EventType | null | undefined>(null);
  const [host, setHost] = useState<string | null>();

  const manageDeleteUser = async (user_id: string) => {
    // purely client side
    // TODO: update on server side :(
    if (event) {
      const updatedSharedWith = event.sharedWith.filter((a) => a.user_id != user_id);
      setEvent({ ...event, sharedWith: updatedSharedWith });
      const response = await UpdateEvent({
        event_id: event.event_id,
        sharedWith: updatedSharedWith
      });
    } 
  };

  const manageAddUser = async(user_id: string) => {
    if(event) {
      const updatedSharedWith = event.sharedWith.push()
    }
  }

  const changeCode = async() => {
    if(event){
      const response = await UpdateEvent({
        event_id: event.event_id,
        regenerateCode: true
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEventDashboardData({ event_id: params.id });
      if (data.success) {
        setEvent(data.event);
      } else {
        if (data.redirect) {
          router.push("/dashboard");
        }
      }
      
    };

    setHost(window.location.host);

    fetchData();
    
  }, []);


  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col gap-2 w-11/12 mt-2 items-start">
        <h1 className="text-2xl md:text-3xl text-center font-semibold">{event?.name}</h1>
        <h1 className="text-xl md:text-2xl text-center font-normal">{event?.associatedWith?.name}</h1>
        <h1>{JSON.stringify(event?.eventLogs)}</h1>

        {/* Shared With */}
        <div className="flex flex-col gap-2">
          {event?.associatedWith && <SharedCard name={event.associatedWith.name} description={event.associatedWith.type} deletable={false} type={"association"} />}
          {event?.sharedWith?.map((item, index) => (
            <SharedCard name={item.name ?? ""} description={item.email} onClick={() => manageDeleteUser(item.user_id)} deletable={true} type={"user"} />
          ))}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event?.checkedIn?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.user.email}</TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>{convertDateToString(item.time)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+</Button>
          </DialogTrigger>
          <DialogOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(2px)" }} />
          <DialogContent className="min-w-[66vw] min-h-[50vh] max-w-fit px-8 py-8">
            <div className="flex w-full justify-evenly items-center flex-wrap overflow-auto">
              <div className="flex flex-col items-center max-w-[50%] gap-6">
                <h3 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-light break-all">Check In</h3>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold">{event?.code}</h1>
                <h3 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-light break-all">{`${host}/dashboard/checkin`}</h3>
              </div>
              <Separator orientation="vertical" />
              {host && <QRCode value={`https://${host}}/checkin?code=${event?.code}`} size={500} />}
            </div>
          </DialogContent>
        </Dialog>
        <Button onClick={(e) => changeCode()}>Regen</Button>
      </div>
    </div>
  );
}

function convertDateToString(date: Date) {
  // Convert to EST
  //date.setHours(date.getHours() - 5);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "America/New_York",
  };

  // @ts-ignore
  let dateString = new Intl.DateTimeFormat("en-US", options).format(date);

  return dateString;
}
