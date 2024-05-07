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
import Image from "next/image";
import logo from "../../assets/Logo(DigiAuth).png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";

import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["User", "Issuer", "Verifier"]),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://dtn13bamx7.execute-api.ap-south-1.amazonaws.com/prod/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.data.token);
        // console.log(localStorage.getItem("token"));
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        console.log("API response:", responseData);
        router.push(`./${data.role.toLowerCase()}`);
        // form.reset();
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
      email: "",
      password: "",
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
          <h1 className="text-white text-2xl mb-4 flex justify-center">
            LOGIN
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-white mb-4">Email</FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="align-left text-white mb-4">
                        Role
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role"></SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Issuer">Issuer</SelectItem>
                          <SelectItem value="Verifier">Verifier</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          required
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {errorMessage && (
                <div className="my-[2vh] text-[#FF0000]">{errorMessage}</div>
              )}{" "}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 bg-[#2E8A99] flex justify-center"
              >
                {isLoading ? "Logging in" : "Login"}
              </Button>
            </form>
          </Form>
          <h1 className="mt-6 text-white">
            {`Don't have a account?`} <Link href="./signup">SignUp</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
