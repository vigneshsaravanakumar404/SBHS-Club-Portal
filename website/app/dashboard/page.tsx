"use client";
import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
require("./style.css");

const acceptedIPs = ["173.63.234.100"];

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/logs', label: 'Logs' },
    { href: '/dashboard', label: 'Join' }
];


function Header() {

    const { data: session } = useSession();

    if (session) {

        const { user } = session;
        const name = user?.name ?? 'Anonymous';
        const image = user?.image ?? 'https://cdn-icons-png.flaticon.com/512/20/20079.png';

        return (
            <nav className="navbar">
                <div className="nav-header">
                    <div className="logo">
                        <h1>LOGO</h1>
                    </div>
                    <button className="toggle-button">&#9776;</button> {/* Hamburger icon */}
                </div>
                <ul className="nav-links">
                    {links.map(({ href, label }) => (
                        <li key={`${href}${label}`}>
                            <a href={href}>{label}</a>
                        </li>
                    ))}
                </ul>
                <div className="avatar">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <img src={image} alt="Avatar" />
                                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-16">
                            <DropdownMenuLabel style={{ textAlign: "center" }}>{name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="button-container">
                                <Button variant="secondary" asChild style={{ width: "100%" }}>
                                    <a href="/settings">Settings</a>
                                </Button>
                                <Button variant="secondary" asChild style={{ width: "100%" }}>
                                    <a href="/logout">Logout</a>
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        );

    } else {
        return null;
    }
}

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
            {Header()}
            <p>Your ip is {ip}</p>
            {trigger ? <p>Unauthorized</p> : null}
            {!trigger ? <p>Authorized</p> : null}
        </div>
    );
}