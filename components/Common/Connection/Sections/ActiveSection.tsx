// {/* <ConnectionCard DID="123456" Name="abc" ID="mas123" i={2} /> */}
import React, { useState, useEffect } from "react";
import ConnectionCard from "../connectionCard";

// Define the shape of your connection data
interface Connection {

  Alias: string;
  ConnectionID: string;
  ID: string;
  MyRole: string; // optional
}

export default function ActiveSection() {
  // State to store connections and loading/error states
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";


  const id = parseInt(localStorage.getItem("userid") ?? "0", 10);

  const getUrl = () => {
    // const baseUrl = "http://20.70.181.223:";
    const baseUrl = "http://20.189.76.136:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
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
        if (
          data === undefined ||
          data.connections === undefined ||
          data.connections.length === 0
        ) {
          setConnections([]);
        } else setConnections(data.connections);
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
  // const activeConnections = connections.filter(
  //   (connection) => connection.state === "active"
  // );
  const activeConnections = connections;
  return (
    <div>
      {connections.length === 0 ? (
        <div>No Active connections</div>
      ) : (
        activeConnections.map((connection) => (
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
