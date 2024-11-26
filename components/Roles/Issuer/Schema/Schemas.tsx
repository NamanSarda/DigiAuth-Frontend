// {/* <CertificatesCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import SchemaCard from "./SchemaCard";

// Define the shape of your Certificates data
interface Schema {
  schemaID: string;
  // schemaName: string;
  // cred_def_id: string;
  // attributes: string[];
}

export default function Schemas() {
  // State to store Certificatess and loading/error states
  const [schemas, setSchema] = useState<Schema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    //const baseUrl = "http://20.189.76.136:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  // Fetch Schema when the component mounts
  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
        const response = await fetch(`${getUrl()}/created-schemas`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log(responseData);
        // Set the fetched data to state
        if (
          responseData === undefined ||
          responseData.schema_ids === undefined ||
          responseData.schema_ids.length === 0
        ) {
        }
        setSchema(responseData.schema_ids);
      } catch (error) {
        // Set error message
        setError("Failed to fetch schema");
      } finally {
        // Set loading to false
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);

  // Render loading, error, or the list of Schema
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {schemas.length === 0 ? (
        <div>No defined schemas</div>
      ) : (
        schemas.map((schema, index) => (
          <SchemaCard
            key={index}
            // schemaName={schema.schemaName}
            schemaID={schema}
            // cred_def_id={schema.cred_def_id}
            // attributes={schema.attributes}
          />
        ))
      )}
    </div>
  );
}
