import { Card, CardContent } from "@/components/ui/card";

type TcertificateProp = {
  schemaID: string;
  // schemaName: string;
  // cred_def_id: string;
  // attributes: string[];
};

export default function SchemaCard({
  schemaID,
  // schemaName="",
  // cred_def_id="",
  // attributes=[],
}: TcertificateProp) {
  return (
    <Card className=" my-3 bg-white p-4 shadow-sm">
      <CardContent>
        {/* <h1>{`Schema Name: ${schemaName}`}</h1> */}
        <h2>{`Schema ID: ${schemaID}`}</h2>
        {/* <p>{`Credential Definition ID: ${cred_def_id}`}</p> */}
        {/* <p>{`Attributes: ${attributes.join(", ")}`}</p> */}
      </CardContent>
    </Card>
  );
}
