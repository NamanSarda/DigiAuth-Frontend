// "use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewConnection() {
  const [] = useState();
  return (
    <>
      <Button className="bg-[#D9D9D9] text-black ">
        Create New 
      </Button>
      <Button className="bg-[#D9D9D9] text-black">Accept New Invitation</Button>
    </>
  );
}
