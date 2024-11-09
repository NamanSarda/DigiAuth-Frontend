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
    const [connections, setConnections] = useState([]);
    const [schemas, setSchemas] = useState([]);

    const [selectedConnection, setSelectedConnection] = useState("");
    const [selectedSchema, setSelectedSchema] = useState("");
    const [credentialDefinitionId, setCredentialDefinitionId] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const id = parseInt(localStorage.getItem("userid") ?? "0", 10);

    const role =
      (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

    const getUrl = () => {
      const baseUrl = "http://localhost:";
      // const baseUrl = "http://20.189.76.136:";

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
          data === null ||
          data === undefined ||
          data.connections === undefined ||
          data.connections.length === 0
        ) {
          setConnections([]);
        } else {
          setConnections(data.connections); // Update state with fetched connections
        }
        console.log(data.connections);
        console.log(data);
      };
      fetchConnections();
    }, []);

    useEffect(() => {
      const fetchSchemas = async () => {
        try {
          const response = await fetch(`${getUrl()}/created-schemas`);
          const data = await response.json();
          console.log(data.schema_ids);
          setSchemas(data.schema_ids); // Set the schemas directly here to update state
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
          // const response = await fetch(`${getUrl()}/schemas/${selectedSchema}`);
          const data = { id: selectedSchema }
          console.log(data);
          const response = await fetch(`${getUrl()}/schemasGet`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const schemaDetails = await response.json();
          console.log(schemaDetails.schema)
          // Extracting the value before the first ':' in the id
          // const issuerDid = schemaDetails.id.split(":")[0];
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
        {connections.length === 0 ? (
  <Alert variant="destructive" className="mb-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>No Connections Found</AlertTitle>
    <AlertDescription>
      You do not have any available connections at the moment.
    </AlertDescription>
  </Alert>
) : (
  <Select onValueChange={setSelectedConnection}>
    <SelectTrigger className="w-full mb-4">
      <SelectValue placeholder="Select Connection" />
    </SelectTrigger>
    <SelectContent>
      {connections.map((connection) => (
        <SelectItem key={connection.ConnectionID} value={connection.ConnectionID}>
          {connection.Alias} {/* Display alias or connection identifier */}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)}


        {/* Schema Dropdown */}
        {schemas.length === 0 ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Schemas Found</AlertTitle>
            <AlertDescription>
              No available schemas found to select.
            </AlertDescription>
          </Alert>
        ) : (
          <Select onValueChange={setSelectedSchema}>
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
        )}

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
