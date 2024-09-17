"use client";

import Dashboard from "@/components/DashBoard";

export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(
    localStorage.getItem("token") + " " + localStorage.getItem("role")
  );
  // if (token !== null && token !== "undefined" && role === "Issuer")
  return (
    <>
      {/* <Dashboard role={role} />; */}
      <Dashboard role="Issuer" />;
    </>
  );
  // else return <>ur not authorised</>;
}
