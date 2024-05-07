"use client";
export default function page() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token !== null && role === "User") return <>User</>;
  else return <>ur not authorised</>;
}
