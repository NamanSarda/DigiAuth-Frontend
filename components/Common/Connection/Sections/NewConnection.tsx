"use client";
import AcceptNewInvitationForm from "@/components/Forms/AcceptNewInvitation/form";
import CreateInvitationForm from "@/components/Forms/CreateNewInvitation/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewConnection() {
  const [form, setForm] = useState(""); // Initialize empty form state

  // Conditional rendering based on form state
  let render = <></>;
  if (form === "Create") render = <CreateInvitationForm />;
  if (form === "Accept") render = <AcceptNewInvitationForm />;

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Buttons in a row */}
        <div className="flex justify-center space-x-4 w-full mb-4">
          <Button
            onClick={() => setForm("Create")}
            className="bg-[#D9D9D9] text-black w-full "
          >
            Create New Invitation
          </Button>
          <Button
            onClick={() => setForm("Accept")}
            className="bg-[#D9D9D9] text-black w-full "
          >
            Accept New Invitation
          </Button>
        </div>
        <div className="mt-[5rem] items-center">{render}</div>
      </div>
    </>
  );
}
