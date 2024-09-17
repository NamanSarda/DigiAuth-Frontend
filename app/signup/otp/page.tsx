"use client";
import OtpForm from "@/components/Auth/SignUp/otp";
// import { useSearchParams } from "next/navigation";
export default function Home() {
  // const searchParams = useSearchParams();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  console.log(email + " " + role);
  return (
    <>
      <OtpForm email={email} role={role} />
    </>
  );
}
