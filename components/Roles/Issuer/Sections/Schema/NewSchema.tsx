"use client";
import { useState } from "react";
import Schema from "@/components/Forms/Schema/form";
import { Button } from "@/components/ui/button";

export default function NewSchema() {
  const [formVisible, setFormVisible] = useState(false); // Control form visibility

  return (
    <>
      {/* Center the content directly in the existing div */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* Button to toggle form visibility */}
        <Button
          onClick={() => setFormVisible(true)} // Show form when clicked
          className="bg-[#D9D9D9] text-black w-full hover:bg-[#334a5f] hover:text-white mt-3"
        >
          Create New Schema
        </Button>

        {/* Conditionally render Schema form only when formVisible is true */}
        {formVisible && (
          <div className="mt-[5rem]">
            <Schema />
          </div>
        )}
      </div>
    </>
  );
}
