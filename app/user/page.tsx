"use client";

import Dashboard from "@/components/DashBoard";

export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(token + " " + role);
  if (token !== null && role === "User") return (
    <>
      <Dashboard role={role} />;
    </>
  );
  else return <>ur not authorised</>;
}
