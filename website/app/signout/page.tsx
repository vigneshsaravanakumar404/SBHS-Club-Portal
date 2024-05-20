"use client"
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'


export default function SignOut() {
  const session = useSession();

  useEffect(() => {
    if (session) {
      signOut({ callbackUrl: '/' });
    } else {
      redirect("/");
    }
  }, [session]);

  return null; 
}
