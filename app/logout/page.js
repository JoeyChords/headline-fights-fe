import { redirect } from "next/navigation";

export default async function Logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
    withCredentials: true,
    credentials: "include",
  });

  if (response.status == 200) {
    redirect("/login");
  }
}
