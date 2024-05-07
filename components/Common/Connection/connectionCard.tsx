import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TconnectionProp = {
  i: number;
  DID: string;
  Name: string;
    ID: string;
};

export default function ConnectionCard({
  i,
  DID = "",
  Name,
  ID,
}: TconnectionProp) {
  const status = DID === "" ? "Pending" : "Active";
  return (
    <>
      <Card className="bg-white p-4 shadow-sm">
        <CardHeader className="mb-2">
          <CardTitle>
            {`${status} Connection ${i}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1>{`Connection Name :${Name}`}</h1>
          <h2>{`Connection ID :${ID}`}</h2>
          <p>{`DID:${DID}`}</p>
        </CardContent>
      </Card>
    </>
  );
}
