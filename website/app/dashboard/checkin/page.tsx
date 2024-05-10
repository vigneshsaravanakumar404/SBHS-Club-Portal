"use client";
import CheckIn from "@/lib/actions/CheckIn";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaCircleArrowRight } from "react-icons/fa6";


import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const inputOTPStyle = "w-20 h-20 text-2xl sm:w-24 sm:h-24 sm:text-3xl md:w-28 md:h-28 md:text-4xl lg:w-32 lg:h-32 lg:text-5xl xl:w-40 xl:h-40 xl:text-6xl"

export default function Page() {
  const [code, setCode] = useState<string>("");
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();

  

  useEffect(() => {
    let tempCode: string | null = searchParams.get("code");
    if (tempCode) setCode(tempCode);
  }, [searchParams]);
  const delay = (ms: number | undefined) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async () => {
    const response = await CheckIn({ code: code });

    if (!response.success) {
      toast({
        title: "Error",
        description: response.error,
      });
    } else {
      toast({
        title: "Checked In",
        description: `You successfully checked into ${response.event?.name}`,
      });

      await delay(5000);
      router.push("/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
      <InputOTP  spellCheck={false} maxLength={6} value={code} onChange={(value) => setCode(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup >
          <InputOTPSlot className={inputOTPStyle} index={0} />
          <InputOTPSlot className={inputOTPStyle} index={1} />
          <InputOTPSlot className={inputOTPStyle} index={2} />
          <InputOTPSlot className={inputOTPStyle} index={3} />
          <InputOTPSlot className={inputOTPStyle} index={4} />
          <InputOTPSlot className={inputOTPStyle} index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button variant="default" onClick={() => handleSubmit()}className="w-1/2 h-20 text-5xl">Check In</Button>
    </div>
  );
}
