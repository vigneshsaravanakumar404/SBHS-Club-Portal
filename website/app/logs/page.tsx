"use client";
import * as React from "react"
import Header from "./../Header";
import Footer from "./../Footer";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
require("./style.css");


const tableData = [
    {
        unixTimeStamp: "1629871200",
        club: "Club A",
        description: "Lorem ipsum dolor sit amet",
        success: true,
    },
    {
        unixTimeStamp: "1629872400",
        club: "Club B",
        description: "Consectetur adipiscing elit",
        success: false,
    },
    {
        unixTimeStamp: "1629873600",
        club: "Club C",
        description: "Sed do eiusmod tempor incididunt",
        success: true,
    },
    {
        unixTimeStamp: "1629874800",
        club: "Club D",
        description: "Ut labore et dolore magna aliqua",
        success: false,
    },
    {
        unixTimeStamp: "1629876000",
        club: "Club E",
        description: "Ut enim ad minim veniam",
        success: true,
    },
    {
        unixTimeStamp: "1629877200",
        club: "Club F",
        description: "Quis nostrud exercitation ullamco",
        success: false,
    },
    {
        unixTimeStamp: "1629878400",
        club: "Club G",
        description: "Laboris nisi ut aliquip ex ea commodo",
        success: true,
    },
    {
        unixTimeStamp: "1629879600",
        club: "Club H",
        description: "Duis aute irure dolor in reprehenderit",
        success: false,
    },
    {
        unixTimeStamp: "1629880800",
        club: "Club I",
        description: "Excepteur sint occaecat cupidatat non proident",
        success: true,
    },
    {
        unixTimeStamp: "1629882000",
        club: "Club J",
        description: "Sunt in culpa qui officia deserunt",
        success: false,
    },
];


export function Body() {

    const { data: session } = useSession();
    if (session) {

        return (
            <div className="body">
                <Table>
                    <TableCaption>Checkin Logs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead>Club</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Success</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.unixTimeStamp}>
                                <TableCell>{row.unixTimeStamp}</TableCell>
                                <TableCell>{row.club}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell className="text-right">
                                    {row.success ? "Yes" : "No"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

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