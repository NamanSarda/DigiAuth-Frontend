import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RegisterCertificateForm() {
  const [schemaName, setSchemaName] = useState("");
  const [schemaVersion, setSchemaVersion] = useState("");
  const [attributes, setAttributes] = useState([{ name: "" }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://20.189.76.136:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };

  const addAttribute = () => {
    setAttributes([...attributes, { name: "" }]);
  };

  const handleAttributeChange = (index, newValue) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].name = newValue;
    setAttributes(updatedAttributes);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = {
        attributes: attributes.map((attr) => attr.name),
        schema_name: schemaName,
        schema_version: schemaVersion,
      };
        const response = await fetch(`${getUrl()}/register-certificate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error("Network response was not ok");
      // console.log(data);

      setSuccess(true);

      // Reset form fields after successful submission
      setSchemaName("");
      setSchemaVersion("");
      setAttributes([{ name: "" }]);
    } catch (error) {
      setError("Failed to register certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
      <h1 className="text-white text-2xl mb-4 text-center">Register Schema</h1>

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
            Certificate registered successfully!
          </AlertDescription>
        </Alert>
      )}

      <Input
        type="text"
        value={schemaName}
        onChange={(e) => setSchemaName(e.target.value)}
        placeholder="Schema Name"
        className="w-full mb-4"
      />

      <Input
        type="text"
        value={schemaVersion}
        onChange={(e) => setSchemaVersion(e.target.value)}
        placeholder="Schema Version"
        className="w-full mb-4"
      />

      <div className="mb-4">
        {attributes.map((attribute, index) => (
          <Input
            key={index}
            type="text"
            value={attribute.name}
            onChange={(e) => handleAttributeChange(index, e.target.value)}
            placeholder={`Attribute ${index + 1}`}
            className="w-full mb-2"
          />
        ))}
        <Button onClick={addAttribute} className="w-full bg-[#2E8A99] mt-2">
          Add Attribute
        </Button>
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
