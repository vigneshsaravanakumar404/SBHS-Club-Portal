"use client"
import { useSearchParams } from 'next/navigation';
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"



const UserRole = ({ role }) => {
    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-700 h-full">
            <p className="text-lg font-semibold">Role: {role}</p>
        </div>
    );
};

function missedCheckins(){
    return (
        <div className="flex justify-center items-center my-28">
        <h1 className="text-2xl">No Missed Check-ins</h1>
        </div>
    );

}



export default function AssociationHome({ associatedClubs, checkInData }){

    let [date, setDate] = React.useState<Date | undefined>(new Date())
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    let isPartOfClub = false;
    let club = "";

    for (let i = 0; i < associatedClubs.length; i++) {
        if (associatedClubs[i].association_id === name) {
            isPartOfClub = true;
            club = associatedClubs[i];
            break;
        }
    }

    let checkIns = club.checkIns;
    checkInData = checkInData.filter((checkIn) => checkIn.association_id === name);


    if (!isPartOfClub){
        return (
            <div className="flex justify-center items-center my-28">
            <h1 className="text-2xl">404 You are not part of this club! How did you get here 🤔</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
        <div className="center w-full md:w-4/5 mx-auto rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700">
            <img src={club.imageUrl} alt="Club Banner" className="w-full h-48 object-cover" />
            <div className="p-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">{club.name}</h1>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start mt-4 w-full md:w-4/5 mx-auto">
            <div className="w-full md:w-1/4">
                <UserRole role={club.role} />
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border my-5 p-2 max-w-fit"
                />
            </div>
            <div className="w-full md:w-3/4 mx-4">
                <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Check-in Data</h2>
                    <ul className="space-y-2">
                        {checkInData.map((checkIn) => (
                            <li key={checkIn.checkinentry_id} className="p-2 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-700">
                                <p className="font-semibold">{checkIn.event.name}</p>
                                <p>Time: {checkIn.time.toString()}</p>
                                <p className="font-light italic">Event ID: {checkIn.event_id}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>            
        </div>
        
    </div>
    );
}
