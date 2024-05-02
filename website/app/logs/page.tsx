"use client";
import * as React from "react"
import Header from "./../Header";
import Footer from "./../Footer";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
require("./style.css");


const tableData = [
    {
        unixTimeStamp: "1629871200",
        club: "Club A",
        description: "Lorem ipsum dolor sit amet",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club B",
        description: "Consectetur adipiscing elit",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club C",
        description: "Sed do eiusmod tempor incididunt",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club D",
        description: "Ut labore et dolore magna aliqua",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club E",
        description: "Ut enim ad minim veniam",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club F",
        description: "Quis nostrud exercitation ullamco",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club G",
        description: "Laboris nisi ut aliquip ex ea commodo",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club H",
        description: "Duis aute irure dolor in reprehenderit",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club I",
        description: "In voluptate velit esse cillum",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club J",
        description: "Dolore eu fugiat nulla pariatur",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club K",
        description: "Excepteur sint occaecat cupidatat",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club L",
        description: "Non proident, sunt in culpa qui",
        success: false,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club M",
        description: "Officia deserunt mollit anim id est",
        success: true,
    },
    {
        unixTimeStamp: "1629871200",
        club: "Club N",
        description: "Laborum et dolorum fuga",
        success: false,
    }
];

export function Body() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="table">
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Club</th>
                            <th>Description</th>
                            <th>Success</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.unixTimeStamp}</td>
                                <td>{row.club}</td>
                                <td>{row.description}</td>
                                <td>{row.success ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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