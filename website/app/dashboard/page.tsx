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
require("./style.css");




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
                    <li><a href="\dashboard">Home</a></li>
                    <li><a href="\dashboard">About</a></li>
                    <li><a href="\dashboard">Services</a></li>
                    <li><a href="\dashboard">Contact</a></li>
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
    return (
        <div>
            {Header()}
        </div>
    );
}
