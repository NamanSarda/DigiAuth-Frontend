import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  invite: z.string().nonempty("Invite is required"),
});

export default function AcceptNewInvitationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsLoading(true);
    setErrorMessage("");
    try {
      //   const response = await fetch("", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   if (response.ok) {
      //     const responseData = await response.json();
      //     console.log("API response:", responseData);
      //     // router.push(`./${data.invite.toLowerCase()}`);
      //   } else {
      //     setErrorMessage("Failed to submit the form. Please try again.");
      //     console.error("API request failed with status:", response.status);
      //   }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invite: "",
    },
  });

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      // <div className="flex items-center justify-between w-full max-w-4xl px-6">
        <div className="w-full">
          <div className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]">
            <h1 className="text-white text-2xl mb-4 flex justify-center">
              Accept New Invitation
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="invite"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            required
                            placeholder="Invitation Link"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                {errorMessage && (
                  <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-6 bg-[#2E8A99] flex justify-center"
                >
                  {isLoading ? "Accepting..." : "Accept Invite"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      // </div>
    // </div>
  );
}
