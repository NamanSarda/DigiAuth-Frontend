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
    // { id: "dummy1", name: "Dummy Connection 1" },
    // { id: "dummy2", name: "Dummy Connection 2" },
  ]);
  const [schemas, setSchemas] = useState([
    // {
    //   id: "schema1",
    //   name: "Dummy Schema 1",
    //   credential_definition_id: "cred-def-1",
    //   attributes: ["name", "email", "dob", "age", "gender"],
    // },
    // {
    //   id: "schema2",
    //   name: "Dummy Schema 2",
    //   credential_definition_id: "cred-def-2",
    //   attributes: ["company", "position", "experience"],
    // },
  ]);

  const [selectedConnection, setSelectedConnection] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [credentialDefinitionId, setCredentialDefinitionId] = useState("");
  // const [issuerDid, setIssuerDid] = useState("")
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const id = parseInt(localStorage.getItem("userid") ?? "0", 10);

  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    // const baseUrl = "http://20.189.76.136:";
    const baseUrl = "http://localhost:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  useEffect(() => {
    const fetchConnections = async () => {
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
      console.log(data.connections);
    };
    fetchConnections();
  }, []);

  // Fetch schemas and their corresponding details (credential_definition_id and attributes)
  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch(`${getUrl()}/creadted-schemas`);
        const data = await response.json();
        console.log(data.schema_ids);
        setSchemas(data.schema_ids); // Set the schemas directly here
      } catch (error) {
        console.error("Failed to fetch schemas:", error);
      }
    };
  
    fetchSchemas();
  }, []);
  
  useEffect(() => {
    if (!selectedSchema) return;
  
    const fetchSelectedSchemaDetails = async () => {
      try {
        const response = await fetch(`${getUrl()}/schemas/${selectedSchema}`);
        const schemaDetails = await response.json();

        // Extracting the value before the first ':' in the id
      const issuerDid = schemaDetails.id.split(':')[0];

      // Store issuer_did and schema_issuer_did
      // setIssuerDid(issuerDid);  
      // setSchemaIssuerDid(issuerDid); 
        
        setCredentialDefinitionId(schemaDetails.credential_definition_id);
        setAttributes(schemaDetails.attributes || []);
      } catch (error) {
        console.error("Failed to fetch selected schema details:", error);
      }
    };
  
    fetchSelectedSchemaDetails();
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
        //added

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
              {connection.alias}
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
              {schema?.name}
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
