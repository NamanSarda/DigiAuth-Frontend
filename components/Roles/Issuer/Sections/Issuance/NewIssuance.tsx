// "use client";
import { useState } from "react";
import IssuanceForm from "@/components/Forms/IssuanceForm/form";
import { Button } from "@/components/ui/button";

export default function NewIssuance() {
  const [formVisible, setFormVisible] = useState(false); // Control form visibility

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Button to toggle form visibility */}
        <div className="flex justify-center space-x-4 w-full mb-4">
          <Button
            onClick={() => setFormVisible(true)} // Show form when clicked
            className="bg-[#D9D9D9] text-black w-full hover:bg-[#334a5f] hover:text-white justify-center mt-4"
          >
            Issue New Certificate
          </Button>
        </div>

        {/* Conditionally render Schema form only when formVisible is true */}
        {formVisible && (
          <div className="mt-2 items-center justify-center w-full">
            <IssuanceForm />
          </div>
        )}
      </div>
    </>
  );
}
