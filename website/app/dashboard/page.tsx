import * as React from "react";
import Header from "@/components/Dashboard/Header";
import Footer from "@/components/Dashboard/Footer";

// const acceptedIPs = "50.206.77.";

// export function Body() {
//   const [ip, setIp] = useState<string>("");
//   useEffect(() => {
//     fetch("https://api.ipify.org?format=json")
//       .then((response) => response.json())
//       .then((data) => setIp(data.ip));
//   }, []);
//   const trigger = !ip.startsWith(acceptedIPs);
//   const { data: session } = useSession();

//   if (session) {
//     const { user } = session;

//     return (
//       <div className="p-[20px]">
//         <p>Your ip is {ip}</p>
//         {trigger ? <p>Unauthorized</p> : null}
//         {!trigger ? <p>Authorized</p> : null}
//       </div>
//     );
//   }
//   return null;
// }

export default function Page() {
  return (
    <div>
      <Header />
      {/* <Body /> */}
      <Footer />
    </div>
  );
}
