"use client";

import Dashboard from "@/components/DashBoard";

export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(
    localStorage.getItem("token") + " " + localStorage.getItem("role")
  );
  if (token !== null && role === "Issuer")
    return (
      <>
        <Dashboard role={role} />;
      </>
    );
  else return <>ur not authorised</>;
}
