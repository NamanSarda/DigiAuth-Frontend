import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TconnectionProp = {
  TheirMailID: string;
  ConnectionID: string;
  ID: string;
};

export default function ConnectionCard({
  TheirMailID,
  ConnectionID,
  ID,
}: TconnectionProp) {
  return (
    <>
      <Card className="my-4 bg-white p-4 shadow-sm">
        <CardContent>
          <h1>{`Connection's Mail :${TheirMailID}`}</h1>
          <h2>{`ID :${ID}`}</h2>
          <p>{`Connection ID:${ConnectionID}`}</p>
        </CardContent>
      </Card>
    </>
  );
}
