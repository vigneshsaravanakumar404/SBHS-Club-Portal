import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface SharedCardProps {
  name: string;
  description?: string;
  deletable: boolean;
  type: "association" | "user";
  onClick?: () => {};
}

export default function SharedCard(props: SharedCardProps) {
  return (
    <div className="w-96 hover:bg-muted/50 h-fit px-3 py-3 flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1 className="text-l font-semibold">{props.name}</h1>
        <h1 className="text-l font-light">{props.description}</h1>
      </div>
      {props.deletable && <Button variant="outline" className="text-l font-light" onClick={props.onClick}>Unshare</Button>}
    </div>
  );
}
