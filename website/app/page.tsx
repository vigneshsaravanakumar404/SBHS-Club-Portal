import SignInButton from "@/components/SignInButton";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { ReactNode } from "react";

export default async function Home() {
  const session = await getServerSession();
  if(session){
    redirect("/dashboard")
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen text-gray-800">
      <div className="flex flex-col w-5/6 mx-2 items-center gap-2 md:gap-4">
        <h1 className="text-2xl md:text-3xl text-center font-semibold">Log Your</h1>
        <h1 className="text-3xl md:text-4xl text-center font-bold">South Brunswick High School</h1>
        <h1 className="text-2xl md:text-3xl text-center font-semibold">Attendance</h1>
      </div>
      <div className="mt-8 flex flex-col mx-2  items-center w-5/6 gap-2 md:gap-4">        
        <SignInButton/>
        <p className="text-center">Make sure to log in with your <GradientText>@sbschools.org</GradientText> or <GradientText>@sbstudents.org</GradientText> account</p>
      </div>
    </div>
  );
}

function GradientText({children} : {children: ReactNode}){
  return <span className="bg-gradient-to-r from-[#AA771C] via-[#B38728] to-[#BF953F] inline-block text-transparent bg-clip-text font-bold">{children}</span>
}
