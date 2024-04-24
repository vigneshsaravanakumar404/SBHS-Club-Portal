import { getServerSession } from "next-auth/next";

export default async function Home() {
  const user = await getServerSession()
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}
