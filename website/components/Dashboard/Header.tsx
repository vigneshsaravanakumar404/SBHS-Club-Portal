import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import CreateEventMenu from "../CreateEvent/CreateEventMenu";
import prisma from "@/lib/db";

// Constants
const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/logs", label: "Logs" },
  { href: "/calendar", label: "Calendar" },
];
const logo = "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-1/306608878_521410909795532_844824003382673361_n.jpg?stp=c0.0.180.180a_dst-jpg&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nA5uC8nI8xwQ7kNvgGANBAP&_nc_ht=scontent-iad3-1.xx&oh=00_AfDj3DQ2FZSSaBJQKGalModOAdRMHaf14Jolw2PecoP43g&oe=66427F4B";


export default async function Header() {

  const session = await getServerSession(authOption);

  if (!session) {
    return <div></div>;
  }

  const name = session.user?.name ?? "Anonymous";
  const image = session.user?.image ?? "https://cdn-icons-png.flaticon.com/512/20/20079.png";
  const email = session.user?.email ?? "Anonymous";

  var user = null;
  if (session?.user?.email) {
    user = await prisma.user.findFirst({ where: { email: session.user.email }, include: { leadershipFor: true, advisorFor: true } });
  }

  var allowedToCreateEvent = false;
  if (user) {
    allowedToCreateEvent = ["ADVISOR", "TEACHER", "ADMIN"].includes(user.role) || (user.role === "DEFAULT" && (user.leadershipFor.length > 0 || user.advisorFor.length > 0));
  }


  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="full-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="SBHS Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SBHS</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-1 rtl:space-x-reverse">

          {/* Get Started Button */}
          <div className="button">
            {allowedToCreateEvent && user && <CreateEventMenu associations={user.leadershipFor.concat(user.advisorFor)} />}
          </div>

          {/* Avatar & Drop Down */}
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

          {/* Mobile Hamburger Menu */}
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>

  );
}
