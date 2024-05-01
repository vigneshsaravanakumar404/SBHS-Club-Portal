import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/lib/db'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const allowedDomains = ["gmail.com", "sbschools.org", "sbstudents.org"];

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error", // Error code passed in query string as ?error=
  //   verifyRequest: "/auth/verify-request", // (used for check email message)
  //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)},
  // },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          name: profile.name,
          avatar: profile.image
        },
        update: {
          name: profile.name,
          avatar: profile.image
        },
      });

      if (account?.provider === "google") {
        // Get the domain of the email
        const domain = profile.email.split("@")[1];

        // Check if the domain is in the allowedDomains list
        //@ts-ignore
        return profile.email_verified && allowedDomains.includes(domain);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
