"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const session = useSession();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        if (!session.data) signIn("google", { callbackUrl: "/dashboard" });
        else router.push("/dashboard");
      }}
      variant="outline"
      className="flex flex-row justify-center items-center gap-2 px-8 py-8"
    >
      <Image src={"google_logo.svg"} width={28} height={28} alt={""}></Image>
      <span className="text-xl dark:text-white">Login with Google</span>
    </Button>
  );
}
