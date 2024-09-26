// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const formSchema = z.object({
//   connection: z.string().nonempty("Connection is required"),
//   credentialDefinition: z
//     .string()
//     .nonempty("Credential Definition is required"),
//   credentialAttributes: z
//     .string()
//     .nonempty("Credential Attributes are required"),
// });

// export default function IssueCredentialForm() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [connections, setConnections] = useState<
//     { id: string; name: string }[]
//   >([]);
//   const [credentialDefinitions, setCredentialDefinitions] = useState<
//     { id: string; name: string }[]
//   >([]);

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const response = await fetch("");
//         const data = await response.json();
//         const activeConnections = data.filter(
//           (item: any) => item.state === "active"
//         );
//         setConnections(
//           activeConnections.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching connections:", error);
//       }
//     };

//     const fetchCredentialDefinitions = async () => {
//       try {
//         const response = await fetch("");
//         const data = await response.json();
//         const activeCredentialDefinitions = data.filter(
//           (item: any) => item.state === "active"
//         );
//         setCredentialDefinitions(
//           activeCredentialDefinitions.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching credential definitions:", error);
//       }
//     };

//     fetchConnections();
//     fetchCredentialDefinitions();
//   }, []);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       connection: "",
//       credentialDefinition: "",
//       credentialAttributes: "",
//     },
//   });

//   const handleSubmit = async (data: z.infer<typeof formSchema>) => {
//     setIsLoading(true);
//     setErrorMessage("");
//     try {
//       console.log("Selected Connection:", data.connection);
//       console.log("Selected Credential Definition:", data.credentialDefinition);
//       console.log("Credential Attributes:", data.credentialAttributes);

//       alert("Credential issued successfully");
//     } catch (error) {
//       console.error("Error:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white">
//       <div className="flex items-center justify-between w-full max-w-4xl px-6">
//         <div className="w-full">
//           <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
//             <h1 className="text-white text-2xl mb-4 flex justify-center">
//               ISSUE CREDENTIAL
//             </h1>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(handleSubmit)}>
//                 <FormField
//                   control={form.control}
//                   name="connection"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-white mb-4">
//                         Select Connection
//                       </FormLabel>
//                       <Select onValueChange={field.onChange}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a connection" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {connections.map((conn) => (
//                             <SelectItem key={conn.id} value={conn.id}>
//                               {conn.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="credentialDefinition"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-white mb-4">
//                         Select Credential Definition
//                       </FormLabel>
//                       <Select onValueChange={field.onChange}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a credential definition" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {credentialDefinitions.map((credDef) => (
//                             <SelectItem key={credDef.id} value={credDef.id}>
//                               {credDef.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="credentialAttributes"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-white mb-4">
//                         Credential Attributes
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           placeholder="Enter credential attributes"
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 {errorMessage && (
//                   <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
//                 )}
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="mt-6 bg-[#2E8A99] flex justify-center"
//                 >
//                   {isLoading ? "Issuing..." : "Issue Credential"}
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  connection: z.string().nonempty("Connection is required"),
  credentialDefinitionId: z
    .string()
    .nonempty("Credential Definition ID is required"),
  credentialAttributes: z
    .string()
    .nonempty("Credential Attributes are required"),
});

export default function IssueCredentialForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [connections, setConnections] = useState([]);
  const [credentialDefinitions, setCredentialDefinitions] = useState([]);

  useEffect(() => {
    const fetchActiveConnections = async () => {
      try {
        // const response = await fetch("your-api-endpoint-for-connections");
        // const data = await response.json();
        // const activeConnections = data.filter(
        //   (item: any) => item.state === "active"
        // );
        // setConnections(
        //   activeConnections.map((item: any) => ({
        //     id: item.id,
        //     name: item.name,
        //   }))
        // );
      } catch (error) {
        console.error("Failed to fetch active connections:", error);
      }
    };

    const fetchActiveCredentialDefinitions = async () => {
      try {
        // const response = await fetch(
        //   "your-api-endpoint-for-credential-definitions"
        // );
        // const data = await response.json();
        // const activeCredentialDefinitions = data.filter(
        //   (item: any) => item.state === "active"
        // );
        // setCredentialDefinitions(
        //   activeCredentialDefinitions.map((item: any) => ({
        //     id: item.id,
        //     name: item.name,
        //   }))
        // );
      } catch (error) {
        console.error("Failed to fetch active credential definitions:", error);
      }
    };

    fetchActiveConnections();
    fetchActiveCredentialDefinitions();
  }, []);

  const fetchActiveData = async (dataType: string) => {
    if (dataType === "connections") {
      return [{ id: "mas123", name: "abc (mas123)" }];
    } else if (dataType === "credentialDefinitions") {
      return [{ id: "def456", name: "Credential Definition 1" }];
    }
    return [];
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      connection: "",
      credentialDefinitionId: "",
      credentialAttributes: "",
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-between w-full max-w-4xl px-6">
        <div className="w-full">
          <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
            <h1 className="text-white text-2xl mb-4 flex justify-center">
              ISSUE CREDENTIAL
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="connection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white mb-4">
                        Select Connection
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a connection" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {connections.map((conn) => (
                            <SelectItem key={conn.id} value={conn.id}>
                              {conn.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credentialDefinitionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white mb-4">
                        Select Credential Definition ID
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a credential definition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {credentialDefinitions.map((cred) => (
                            <SelectItem key={cred.id} value={cred.id}>
                              {cred.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="credentialAttributes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white mb-4">
                        Credential Attributes
                      </FormLabel>
                      <Textarea
                        placeholder="Enter credential attributes"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {errorMessage && (
                  <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 bg-[#2E8A99] flex justify-center"
                >
                  {isLoading ? "Issuing..." : "Issue Credential"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
