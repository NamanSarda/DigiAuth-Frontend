import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"; // replace with actual paths

// Replace this with your actual schema validation rules
const formSchema = z.object({
  connection: z.string().nonempty("Connection is required"),
  schema: z.string().nonempty("Schema is required"),
});

export default function IssueCredentialForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //   const router = useRouter();
  //   const handleSubmit = async (data: z.infer<typeof formSchema>) => {
  //     setIsLoading(true);
  //     setErrorMessage("");
  //     try {
  //       // Dummy API call for demonstration
  //       console.log("Selected Connection:", data.connection);
  //       console.log("Selected Schema:", data.schema);

  //       // Logic to handle the API request can go here.
  //       // After successful submission, you can redirect or show success messages.
  //       alert("Credential issued successfully");

  //       router.push("/success"); // Dummy redirection after submission
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setErrorMessage("An unexpected error occurred. Please try again.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      connection: "",
      schema: "",
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
              {/* <form onSubmit={form.handleSubmit(handleSubmit)}> */}
              {/* Connection Dropdown */}
              <FormField
                control={form.control}
                name="connection"
                render={({ field }) => {
                  return (
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
                          <SelectItem value="mas123">abc (mas123)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Schema Dropdown */}
              <FormField
                control={form.control}
                name="schema"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-white mb-4">
                        Choose Schema
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a schema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="schema1">Schema 1</SelectItem>
                          <SelectItem value="schema2">Schema 2</SelectItem>
                          <SelectItem value="schema3">Schema 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Error Message */}
              {errorMessage && (
                <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 bg-[#2E8A99] flex justify-center"
              >
                {isLoading ? "Issuing..." : "Issue Credential"}
              </Button>
              {/* </form> */}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
