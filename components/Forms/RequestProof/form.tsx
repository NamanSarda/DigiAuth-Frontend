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

export default function RequestProofForm() {
  const [connections, setConnections] = useState<
    {
      ConnectionID: string;
      ID: number;
      MyMailID: string;
      TheirMailID: string;
    }[]
  >([]);

  const [schemas, setSchemas] = useState<string[]>([]);
  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [credentialDefinitionId, setCredentialDefinitionId] = useState("");
  const [attributes, setAttributes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [payload, setPayload] = useState("");

  const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  // Fetch connections
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

  // Fetch schemas
  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch(`http://localhost:1025/created-schemas`);
        if (!response.ok) throw new Error("Failed to fetch schemas");
        const data = await response.json();
        setSchemas(data.schema_ids || []);
      } catch (err) {
        setError("Failed to fetch schemas");
        console.error(err);
      }
    };
    fetchSchemas();
  }, []);

  // Fetch schema details
  useEffect(() => {
    if (!selectedSchema) {
      setCredentialDefinitionId("");
      setAttributes([]);
      setPayload("");
      return;
    }

    const fetchSelectedSchemaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1025/schemasGet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedSchema }),
        });

        if (!response.ok) throw new Error("Failed to fetch schema details");
        const schemaDetails = await response.json();
        setCredentialDefinitionId(schemaDetails.schema.CredentialDefinitionID);
        setAttributes(schemaDetails.schema.Attributes || []);
      } catch (err) {
        setError("Failed to fetch schema details");
        console.error(err);
      }
    };
    fetchSelectedSchemaDetails();
  }, [selectedSchema]);

  // Generate payload dynamically
  useEffect(() => {
    if (!selectedConnection || !selectedSchema || !credentialDefinitionId) {
      setPayload("");
      return;
    }

    const requestedAttributes = attributes.reduce((acc, attr, idx) => {
      acc[`${attr}`] = {
        name: attr,
        restrictions: [{ cred_def_id: credentialDefinitionId }],
      };
      return acc;
    }, {} as Record<string, any>);

    const newPayload = {
      connection_id: selectedConnection,
      presentation_request: {
        indy: {
          name: "Proof request",
          version: "1.0",
          requested_attributes: requestedAttributes,
          requested_predicates: {},
        },
      },
      trace: true,
    };

    setPayload(JSON.stringify(newPayload, null, 2));
  }, [selectedConnection, selectedSchema, credentialDefinitionId, attributes]);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const response = await fetch(`${getUrl()}/send-presentation-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (!response.ok) throw new Error("Failed to send proof request");
      setSuccess(true);
    } catch (err) {
      setError("Failed to send proof request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-6 p-8 shadow-lg max-w-[36rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Request Proof</h1>

      {error && (
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
          {connections.map((conn) => (
            <SelectItem key={conn.ConnectionID} value={conn.ConnectionID}>
              {conn.TheirMailID || conn.ConnectionID}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Schema Dropdown */}
      <Select onValueChange={setSelectedSchema} value={selectedSchema}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Schema" />
        </SelectTrigger>
        <SelectContent>
          {schemas.map((schema) => (
            <SelectItem key={schema} value={schema}>
              {schema}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {payload && (
        <div className="mb-4">
          <Label className="text-white text-lg mb-2">Proof ID</Label>
          <Textarea
            value={payload}
            className="w-full min-h-[20rem] font-mono bg-white/10 text-white"
            readOnly
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#2E8A99]"
        disabled={loading || !payload}
      >
        {loading ? "Submitting..." : "Submit Proof Request"}
      </Button>
    </div>
  );
}
