"use client";
import GetEventDashboardData from "@/lib/actions/GetEventDashboardData";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { Button } from "@/components/ui/button";

export default function Export({ params }: { params: { id: string } }) {
  const router = useRouter();
  type EventType = Prisma.EventGetPayload<{
    include: { sharedWith: true; eventLogs: { include: { user: true } }; createdBy: true; associatedWith: true; checkedIn: { include: { user: true } } };
  }>;
  const [event, setEvent] = useState<EventType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEventDashboardData({ event_id: params.id });
      console.log(data.event);
      if (data.success) {
        setEvent(data.event);
      } else {
        if (data.redirect) {
          router.push("/dashboard");
        }
      }
    };

    fetchData();
    console.log(event?.checkedIn);
  }, []);

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(event?.name ?? "Event");

    // Assuming event.checkedIn is an array of objects
    const data = event?.checkedIn ?? [];

    // Create a header row
    const headers = ["Name", "Email", "Date & Time"];
    worksheet.addRow(headers);

    // Add rows
    data.forEach((item) => {
      worksheet.addRow([item.user.name, item.user.email, item.time]);
    });

    // Write buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Start file download
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button onClick={() => downloadExcel()}>Download</Button>
    </div>
  );
}
