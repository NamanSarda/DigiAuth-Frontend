"use client";

import Dashboard from "@/components/DashBoard";

export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token !== null && role === "Verifier")
    return (
      <>
        <Dashboard role={role} />;
      </>
    );
  else return <>ur not authorised</>;
}
