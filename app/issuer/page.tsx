"use client";

import Dashboard from "@/components/DashBoard";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log(
    localStorage.getItem("token") + " " + localStorage.getItem("role")
  );
  if (
    token === null ||
    token === "undefined" ||
    role === null ||
    role === "undefined"
  )
    router.push("/");
  if (token !== null && token !== "undefined" && role === "Issuer")
    return (
      <>
        {/* <Dashboard role={role} />; */}
        <Dashboard role="Issuer" />;
      </>
    );
  else if (token !== null && token !== "undefined" && role !== "Verifier")
    router.push("/unauthorized");
}
