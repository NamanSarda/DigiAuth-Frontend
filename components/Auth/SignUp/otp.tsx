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
} from "../../ui/form";
import Image from "next/image";
import logo from "@/assets/Logo(DigiAuth).png";
import { Button } from "../../ui/button";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../ui/input-otp";
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
        router.push(`../${role.toLowerCase()}`);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-between w-full max-w-4xl px-6">
        <div className="flex flex-col items-start">
          <div className="relative">
            <Image src={logo} alt="Logo" height={300} width={300} />
          </div>
        </div>
        <div className="w-px h-100 bg-gray-300" />
        <div
          className="ml-6 p-8 shadow-lg max-h-[35rem] w-[24rem] rounded-xl bg-[#334a5f]"
          // style={{ background: #117685 }}
        >
          <div className="mb-8 flex space-x-4"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-white mb-4">OTP</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          className="text-white"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="text-white" />
                            <InputOTPSlot index={1} className="text-white" />
                            <InputOTPSlot index={2} className="text-white" />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} className="text-white" />
                            <InputOTPSlot index={4} className="text-white" />
                            <InputOTPSlot index={5} className="text-white" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {errorMessage && (
                <div className=" mt-5 my-[2vh] text-[#FF0000]">
                  {errorMessage}
                </div>
              )}
              <Button
                type="submit"
                className="mt-5 bg-[#2E8A99] flex justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP" : "Send OTP"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
