import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Lead {
    id: string;
    name: string;
    stage: string;
}

const KanbanCard = ({ lead }: { lead: Lead }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 mb-2 rounded-md shadow-md cursor-pointer"
        >
            {lead.name}
        </div>
    );
};

export default KanbanCard;
