import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateInvitationForm() {
  const [invite, setInvite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    //const baseUrl = "http://20.189.76.136:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchInvite = async () => {
      setLoading(true);
      try {
        const data = {
          id: parseInt(localStorage.getItem("userid") ?? "0", 10),
          alias: localStorage.getItem("email"),
        };
        console.log(getUrl());
        const response = await fetch(`${getUrl()}/send-invitation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const responseData = await response.json();
        const invitation = JSON.stringify(responseData.invitation);
        console.log(invitation);
        setInvite(invitation);
      } catch (error) {
        console.log(error);
        setError("Failed to create invite");
      } finally {
        setLoading(false);
      }
    };

    fetchInvite();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(invite).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Invitation</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <textarea
        readOnly
        placeholder="Invitation Link"
        value={invite}
        className="w-full h-22 border rounded p-2 mb-4"
      />
      <Button
        disabled={!invite}
        onClick={handleCopy}
        className={`w-full ${copied ? "bg-green-500" : "bg-[#2E8A99]"}`}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
