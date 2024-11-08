import React, { useState, useEffect } from "react";
import ConnectionCard from "../connectionCard";

// Define the shape of your connection data
interface Connection {
  Alias: string;
  ConnectionID: string;
  ID: string;
  MyRole: string; // optional
}

export default function PendingSection() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";
  const id = localStorage.getItem("userid");

  const getUrl = () => {
    const baseUrl = "http://20.70.181.223:";
    const ports = { User: "1025", Issuer: "2025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        console.log(id);
        console.log(getUrl());
        const response = await fetch(`${getUrl()}/connections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (
          data === undefined ||
          data.connections === undefined ||
          data.connections.length === 0
        ) {
          setConnections([]);
        } else setConnections(data.connections);
      } catch (error) {
        // setError("Failed to fetch connections");
        setError("No Pending connections");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []); // Render loading, error, or the list of connections
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // const pendingConnections = connections.filter(
  // (connection) => connection.state === "pending"
  // );
  const pendingConnections = connections;
  return (
    <div>
      {connections.length === 0 ? (
        <div>No pending connections</div>
      ) : (
        pendingConnections.map((connection) => (
          <ConnectionCard
            key={connection.ID}
            ConnectionID={connection.ConnectionID}
            Alias={connection.Alias}
            ID={connection.ID}
          />
        ))
      )}
    </div>
  );
}
