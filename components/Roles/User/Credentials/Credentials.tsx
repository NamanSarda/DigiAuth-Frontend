import React, { useState, useEffect } from "react";
import CredentialCard from "./CredentialsCard";

interface Certificate {
  schema_id: string;
  cred_def_id: string;
  referent: string;
  rev_reg_id: any;
  cred_rev_id: any;
  attrs: { [key: string]: string }; // attrs is now an object
}

export default function Issued() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
        const response = await fetch(`${getUrl()}/credentials`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.results); // Log to see the data structure

        if (data && data.results) {
          setCertificates(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
        setError("Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Convert attrs from object to array of { key, value } pairs
  const transformAttrs = (attrs: { [key: string]: string }) =>
    Object.entries(attrs).map(([key, value]) => ({ key, value }));

  return (
    <>
      {certificates.length === 0 ? (
        <div>No Received certificates</div>
      ) : (
        certificates.map((certificate, idx) => (
          <CredentialCard
            key={idx} // Using idx as the key
            schema_id={certificate.schema_id}
            cred_def_id={certificate.cred_def_id}
            referent={certificate.referent}
            rev_reg_id={certificate.rev_reg_id}
            cred_rev_id={certificate.cred_rev_id}
            attrs={transformAttrs(certificate.attrs)} // Pass transformed attrs
          />
        ))
      )}
    </>
  );
}
