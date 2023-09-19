"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  fetch("/api/logout", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((response) => {
      router.push("/login");
    });
}
