import { Metadata } from "next";
import LeadPage from "@/components/leads/LeadPage";

export const metadata: Metadata = {
    title:
        "Leads",
    description: "Lista de Leads",
};

export default function Page() {
    return <LeadPage />;
}
