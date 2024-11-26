import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function AcceptNewInvitationForm() {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  // const id = localStorage.getItem("id");
  const my_mail_id = localStorage.getItem("email");
  const role =
    (localStorage.getItem("role") as "User" | "Issuer" | "Verifier") || "";

  const getUrl = () => {
    const baseUrl = "http://localhost:";
    // const baseUrl = "http://20.189.76.136:";
    const ports = { User: "2025", Issuer: "1025", Verifier: "3025" };
    return baseUrl + (ports[role] || "");
  };
  const form = useForm({
    defaultValues: {
      invite: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccessful) {
      timer = setTimeout(() => {
        setIsSuccessful(false);
        setSuccessMessage("");
        form.reset();
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSuccessful, form]);

  function parseAndFormat(inputString) {
    // Replace "\n" with actual newlines
    const formattedString = inputString.replace(/\\n/g, "\n");

    try {
      // Attempt to parse as JSON if possible
      const parsedObject = JSON.parse(formattedString);
      console.log("Parsed JSON Object:", parsedObject);
      return parsedObject;
    } catch (error) {
      console.log("Input is not valid JSON, returning formatted string.");
      return formattedString;
    }
  }

  const handleSubmit = async (data: any) => {
    const id = parseInt(localStorage.getItem("userid") ?? "0", 10);
    console.log("User ID:", id);

    // Parse the invite JSON string and merge its contents directly
    data = parseAndFormat(data.invite);
    data = { my_mail_id, id, ...data };
    console.log(data);
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${getUrl()}/receive-invitation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API response:", responseData);
        setIsSuccessful(true);
        setSuccessMessage("Invitation accepted successfully!");
      } else {
        setErrorMessage("Failed to submit the form. Please try again.");
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full">
      <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
        <h1 className="text-white text-2xl mb-4 flex justify-center">
          {isSuccessful ? "Invitation Accepted" : "Accept New Invitation"}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="invite"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Invitation Link"
                      {...field}
                      disabled={isSuccessful}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {errorMessage && (
              <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="my-[2vh] text-green-500">{successMessage}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading || isSuccessful}
              className="mt-6 bg-[#2E8A99] flex justify-center"
            >
              {isLoading
                ? "Accepting..."
                : isSuccessful
                  ? "Accepted"
                  : "Accept Invite"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
