"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import { Association } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";

interface CreateCheckInProps {
  associations: Association[];
}

export default function CreateEvent(props: CreateCheckInProps) {
  var now: Date = new Date();
  now = new Date(now.getTime() + 30 * 60000);

  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  var timeString = `${hours}:${minutes}`;

  const [checkInName, setCheckInName] = useState("");
  const [association, setAssociation] = useState("NO ASSOCIATION");
  const [validUntil, setValidUntil] = useState(timeString);
  const [locationIP, setLocationIP] = useState(true);
  const [locationGEO, setLocationGEO] = useState(false);

  const handleSubmit = async () => {
    if(checkInName == "" || checkInName == " "){
      alert("Please select a name")
    }else{
      const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: checkInName,
          associationId: association,
          validUntil,
          locationIP,
          locationGEO,
        }),
      });
    
      if (!response.ok) {

        // Handle error
        console.error('Failed to create check in');
      } else {

        const data = await response.json()
        console.log(data)
        // Handle success
        console.log('Check in created successfully');
      }
    }
    
  };

  return (
    <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">+</Button>
          </DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            className="sm:max-w-md"
          >
            <DialogHeader>
              <DialogTitle>Create Event Check In</DialogTitle>
              <DialogDescription>Create a Check In code for students to show that they've attended your event, club meeting, or activity.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="name">Name of Event</Label>
                <Input required={true} id="name" placeholder="Event Name" onChange={(e) => setCheckInName(e.target.value)} />

                <Label htmlFor="associated">Associated With</Label>
                <Select defaultValue="NO ASSOCIATION" onValueChange={(val) => setAssociation(val)}>
                  <SelectTrigger id="associated" className="">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"NO ASSOCIATION"}><span className="font-semibold">No Association</span></SelectItem>
                    {props.associations?.map((item, index) => (
                      <SelectItem key={index} value={item.association_id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Label htmlFor="time">Valid Until</Label>
                <Input id="time" step={60} type="time" defaultValue={timeString} onChange={(e) => setValidUntil(e.target.value)} />

                <div className="flex flex-row gap-2 items-center">
                  <Checkbox id="location-ip" defaultChecked={true} onCheckedChange={(checked) => setLocationIP(checked == "indeterminate" ? false : checked)}/>

                  <Label htmlFor="location-ip">Required to be at SBHS (connected to school WiFi)</Label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Checkbox id="location-geo" defaultChecked={false} onCheckedChange={(checked) => setLocationGEO(checked == "indeterminate" ? false : checked)} />
                  <Label htmlFor="location-geo">Required to be at SBHS (device location)</Label>
                </div>
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <Button type="button" onClick={(e) => handleSubmit()} variant="default">
                Create
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
