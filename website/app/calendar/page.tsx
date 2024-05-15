"use client"
import * as React from "react"
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import UnenrollButton from "@/components/Dashboard/UnenrollButton";
import { Calendar } from "@/components/ui/calendar"

function Body() {

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
    <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
    />
    )
}
  
  
export default function Page() {
return (
    <div>
    <Header />
    <Footer />
    </div>
);
}