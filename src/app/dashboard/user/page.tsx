import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/users/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title:
    "Usuários",
  description: "Lista de usuários",
};

export default function Page() {
  return (
    <>
      <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        
        <Table />
      </div>
    </DefaultLayout>
    </>
  );
}



