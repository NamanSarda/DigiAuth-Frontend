"use client";

export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token !== null && role === "Verifier") return <>Verifier</>;
  else return <>ur not authorised</>;
}
