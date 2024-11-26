import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PresentProofForm() {
  const [connections, setConnections] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [credentialDefinitionId, setCredentialDefinitionId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [payload, setPayload] = useState("");
  const [credId, setCredId] = useState("");

  // Loading states for connections and schemas
  const [connectionsLoading, setConnectionsLoading] = useState(true);
  const [schemasLoading, setSchemasLoading] = useState(true);

  const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`${getUrl()}/connections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error("Failed to fetch connections");
        const data = await response.json();
        setConnections(data.connections || []);
      } catch (err) {
        setError("Failed to fetch connections");
        console.error(err);
      }
    };
    fetchConnections();
  }, []);

  useEffect(() => {
    const fetchSchemas = async () => {
      setSchemasLoading(true);
      try {
        const response = await fetch(`http://localhost:1025/created-schemas`);
        const data = await response.json();
        setSchemas(data.schema_ids || []);
      } catch (error) {
        console.error("Failed to fetch schemas:", error);
        setError("Failed to fetch schemas");
      } finally {
        setSchemasLoading(false);
      }
    };
    fetchSchemas();
  }, []);
  useEffect(() => {
    if (!selectedSchema) {
      // Reset payload and other details when schema is deselected
      setPayload("");
      setCredentialDefinitionId("");
      setAttributes([]);
      return;
    }

    const fetchSelectedSchemaDetails = async () => {
      if (!selectedSchema) return;
      try {
        const response = await fetch(`http://localhost:1025/schemasGet`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: selectedSchema }),
        });
        const schemaDetails = await response.json();
        console.log(schemaDetails);
        setCredentialDefinitionId(schemaDetails.schema.CredentialDefinitionID);
        setAttributes(schemaDetails.schema.Attributes || []);
      } catch (error) {
        console.error("Failed to fetch selected schema details:", error);
      }
    };
    fetchSelectedSchemaDetails();
  }, [selectedSchema]);

  useEffect(() => {
    // Generate payload only when both connection and schema are selected
    if (selectedConnection && selectedSchema && credId) {
      generatePayload();
    } else {
      setPayload("");
    }
  }, [selectedSchema, credId, selectedConnection]);

  const generatePayload = () => {
    // Construct requested attributes dynamically
    const requestedAttributes = {};
    attributes.forEach((attr) => {
      requestedAttributes[attr] = {
        cred_id: credId, // Dynamically set the credential definition ID
        revealed: true,
      };
    });

    const newPayload = {
      connection_id: selectedConnection,
      auto_remove: false,
      indy: {
        requested_attributes: requestedAttributes,
        requested_predicates: {},
        self_attested_attributes: {},
      },
      trace: true,
    };

    // Convert to formatted JSON string
    setPayload(JSON.stringify(newPayload, null, 2));
    console.log(newPayload);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // Parse the payload from the textarea to ensure it's valid JSON
      const payloadToSend = JSON.parse(payload);
      
      console.log("Hello")
      console.log(payloadToSend);
      // const response = await fetch(`${getUrl()}/send-presentation`, {
      const response = await fetch(`http://localhost:2025/send-presentation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToSend),
      });
      console.log(payloadToSend)
      if (!response.ok) {
        throw new Error("Failed to send presentation request");
      }

      setSuccess(true);
    } catch (error) {
      setError("Failed to send presentation request");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredId(e.target.value);
  };

  // Function to handle the button click
  const handleButtonClick = () => {
    console.log("Credential ID set:", credId);
    // You can also perform any additional actions when the button is clicked
  };

  const renderConnectionDropdown = () => {
    if (connectionsLoading) {
      return (
        <div className="w-full mb-4 text-white flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading Connections...</span>
        </div>
      );
    }

    if (connections.length === 0) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Connections</AlertTitle>
          <AlertDescription>
            You do not have any available connections. Please establish a
            connection first.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Select onValueChange={setSelectedConnection} value={selectedConnection}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Connection" />
        </SelectTrigger>
        <SelectContent>
          {connections.map((connection) => (
            <SelectItem
              key={connection.ConnectionID}
              value={connection.ConnectionID}
            >
              {connection.Alias}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const renderSchemaDropdown = () => {
    if (schemasLoading) {
      return (
        <div className="w-full mb-4 text-white flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading Schemas...</span>
        </div>
      );
    }

    if (schemas.length === 0) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Schemas</AlertTitle>
          <AlertDescription>No schemas available.</AlertDescription>
        </Alert>
      );
    }

    return (
      <Select onValueChange={setSelectedSchema} value={selectedSchema}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Schema" />
        </SelectTrigger>
        <SelectContent>
          {schemas.map((schema, index) => (
            <SelectItem key={index} value={schema}>
              {schema}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="ml-6 p-8 shadow-lg max-w-[36rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Request Proof</h1>

      {error !== "" && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Proof Request Sent Successfully</AlertDescription>
        </Alert>
      )}

      {/* Connection Dropdown */}
      <Select onValueChange={setSelectedConnection} value={selectedConnection}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Connection" />
        </SelectTrigger>
        <SelectContent>
          {connections.map((conn, index) => (
            <SelectItem key={index} value={conn.ConnectionID}>
              {conn.TheirMailID || conn.ConnectionID}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Schema Dropdown */}

      {/* Payload Textarea - Only show when both connection and schema are selected */}

      <Select onValueChange={setSelectedSchema} value={selectedSchema}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Schema" />
        </SelectTrigger>
        <SelectContent>
          {schemas.map((schema, index) => (
            <SelectItem key={(index)} value={schema}>
              {schema}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="CredId"
        value={credId} // Bind input value to credId state
        onChange={handleInputChange} // Update state on input change
      />
      <Button onClick={handleButtonClick}>Set Cred Id</Button>
    </div>
      {selectedConnection && selectedSchema && payload && credId &&(
        <div className="mb-4">
          <Label className="text-white text-lg mb-2">Proof Present</Label>
          <Textarea
            defaultValue={payload}
            onChange={(e) => setPayload(e.target.value)} // Update the payload state on change
            className="w-full min-h-[20rem] font-mono bg-white/10 text-white"
            placeholder="Payload will be generated automatically"
          />
        </div>
      )}
      <Button
        onClick={handleSubmit}
        className="w-full bg-[#2E8A99]"
        disabled={loading || !selectedConnection || !selectedSchema || !payload}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Proof Request"
        )}
      </Button>
    </div>
  );
}
