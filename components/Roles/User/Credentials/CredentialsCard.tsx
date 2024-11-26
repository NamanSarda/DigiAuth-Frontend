import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Tattribute = {
  key: string;
  value: string;
};

type TcertificateProp = {
  schema_id: string;
  cred_def_id: string;
  referent: string;
  rev_reg_id: any;
  cred_rev_id: any;
  attrs: Tattribute[];
};

export default function CredentialCard({
  schema_id,
  cred_def_id,
  referent,
  rev_reg_id,
  cred_rev_id,
  attrs,
}: TcertificateProp) {
  // State to track if the referent has been copied
  const [copied, setCopied] = useState(false);

  // Function to copy referent to clipboard
  const copyToClipboard = async () => {
    try {
      // Check if the Clipboard API is available
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(referent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
      } else {
        console.error("Clipboard API not supported.");
        alert("Clipboard API is not supported in this browser.");
      }
    } catch (err) {
      console.error("Failed to copy text to clipboard:", err);
      alert("Failed to copy text to clipboard.");
    }
  };

  return (
    <Card className="p-4 shadow-lg border border-gray-200 rounded-xl max-w-fit">
      <CardContent className="flex flex-col space-y-2">
        <h1 className="text-md font-semibold">
          {`Schema ID: `}
          <span className="font-normal">{schema_id}</span>
        </h1>
        <h2 className="text-md font-semibold">
          {`Credential Definition ID: `}
          <span className="font-normal">{cred_def_id}</span>
        </h2>
        <p className="text-md font-semibold">
          {`Referent (Credential Definition): `}
          <span className="font-normal">{referent}</span>
          <button
            onClick={copyToClipboard}
            className="ml-2 p-1 text-lg text-white bg-blue-500 rounded hover:bg-blue-600"
            title="Copy referent to clipboard"
          >
            {copied ? "✅" : "📋"}{" "}
            {/* Clipboard symbol when not copied, check mark when copied */}
          </button>
        </p>
        <p className="text-md font-semibold">
          {`Revocation Registry ID: `}
          <span className="font-normal">{rev_reg_id ?? "N/A"}</span>
        </p>
        <p className="text-md font-semibold">
          {`Credential Revocation ID: `}
          <span className="font-normal">{cred_rev_id ?? "N/A"}</span>
        </p>
        <div>
          <h3 className="text-md font-semibold">Attributes:</h3>
          <ul className="list-disc pl-5">
            {attrs.length > 0 &&
              attrs.map((attr, index) => (
                <li key={index} className="text-sm">
                  <span className="font-bold">{`${attr.key}: `}</span>
                  <span className="font-normal">{attr.value}</span>
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
