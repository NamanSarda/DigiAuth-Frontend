import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TcertificateProp = {
  cred_def_id: string;
  Attr: { [key: string]: string };  // Assuming Attr is a key-value pair object
};

export default function IssueCard({ cred_def_id, Attr, DID, ID }: TcertificateProp) {
  return (
    <Card className="my-2 bg-white p-4 shadow-sm">
      <CardContent>
        <h1>{`Credential Definition ID: ${cred_def_id}`}</h1>

        {/* Iterate through the Attr object to display each key-value pair */}
        <div>
          <h3>Attributes:</h3>
          <ul>
            {Object.entries(Attr).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
