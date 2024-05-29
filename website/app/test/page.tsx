"use client";
import { useState, useEffect } from 'react';

const acceptedIPs = ["173.63.234."];

export default function Page() {


    const [ip, setIp] = useState<string>("");
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setIp(data.ip));
    }, []);
    const trigger = !acceptedIPs.includes(ip);


    return (
        <div>
            <p>Your ip is {ip}</p>
            {trigger ? <p>Unauthorized</p> : null}
            {!trigger ? <p>Authorized</p> : null}
        </div>
    );
}