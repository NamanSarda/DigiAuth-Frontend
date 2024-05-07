"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { useRouter } from "next/navigation";
type tInputParams = {
  email: string;
  role: string;
};
type tReqData = {
  otp: string | null;
  email: string | null;
};

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OtpForm({ email, role }: tInputParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const reqData: tReqData = { ...data, email: email };
    setIsLoading(true);
    console.log(reqData);
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://dtn13bamx7.execute-api.ap-south-1.amazonaws.com/prod/api/v1/auth/otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        }
      );

      if (response.status == 200) {
        const responseData = await response.json();
        console.log("API response:", responseData);
        router.push(`../${role.toLowerCase}`);
        form.reset();
      } else {
        setErrorMessage("Failed to submit the form. Please try again."); // Set error message for failed submission
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again."); // Set a generic error message for unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {errorMessage && (
            <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP" : "Send OTP"}
          </Button>
        </form>
      </Form>
    </>
  );
}
