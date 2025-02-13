import { Metadata } from "next";
import EstagioPage from "@/components/estagios/EstagioPage";

const metadata: Metadata = {
    title:
        "Estágios",
    description: "Lista de Estágios",
};

export default function Page() {
    return <EstagioPage />;
}
