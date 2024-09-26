import React, { useState, useEffect } from "react";
import ConnectionCard from "../connectionCard";

// Define the shape of your connection data
interface Connection {
  DID: string;
  Name: string;
  ID: string;
  i: number;
  state: string;
}

export default function PendingSection() {
  const [connections, setConnections] = useState<Connection[]>([]);
  // const role = localStorage.getItem("role");
  // let url = "http://20.70.181.223:";
  // if (role === "User") url += "1025";
  // else if (role === "Issuer") url += "2025";
  // else if (role === "Verifier") url += "3025";
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // // // Fetch connections when the component mounts
  // useEffect(() => {
  //   const fetchConnections = async () => {
  //     try {
  //       // Replace with your API endpoint
  //       const response = await fetch(`url` + "/connections");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       // Set the fetched data to state
  //       setConnections(data);
  //     } catch (error) {
  //       // Set error message
  //       setError("Failed to fetch connections");
  //     } finally {
  //       // Set loading to false
  //       setLoading(false);
  //     }
  //   };

  //   fetchConnections();
  // }, []);
  // Render loading, error, or the list of connections
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const pendingConnections = connections.filter(
    (connection) => connection.state === "pending"
  );
  return (
    <div>
      {connections.length === 0 ? (
        <div>No pending connections</div>
      ) : (
        pendingConnections.map((connection) => (
          <ConnectionCard
            key={connection.ID}
            DID={connection.DID}
            Name={connection.Name}
            ID={connection.ID}
            i={connection.i}
          />
        ))
      )}
    </div>
  );
}
