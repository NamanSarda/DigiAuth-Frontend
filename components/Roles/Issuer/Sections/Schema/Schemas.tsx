// {/* <CertificatesCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import SchemaCard from "./SchemaCard";

// Define the shape of your Certificates data
interface Schema {
  DID: string;
  Name: string;
  ID: string;
  i: number;
}

export default function Schemas() {
  // State to store Certificatess and loading/error states
  const [schemas, setSchema] = useState<Schema[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // // Fetch Schema when the component mounts
  // useEffect(() => {
  //   const fetchSchema = async () => {
  //     try {
  //       // Replace with your API endpoint
  //       const response = await fetch("/api/schema/active");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       // Set the fetched data to state
  //       setSchema(data);
  //     } catch (error) {
  //       // Set error message
  //       setError("Failed to fetch schema");
  //     } finally {
  //       // Set loading to false
  //       setLoading(false);
  //     }
  //   };

  //   fetchSchema();
  // }, []);

  // // Render loading, error, or the list of Schema
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      {schemas.length === 0 ? (
        <div>No defined schemas</div>
      ) : (
        schemas.map((schema) => (
          <SchemaCard
            key={schema.ID}
            DID={schema.DID}
            Name={schema.Name}
            ID={schema.ID}
            i={schema.i}
          />
        ))
      )}
    </div>
  );
}
