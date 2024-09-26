import React, { useState, useEffect } from "react";
import ConnectionCard from "../connectionCard";

// Define the shape of your connection data
interface Connection {
  DID: string;
  Name: string;
  ID: string;
  i: number;  
}

export default function PendingSection() {

  const [connections, setConnections] = useState<Connection[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchConnections = async () => {
  //     try {
  //       // Replace with your API endpoint
  //       const response = await fetch("/api/connections/pending");
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

  // // Render loading, error, or the list of connections
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <div>
      {connections.length === 0 ? (
        <div>No pending connections</div>
      ) : (
        connections.map((connection) => (
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
