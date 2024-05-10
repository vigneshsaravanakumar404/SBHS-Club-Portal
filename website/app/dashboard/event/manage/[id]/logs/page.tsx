import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GetEventLogs from "@/lib/actions/GetEventLogs";
import { FaToggleOn, FaPencilAlt, FaQrcode, FaClipboard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function getIcon(type: string) {
  if (type == "ACTIVE") return <FaToggleOn />;

  if (type == "LOCATION") return <FaLocationDot />;

  if (type == "NAME") return <FaPencilAlt />;

  if (type == "CODE") return <FaQrcode />;

  return <FaClipboard />;
}

export default async function Logs({ params }: { params: { id: string } }) {
  const logs = (await GetEventLogs({ event_id: params.id })).logs;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Date/Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs?.map((log) => (
            <TableRow key={log.log_id}>
              <TableCell className="font-medium flex gap-2 flex-row items-center">
                {getIcon(log.type)}
                {log.type}
              </TableCell>
              <TableCell>{log.description}</TableCell>
              <TableCell>{`${log.user.name} (${log.user.email})`}</TableCell>
              <TableCell className="text-right">{log.time.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
