"use client"

import * as React from "react"
import { IoMdSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <IoMdSunny  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <IoMoonOutline className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="items-center justify-center">
                <DropdownMenuItem onClick={() =>
                    setTheme("light")} className="dark:bg-gray-800 cursor-pointer rounded-lg">
                    <p className="">Light</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() =>
                    setTheme("dark")} className="dark:bg-gray-800 cursor-pointer rounded-lg my-1">
                    <p className="text-center">Dark</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() =>
                    setTheme("system")} className="dark:bg-gray-800 cursor-pointer rounded-lg">
                    <p className="text-center">System</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
