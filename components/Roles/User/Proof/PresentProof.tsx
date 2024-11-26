import { useState } from "react";
import { Button } from "@/components/ui/button";
import PresentProofForm from "@/components/Forms/PresentProofUser/form";

export default function PresentProof() {
  const [formVisible, setFormVisible] = useState(false); // Control form visibility

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Button to toggle form visibility */}
        <div className="flex justify-center space-x-4 w-full mb-4">
          <Button
            onClick={() => setFormVisible((prev) => !prev)}
            className="bg-[#D9D9D9] text-black w-full hover:bg-[#334a5f] hover:text-white justify-center mt-4"
          >
            Present Proof
          </Button>
        </div>

        {/* Conditionally render Schema form only when formVisible is true */}
        {formVisible && (
          <div className="mt-2 items-center justify-center w-full">
            <PresentProofForm />
          </div>
        )}
      </div>
    </>
  );
}
