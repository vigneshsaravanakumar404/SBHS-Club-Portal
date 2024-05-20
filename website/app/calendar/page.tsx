import * as React from "react"
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";
import UnenrollButton from "@/components/Dashboard/UnenrollButton";
import 'rsuite/Calendar/styles/index.css';
import { Calendar } from 'rsuite';

function Body() {


    return (
        <div className="w-full">
            <Calendar/>
        </div>
    );    
}
  
  
export default function Page() {
return (
    <div>
    <Header />
    <Body />
    <Footer />
    </div>
);
}