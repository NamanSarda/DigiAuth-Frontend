// {/* <ConnectionCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import ConnectionCard from "../connectionCard";

// Define the shape of your connection data
interface Connection {
  DID: string;
  Name: string;
  ID: string;
  i: number;
  state: string; // Assuming `i` is an index or unique identifier
}

export default function ActiveSection() {
  // State to store connections and loading/error states
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const role = localStorage.getItem("role");
  const id = localStorage.getItem("userid");

  const getUrl = () => {
    const baseUrl = "http://20.70.181.223:";
    const ports = { User: "1025", Issuer: "2025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const url = `${getUrl()}/connections`;
        console.log(url);
        console.log(id);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        // setError("Failed to fetch connections");
        setError("No Active connections");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);
  // // Render loading, error, or the list of connections
  // setLoading(false);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  const activeConnections = connections.filter(
    (connection) => connection.state === "active"
  );
  return (
    <div>
      {connections.length === 0 ? (
        <div>No Active connections</div>
      ) : (
        activeConnections.map((connection) => (
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
