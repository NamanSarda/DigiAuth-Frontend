"use client";
import { useEffect } from "react";
import LoginForm from "@/components/Login/login";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token !== null) {
      router.push(`/${role?.toLowerCase()}`);
    }
  }, [router]);

  return <>{localStorage.getItem("token") == null && <LoginForm />}</>;
}
