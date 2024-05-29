"use client"
import { Separator } from "@/components/ui/separator";
import { TfiFullscreen } from "react-icons/tfi";
import { QRCode } from "react-qrcode-logo";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import useWindowSize from "@/lib/useWindowSize";

interface ViewCodeProps {
  host?: string
  code?: string
}

export default function ViewCode({host, code, ...props}: ViewCodeProps) {
  const windowSize = useWindowSize();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="gap-2">
            <TfiFullscreen /> Display Code
          </Button>
        </DialogTrigger>
        <DialogOverlay style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(3px)" }} />
        <DialogContent className="min-w-[66vw] min-h-[50vh] max-w-[90vw] px-8 py-8">
          <div className="flex flex-row w-full justify-evenly items-center overflow-auto">
            <div className="flex flex-col items-center max-w-[50%] gap-6 h-fit">
              <h3 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-light break-all">Check In</h3>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold">{code}</h1>
              <h3 className="text-l sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-light break-all">{`${host}/checkin`}</h3>
            </div>
            {windowSize.width >= 768 && <Separator orientation="vertical" />}
            {host && windowSize.width >= 768 && <QRCode value={`http://${host}/checkin?code=${code}`} size={Math.min(500, windowSize.width / 3)} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
