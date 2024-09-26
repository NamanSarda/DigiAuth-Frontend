"use client";

import Dashboard from "@/components/DashBoard";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(token + " " + role);
  if (
    token === null ||
    token === "undefined" ||
    role === null ||
    role === "undefined"
  )
    router.push("/");
  if (token !== null && token !== "undefined" && role === "User")
    return (
      <>
        {/* <Dashboard role={role} />; */}
        <Dashboard role="User" />;
      </>
    );
  else if (token !== null && token !== "undefined" && role !== "Verifier")
    router.push("/unauthorized");
}
