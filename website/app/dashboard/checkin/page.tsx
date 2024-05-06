"use client"
import CheckIn from "@/lib/actions/CheckIn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



export default function Page() {
  const [code, setCode] = useState<string>("");
  const searchParams = useSearchParams()

  useEffect(() => {
    let tempCode: string | null = searchParams.get('code')
    if(tempCode)
      setCode(tempCode)
  }, [searchParams]);
  

  const handleSubmit = async() => {
    const response = await CheckIn({code: code});

    if(!response.success){
      alert(response.error)
    }

    // else{
    //   alert(JSON.stringify(response.checkin))
    // }

    
  }
  return <div className="flex flex-col">
    <input onChange={(e) => setCode(e.target.value)} type="text" value={code} placeholder="Enter Code"></input>
    <button onClick={() => handleSubmit()}>submit</button>
  </div>
}