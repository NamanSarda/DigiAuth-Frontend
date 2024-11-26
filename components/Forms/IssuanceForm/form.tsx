import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Copy } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function RegisterCredentialForm() {
  // Updated type definition for connections
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
  const [attributeValues, setAttributeValues] = useState<{
    [key: string]: string;
  }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
        const url = `${getUrl()}/connections`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Connections data:", data.connections);
        setConnections(data.connections || []);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
        setError("Failed to fetch connections");
      }
    };

    fetchConnections();
  }, []);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch(`${getUrl()}/created-schemas`);
        const data = await response.json();
        setSchemas(data.schema_ids || []);
      } catch (error) {
        console.error("Failed to fetch schemas:", error);
        setError("Failed to fetch schemas");
      }
    };
    fetchSchemas();
  }, []);

  useEffect(() => {
    if (!selectedSchema) return;

    const fetchSelectedSchemaDetails = async () => {
      try {
        const response = await fetch(`${getUrl()}/schemasGet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedSchema }),
        });
        const schemaDetails = await response.json();
        setCredentialDefinitionId(schemaDetails.schema.CredentialDefinitionID);
        setAttributes(schemaDetails.schema.Attributes || []);
      } catch (error) {
        console.error("Failed to fetch selected schema details:", error);
        setError("Failed to fetch schema details");
      }
    };
    fetchSelectedSchemaDetails();
  }, [selectedSchema]);

  const handleAttributeChange = (attribute: string, value: string) => {
    setAttributeValues({ ...attributeValues, [attribute]: value });
  };

  const validateForm = () => {
    if (!selectedConnection) {
      setError("Please select a connection.");
      return false;
    }
    if (!selectedSchema) {
      setError("Please select a schema.");
      return false;
    }
    if (!credentialDefinitionId) {
      setError("Credential definition ID is missing.");
      return false;
    }
    for (const attribute of attributes) {
      if (!attributeValues[attribute]) {
        setError(`Please fill the value for '${attribute}'.`);
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const payload = {
        connection_id: selectedConnection,
        schema_id: selectedSchema,
        schema_name: schemas.find((schema) => schema === selectedSchema),
        credential_definition_id: credentialDefinitionId,
        attributes: attributes.map((attribute) => ({
          name: attribute,
          value: attributeValues[attribute] || "",
          type: "mime-type",
        })),
      };

      const response = await fetch(`${getUrl()}/issue-credential`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to register credential");
      }

      setSuccess(true);
      setSelectedConnection("");
      setSelectedSchema("");
      setCredentialDefinitionId("");
      setAttributes([]);
      setAttributeValues({});
    } catch (error) {
      setError("Failed to register credential");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(credentialDefinitionId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Issue Credential</h1>

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
          <AlertDescription>
            Credential registered successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Connection Dropdown */}
      <Select onValueChange={setSelectedConnection} value={selectedConnection}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Connection">
            {selectedConnection
              ? connections.find((c) => c.ConnectionID === selectedConnection)
                  ?.TheirMailID
              : "Select Connection"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {connections.map((connection) => (
            <SelectItem
              key={connection.ConnectionID}
              value={connection.ConnectionID}
            >
              {connection.TheirMailID || connection.ConnectionID}
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

      {credentialDefinitionId && (
        <div className="mb-4">
          <Label className="text-white">Credential Definition</Label>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={credentialDefinitionId}
              readOnly
              className="w-full"
            />
            <Button onClick={handleCopy} variant="outline">
              {copySuccess ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {attributes.length > 0 && (
        <Label className="text-white mb-2">Attributes</Label>
      )}
      {attributes.map((attribute, index) => (
        <div key={`${attribute}-${index}`} className="mb-4">
          <Label className="text-white">{attribute}</Label>
          <Input
            type="text"
            placeholder={`Enter ${attribute}`}
            value={attributeValues[attribute] || ""}
            onChange={(e) => handleAttributeChange(attribute, e.target.value)}
          />
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        className="w-full bg-[#2E8A99]"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
