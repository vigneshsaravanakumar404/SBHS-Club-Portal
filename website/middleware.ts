import { withAuth } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard/:path*", "/checkin"],
};

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: "/",
        error: "/",
    },
    callbacks: {},
});
