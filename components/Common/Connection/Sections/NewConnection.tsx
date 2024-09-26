// "use client";
import CreateInvitationForm from "@/components/Forms/CreateNewInvitation/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewConnection() {
  const [] = useState();
  return (
    <>
      <div className="flex justify-evenly items-center w-full
      ">
        <CreateInvitationForm />
        <Button className="bg-[#D9D9D9] text-black">
          Accept New Invitation
        </Button>
      </div>

      {/* <Button className="bg-[#D9D9D9] text-black ">
        Create New 
      </Button> */}
    </>
  );
}
