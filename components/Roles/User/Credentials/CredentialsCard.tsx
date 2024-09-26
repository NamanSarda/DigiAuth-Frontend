import { Card, CardContent } from "@/components/ui/card";

type Tattribute = {
  key: string;
  value: string;
};

type TcertificateProp = {
  ConnectionID: string;
  CredentialDefinition: string;
  UserName: string;
  IssuerName: string;
  Attributes: Tattribute[];
  i: number;
};

export default function CredentialCard({
  ConnectionID = "",
  CredentialDefinition = "",
  UserName = "",
  IssuerName = "",
  Attributes = [],
}: TcertificateProp) {
  return (
    <Card className=" p-4 shadow-lg border border-gray-200 rounded-xl">
      <CardContent className="flex flex-col space-y-2">
        <h1 className="text-md font-semibold ">
          {`Connection ID: `}
          <span className="font-normal">{ConnectionID}</span>
        </h1>
        <h2 className="text-md font-semibold ">
          {`Credential Definition: `}
          <span className="font-normal">{CredentialDefinition}</span>
        </h2>
        <p className="text-md font-semibold ">
          {`User's Name: `}
          <span className="font-normal">{UserName}</span>
        </p>
        <p className="text-md font-semibold ">
          {`Issuer's Name: `}
          <span className="font-normal">{IssuerName}</span>
        </p>
        <div>
          <h3 className="text-md font-semibold ">Attributes:</h3>
          <ul className="list-disc pl-5">
            {Attributes.map((attr, index) => (
              <li key={index} className="text-sm ">
                <span className="font-bold ">{`${attr.key}: `}</span>
                <span className="font-normal">{attr.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
