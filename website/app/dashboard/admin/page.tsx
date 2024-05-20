import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GrAdd, GrPowerReset } from "react-icons/gr";

export default function AdminPage() {
  return (
    <div className="flex justify-center min-h-screen flex-row gap-3 flex-wrap">
      <Card className="w-fit px-3 h-fit py-3">
        <CardTitle>Create Association</CardTitle>
        <CardDescription>Create verified associations</CardDescription>
        <CardContent>
          <Input type="text" placeholder="Name of Organization"></Input>
        </CardContent>
      </Card>
    </div>
  );
}
