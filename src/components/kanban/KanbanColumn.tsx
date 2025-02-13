import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

interface Lead {
    id: string;
    name: string;
    stage: string;
}

interface KanbanColumnProps {
    title: string;
    leads: Lead[];
}

const KanbanColumn = ({ title, leads }: KanbanColumnProps) => {
    const { setNodeRef } = useDroppable({ id: title });

    return (
        <div ref={setNodeRef} className="w-64 bg-gray-100 p-4 rounded-md shadow-md min-h-[200px]">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            {leads.map((lead) => (
                <KanbanCard key={lead.id} lead={lead} />
            ))}
        </div>
    );
};

export default KanbanColumn;
