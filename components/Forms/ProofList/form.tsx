import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProofRecord {
  id: string;
  type: string;
  date: string;
  details: { [key: string]: string }; // Customize this based on your API response
}

export default function ProofListForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [proofList, setProofList] = useState<ProofRecord[]>([]);

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
        my_mail_id: localStorage.getItem("email"),
        their_mail_id: email,
      };

      console.log(getUrl());
      const response = await fetch(`${getUrl()}/recordsByUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to fetch proof list");

      const responseData = await response.json();
      console.log(responseData);

      setProofList(responseData.records || []); // Assume `records` contains the list
      setSuccess(true);
      setEmail("");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch proof list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-8 shadow-lg rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Fetch Proof List</h1>

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
          <AlertDescription>Proof list fetched successfully!</AlertDescription>
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
        {loading ? "Fetching Proof List..." : "Fetch Proof List"}
      </Button>

      {/* Render the proof list */}
      <div className="mt-6">
        <h2 className="text-white text-lg mb-2">Proof List:</h2>
        {proofList.length === 0 ? (
          <p className="text-gray-300">No proofs available</p>
        ) : (
          <ul className="space-y-4">
            {proofList.map((proof) => (
              <li
                key={proof.id}
                className="p-4 bg-gray-800 text-white rounded-lg shadow"
              >
                <p>
                  <strong>ID:</strong> {proof.id}
                </p>
                <p>
                  <strong>Type:</strong> {proof.type}
                </p>
                <p>
                  <strong>Date:</strong> {proof.date}
                </p>
                <p>
                  <strong>Details:</strong>{" "}
                  {Object.entries(proof.details).map(([key, value]) => (
                    <span key={key}>
                      {key}: {value},{" "}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
