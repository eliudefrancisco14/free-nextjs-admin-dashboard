import { Metadata } from "next";
import UserPage from "@/components/users/UserPage";

export const metadata: Metadata = {
  title:
    "Usuários",
  description: "Lista de usuários",
};

export default function Page() {
  return <UserPage />;
}
