"use client";
import * as React from "react"
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Header from "./../Header";
import Footer from "./../Footer";
require("./style.css");


const acceptedIPs = "50.206.77.";

export function Body() {

    const [ip, setIp] = useState<string>("");
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIp(data.ip));
    }, []);
    const trigger = !ip.startsWith(acceptedIPs);
    const { data: session } = useSession();

    if (session) {

        const { user } = session;
        const name = user?.name ?? 'Anonymous';
        const image = user?.image ?? 'https://cdn-icons-png.flaticon.com/512/20/20079.png';

        return (
            <div className="body">
                <p>Your ip is {ip}</p>
                {trigger ? <p>Unauthorized</p> : null}
                {!trigger ? <p>Authorized</p> : null}
            </div>
        );
    }
    return null;

}


export default function Page() {
    const { data: session } = useSession();

    if (session === null) {
        redirect("/");
    } else {
        return (
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        );
    }
}