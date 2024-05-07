"use client";
export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token !== null && role === "Issuer") return <>Issuer connect</>;
  else return <>ur not authorised</>;
}
