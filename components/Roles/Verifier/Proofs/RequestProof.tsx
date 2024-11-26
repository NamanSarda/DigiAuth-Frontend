// // {/* <CertificatesCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
// import React, { useState, useEffect } from "react";
// // import IssuedCard from "./issuedCard";

// // Define the shape of your Certificates data
// interface Certificate {
//   attrs: { [key: string]: string }; // Assuming Attr is a key-value pair object
//   cred_def_id: string;
// }

// export default function RequestProof() {
//   // State to store Certificatess and loading/error states
//   const [certificates, setCertificates] = useState<Certificate[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const getUrl = () => {
//     // const baseUrl = "http://20.189.76.136:";
//     const baseUrl = "http://localhost:3025";
//     return baseUrl;
//   };

//   const role =
//     (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

//   const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
//   useEffect(() => {
//     const sendRequest = async () => {
//       try {
//         setLoading(true);
//         const url = `${getUrl()}/send-presentation-request`;
//         console.log(url);
//         console.log(id);

//         // Define the JSON body
//         const requestBody = {
//           connection_id: "d0421f58-7e2f-46b5-bb3d-dee0583bbf49",
//           presentation_request: {
//             indy: {
//               name: "Proof request",
//               version: "1.0",
//               requested_attributes: {
//                 Arnav1: {
//                   name: "Arnav1",
//                   restrictions: [
//                     {
//                       cred_def_id:
//                         "V8ErVjLajTWdW5CH1jKPyt:3:CL:2536389:Arnav11",
//                     },
//                   ],
//                 },
//               },
//               requested_predicates: {},
//             },
//           },
//           trace: true,
//         };
//         console.log(JSON.stringify(requestBody));
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody), // Use the requestBody here
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         if (
//           data === undefined ||
//           data.connections === undefined ||
//           data.connections.length === 0
//         ) {
//           setError("No Active connections");
//         }
//       } catch (error) {
//         setError("Main hu proof");
//       } finally {
//         setLoading(false);
//       }
//     };

//     sendRequest();
//   }, []);

//   // // Render loading, error, or the list of certificates
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {/* {certificates.length === 0 ? (
//         <div>No issued certificates</div>
//       ) : (
//         certificates.map((certificate) => (
//           <IssuedCard
//             key={certificate.cred_def_id}
//             cred_def_id={certificate.cred_def_id}
//             Attr={certificate.attrs}
//           />
//         ))
//       )} */}
//       <h1>Verifier</h1>
//     </div>
//   );
// }

// "use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RequestProofForm from "@/components/Forms/RequestProof/form";

export default function NewIssuance() {
  const [formVisible, setFormVisible] = useState(false); // Control form visibility

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Button to toggle form visibility */}
        <div className="flex justify-center space-x-4 w-full mb-4">
          <Button
            onClick={() => setFormVisible((prev) => !prev)}
            className="bg-[#D9D9D9] text-black w-full hover:bg-[#334a5f] hover:text-white justify-center mt-4"
          >
            Request Proof
          </Button>
        </div>

        {/* Conditionally render Schema form only when formVisible is true */}
        {formVisible && (
          <div className="mt-2 items-center justify-center w-full">
            <RequestProofForm />
          </div>
        )}
      </div>
    </>
  );
}
