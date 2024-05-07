import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import CreateEventMenu from "../CreateEvent/CreateEventMenu";
require("./style.css");

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/logs", label: "Logs" },
  { href: "/calendar", label: "Calendar" },
];

export default async function Header() {
  const session = await getServerSession(authOption);

  if (!session) return <div></div>;

  const name = session.user?.name ?? "Anonymous";
  const image = session.user?.image ?? "https://cdn-icons-png.flaticon.com/512/20/20079.png";

  var user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email }, include: { leadershipFor: true, advisorFor: true } });
  }

  var allowedToCreateEvent = false;
  if (user) {
    allowedToCreateEvent = ["ADVISOR", "TEACHER", "ADMIN"].includes(user.role) || (user.role === "DEFAULT" && (user.leadershipFor.length > 0 || user.advisorFor.length > 0));
  }
  return (
    <nav className="navbar">
      <div className="nav-header">
        <div className="logo">
          <h1>LOGO</h1>
        </div>
      </div>
      <div className="nav-links">
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="button">
        {allowedToCreateEvent && user && <CreateEventMenu associations={user.leadershipFor.concat(user.advisorFor)} />}
      </div>

      <div className="flex flex-row gap-5 items-center justify-center">
        <div className="avatar">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <img src={image} alt="Avatar" referrerPolicy="no-referrer" />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
              <DropdownMenuLabel style={{ textAlign: "center" }}>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="button-container">
                <Button variant="secondary" asChild style={{ width: "100%" }}>
                  <a href="/settings">Settings</a>
                </Button>
                <Button variant="secondary" asChild style={{ width: "100%" }}>
                  <a href="/api/auth/signout">Logout</a>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav >
  );
}
