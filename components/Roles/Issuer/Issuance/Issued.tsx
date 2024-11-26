// {/* <CertificatesCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import IssuedCard from "./issuedCard";

// Define the shape of your Certificates data
interface Certificate {
  attrs: { [key: string]: string }; // Assuming Attr is a key-value pair object
  cred_def_id: string;
}

export default function Issued() {
  // State to store Certificatess and loading/error states
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const getUrl = () => {
    // const baseUrl = "http://20.189.76.136:";
    const baseUrl = "http://localhost:6041";
    return baseUrl;
  };

  // // Fetch Certificates when the component mounts
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        //       // Replace with your API endpoint
        const response = await fetch(`${getUrl()}/credentials`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Set the fetched data to state
        console.log(data.results);
        setCertificates(data.results);
      } catch (error) {
        // Set error message
        setError("Failed to fetch certificates");
      } finally {
        // Set loading to false
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // Render loading, error, or the list of certificates
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {certificates.length === 0 ? (
        <div>No issued certificates</div>
      ) : (
        certificates.map((certificate) => (
          <IssuedCard
            key={certificate.cred_def_id}
            cred_def_id={certificate.cred_def_id}
            Attr={certificate.attrs}
          />
        ))
      )}
    </div>
  );
}
