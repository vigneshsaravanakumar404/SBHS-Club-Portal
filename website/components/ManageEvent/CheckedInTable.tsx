import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

interface CheckedInTableProps {
  checkedIn?: any[];
}

export default function CheckedInTable(props: CheckedInTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.checkedIn?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-semibold">{item.user.email}</TableCell>
            <TableCell>{item.user.name}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>{convertDateToString(item.time, true)}</TooltipTrigger>
                  <TooltipContent>
                    <p>{convertDateToString(item.time, false)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function convertDateToString(date: Date, timeOnly: boolean = false) {
  // Convert to EST
  //date.setHours(date.getHours() - 5);

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
    timeZone: "America/New_York",
  };

  let options2 = {
    hour: "numeric",
    minute: "numeric",
  };

  // @ts-ignore
  let dateString = new Intl.DateTimeFormat("en-US", timeOnly ? options2 : options).format(date);

  return dateString;
}
