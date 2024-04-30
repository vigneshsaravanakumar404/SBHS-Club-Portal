import { withAuth } from "next-auth/middleware"



export const config = {
  matcher: '/clubs/:path*',
}

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {}
})

