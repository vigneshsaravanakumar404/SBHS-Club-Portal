"use client";
import UpdateEvent from "@/lib/actions/UpdateEvent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GetEventDashboardData from "@/lib/actions/GetEventDashboardData";
import useWindowSize from "@/lib/useWindowSize";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SharedCard from "@/components/SharedCard/SharedCard";
import ViewCode from "@/components/ManageEvent/ViewCode";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { GrEdit, GrPowerCycle, GrCheckmark } from "react-icons/gr";
import { Switch } from "@/components/ui/switch";
import CheckedInTable from "@/components/ManageEvent/CheckedInTable";

export default function EventDashboard({ params }: { params: { id: string } }) {
  type EventType = Prisma.EventGetPayload<{
    include: { sharedWith: true; eventLogs: { include: { user: true } }; createdBy: true; associatedWith: true; checkedIn: { include: { user: true } } };
  }>;
  const router = useRouter();

  const [event, setEvent] = useState<EventType | null | undefined>(null);
  const [host, setHost] = useState<string | null>();

  const windowSize = useWindowSize();

  const [active, setActive] = useState<boolean | undefined>(undefined);
  const [ip, setIP] = useState<boolean | undefined>(undefined);
  const [geo, setGEO] = useState<boolean | undefined>(undefined);
  const [regenerateCode, setRegenerateCode] = useState<boolean | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  const manageDeleteUser = async (user_id: string) => {
    // purely client side
    // TODO: update on server side :(
    if (event) {
      const updatedSharedWith = event.sharedWith.filter((a) => a.user_id != user_id);
      setEvent({ ...event, sharedWith: updatedSharedWith });
      const response = await UpdateEvent({
        event_id: event.event_id,
        sharedWith: updatedSharedWith,
      });
    }
  };

  const anyUpdates = (): boolean => {
    if (!event) return false;

    if (regenerateCode) return true;
    if (active != event.active) return true;
    if (ip != event.locationIP) return true;
    if (geo != event.locationGEO) return true;
    if (name != event.name) return true;
    return false;
  };

  const manageAddUser = async (user_id: string) => {
    if (event) {
      const updatedSharedWith = event.sharedWith.push();
    }
  };

  const changeCode = async () => {
    if (event) {
      const response = await UpdateEvent({
        event_id: event.event_id,
        regenerateCode: true,
      });
    }
  };

  const editEvent = async () => {
    "use client";
    if (event) {
      const response = await UpdateEvent({
        event_id: event.event_id,
        active: active != event.active ? active : undefined,
        locationIP: ip != event.locationIP ? ip : undefined,
        locationGEO: geo != event.locationGEO ? geo : undefined,
        name: name != event.name ? name : undefined,
        regenerateCode: regenerateCode,
      });

      location.reload();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEventDashboardData({ event_id: params.id });
      if (data.success) {
        setEvent(data.event);
        setActive(data.event?.active);
        setIP(data.event?.locationIP);
        setGEO(data.event?.locationGEO);
        setName(data.event?.name);
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
        {event?.associatedWith && <h1 className="text-xl md:text-2xl text-center font-normal">{event?.associatedWith?.name}</h1>}
        <ViewCode code={event?.code ?? undefined} host={host ?? undefined} />

        <div className="flex flex-row items-top justify-start gap-72 w-full">
          <div className="max-w-[50%]">
            <CheckedInTable checkedIn={event?.checkedIn} />
          </div>
          <div className="max-w-[50%] flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl text-center font-semibold">Manage Event</h1>
            <Button variant={regenerateCode ? "secondary" : "outline"} className="gap-2" onClick={(e) => setRegenerateCode(!regenerateCode)}>
              <GrPowerCycle />
              Regenerate Code
            </Button>
            <Button variant="outline" className="gap-2">
              <GrEdit />
              Edit Name
            </Button>

            <div className="flex flex-row gap-2 items-center">
              <Switch checked={active} id="active" onCheckedChange={(b) => setActive(b)} />
              <Label htmlFor="active">CheckIn Active</Label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Switch checked={ip} id="ip" onCheckedChange={(b) => setIP(b)} />
              <Label htmlFor="ip">Check Location (IP)</Label>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Switch checked={geo} id="geo" onCheckedChange={(b) => setGEO(b)} />
              <Label htmlFor="geo">Check Location (GEO)</Label>
            </div>
            <Button variant="outline" disabled={!anyUpdates()} className="gap-2" onClick={(e) => editEvent()}>
              <GrCheckmark />
              Save
            </Button>
          </div>
        </div>
        {/* <h1>{JSON.stringify(event?.eventLogs)}</h1> */}

        {/* Shared With */}
        <div className="flex flex-col gap-2">
          {event?.associatedWith && <SharedCard name={event.associatedWith.name} description={event.associatedWith.type} deletable={false} type={"association"} />}
          {event?.sharedWith?.map((item, index) => (
            <SharedCard name={item.name ?? ""} description={item.email} onClick={() => manageDeleteUser(item.user_id)} deletable={true} type={"user"} />
          ))}
        </div>
      </div>
    </div>
  );
}
