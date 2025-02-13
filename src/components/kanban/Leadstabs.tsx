"use client";
import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { List, SquareKanban } from "lucide-react";
import KanbanColumn from "./KanbanColumn";

const initialLeads = [
    { id: "1", name: "Cliente A", stage: "Novo" },
    { id: "2", name: "Cliente B", stage: "Contato Feito" },
    { id: "3", name: "Cliente C", stage: "Negociação" },
    { id: "4", name: "Cliente D", stage: "Fechado" },
];

const stages = ["Novo", "Contato Feito", "Negociação", "Fechado"];

const LeadsTabs = () => {
    const [activeTab, setActiveTab] = useState<"list" | "kanban">("list");
    const [leads, setLeads] = useState(initialLeads);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        setLeads((prevLeads) =>
            prevLeads.map((lead) =>
                lead.id === active.id ? { ...lead, stage: over.id } : lead
            )
        );
    };

    return (
        <div className="w-full">
            {/* Botões de Tabs */}
            <div className="flex justify-start gap-4 mb-4">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`inline-flex items-center justify-center gap-2.5 rounded-md px-10 py-4 text-center font-medium text-white lg:px-8 xl:px-10 ${activeTab === "list" ? "bg-meta-3" : "bg-gray-500"
                        } hover:bg-opacity-90`}
                >
                    <List />
                    <span>Lista de Leads</span>
                </button>
                <button
                    onClick={() => setActiveTab("kanban")}
                    className={`inline-flex items-center justify-center gap-2.5 rounded-md px-10 py-4 text-center font-medium text-white lg:px-8 xl:px-10 ${activeTab === "kanban" ? "bg-black" : "bg-gray-500"
                        } hover:bg-opacity-90`}
                >
                    <SquareKanban />
                    <span>Kanban de Leads</span>
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            <div className="border rounded-lg p-4 bg-white shadow-md">
                {activeTab === "list" ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Lista de Leads</h2>
                        <ul className="list-disc pl-5">
                            {leads.map((lead) => (
                                <li key={lead.id} className="py-2">
                                    {lead.name} - {lead.stage}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                        <div className="flex gap-4">
                            {stages.map((stage) => (
                                <KanbanColumn key={stage} title={stage} leads={leads.filter((lead) => lead.stage === stage)} />
                            ))}
                        </div>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default LeadsTabs;
