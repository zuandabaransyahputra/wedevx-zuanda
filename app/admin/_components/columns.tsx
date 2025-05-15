import { ColumnDef } from "@tanstack/react-table";
import { Lead, LeadStatus } from "@/type/lead";
import { Button } from "@/components/ui/button";

export const leadColumns = (
  updateLeadStatus: (id: string, newStatus: LeadStatus) => void
): ColumnDef<Lead>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "created_at",
    header: "Submitted",
    cell: ({ row }) => {
      const submitted = row.original.created_at ?? new Date().toISOString();
      return new Date(submitted).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.status}</span>;
    },
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const lead = row.original;
      const newStatus = lead.status === "PENDING" ? "REACHED_OUT" : "PENDING";

      return (
        <Button
          onClick={() => updateLeadStatus(lead.id, newStatus)}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 transition"
        >
          Change Status
        </Button>
      );
    },
  },
];
