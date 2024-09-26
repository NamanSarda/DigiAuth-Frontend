import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TcertificateProp = {
  DID: string;
  Name: string;
  ID: string;
  i: number;
};

export default function CredentialCard({ DID = "", Name, ID, i }: TcertificateProp) {
  return (
    <>
      <Card className="bg-white p-4 shadow-sm">
        <CardContent>
          <h1>{`Connection Name :${Name}`}</h1>
          <h2>{`Connection ID :${ID}`}</h2>
          <p>{`DID:${DID}`}</p>
        </CardContent>
      </Card>
    </>
  );
}
