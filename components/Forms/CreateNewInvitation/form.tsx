import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateInvitationForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = {
        id: parseInt(localStorage.getItem("userid") ?? "0", 10),
        my_mail_id: localStorage.getItem("email"),
        their_mail_id: email,
      };

      console.log(getUrl());
      const response = await fetch(`${getUrl()}/send-invitation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send invite");

      const responseData = await response.json();
      console.log(responseData);

      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error(error);
      setError("Failed to send invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically hide the success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [success]);

  return (
    <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Send Invitation</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Invitation sent successfully!</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <Label htmlFor="email" className="text-white">
          Receiver's Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter receiver's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#2E8A99]"
        disabled={loading || !email.trim()}
      >
        {loading ? "Sending..." : "Send Invitation"}
      </Button>
    </div>
  );
}
