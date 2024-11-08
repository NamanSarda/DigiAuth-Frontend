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
import { AlertCircle } from "lucide-react";

export default function RegisterCredentialForm() {
  const [connections, setConnections] = useState([
    { id: "dummy1", name: "Dummy Connection 1" },
    { id: "dummy2", name: "Dummy Connection 2" },
  ]);
  const [schemas, setSchemas] = useState([
    {
      id: "schema1",
      name: "Dummy Schema 1",
      credential_definition_id: "cred-def-1",
      attributes: ["name", "email", "dob", "age", "gender"],
    },
    {
      id: "schema2",
      name: "Dummy Schema 2",
      credential_definition_id: "cred-def-2",
      attributes: ["company", "position", "experience"],
    },
  ]);

  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [credentialDefinitionId, setCredentialDefinitionId] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const role = localStorage.getItem("role");

  const getUrl = () => {
    const baseUrl = "http://20.70.181.223:";
    const ports = { User: "1025", Issuer: "2025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  // Simulate fetching schema details based on selected schema
  useEffect(() => {
    if (!selectedSchema) return;

    // Simulate an API call to get schema details
    const selectedSchemaData = schemas.find(
      (schema) => schema.id === selectedSchema
    );
    setCredentialDefinitionId(selectedSchemaData?.credential_definition_id);
    setAttributes(selectedSchemaData?.attributes || []);
  }, [selectedSchema]);

  const handleAttributeChange = (attribute, value) => {
    setAttributeValues({ ...attributeValues, [attribute]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = {
        connection_id: selectedConnection,
        schema_id: selectedSchema,
        credential_definition_id: credentialDefinitionId,
        attributes: attributeValues,
      };

      // Simulate the submission (can replace with an actual API call)
      console.log("Submitted Data:", data);

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

  return (
    <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Issue Credential</h1>

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
          <AlertDescription>
            Credential registered successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Connection Dropdown */}
      <Select onValueChange={setSelectedConnection}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Connection" />
        </SelectTrigger>
        <SelectContent>
          {connections.map((connection) => (
            <SelectItem key={connection.id} value={connection.id}>
              {connection.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Schema Dropdown */}
      <Select onValueChange={setSelectedSchema}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select Schema" />
        </SelectTrigger>
        <SelectContent>
          {schemas.map((schema) => (
            <SelectItem key={schema.id} value={schema.id}>
              {schema.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Credential Definition ID (Auto-filled) */}
      {credentialDefinitionId && (
        <Input
          type="text"
          value={credentialDefinitionId}
          readOnly
          placeholder="Credential Definition ID"
          className="w-full mb-4"
        />
      )}

      {/* Attribute Fields */}
      <div className="mb-4">
        {attributes.map((attribute, index) => (
          <Input
            key={index}
            type="text"
            placeholder={`Enter ${attribute}`}
            value={attributeValues[attribute] || ""}
            onChange={(e) => handleAttributeChange(attribute, e.target.value)}
            className="w-full mb-2"
          />
        ))}
      </div>

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
