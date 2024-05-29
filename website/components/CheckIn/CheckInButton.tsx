import { Button } from "@/components/ui/button";

export default function CheckInButton(){

    return (
        <Button variant="default">
            <a href="/dashboard/checkin">
                <span className="hidden sm:inline">Check In</span>
                <span className="inline sm:hidden">✔</span>
            </a>
        </Button>
    )
}