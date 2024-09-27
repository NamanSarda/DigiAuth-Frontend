import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CreateInvitationForm() {
  const [invite, setInvite] = useState<string>(""); // Initialize as an empty string
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //   const fetchInvite = async () => {
    //     setLoading(true); // Set loading to true before fetching
    //     try {
    //       const response = await fetch("http://20.70.181.223/connections"); // Adjust the URL as needed
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       const data = await response.json();
    //     // setInvite(JSON.stringify(data, null, 2));
    //       setInvite(data);
    //     } catch (error) {
    //       setError("Failed to create invite");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchConnections();
    console.log("invite");
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(invite).then(() => {
      alert("Copied to clipboard!"); // Alert user that the text has been copied
    });
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
        <h1 className="text-white text-2xl mb-4 flex justify-center">
          Invitation
        </h1>
        <textarea
          readOnly
          placeholder="Invitation Link"
          value={invite}
          className="w-full h-22
          border rounded p-2"
        />
        <Button
          disabled={invite.length < 1}
          onClick={handleCopy}
          className="mt-4 bg-[#2E8A99]"
        >
          Copy
        </Button>
      </div>
    </>
  );
}
