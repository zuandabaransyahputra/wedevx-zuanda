"use client";
import React, { useState, useMemo, useEffect } from "react";
import DataTable from "@/components/ui/data-table";
import { leadColumns } from "./_components/columns";
import { InputGroup } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadStatus, Lead } from "@/type/lead";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Reached Out", value: "REACHED_OUT" },
];

const Page = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/leads");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data: Lead[] = await res.json();
        setLeads(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLeads();
  }, []);

  const updateLeadStatus = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updatedLead = await res.json();

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status: updatedLead.status } : lead
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
      const matchesName = fullName.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ? true : lead.status === statusFilter;

      return matchesName && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const pageCount = Math.ceil(filteredLeads.length / pageSize);

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  return (
    <section className="py-10 px-6 w-full flex flex-col gap-5">
      <h1 className="text-4xl font-semibold">Leads</h1>
      <div className="flex items-center gap-3">
        <InputGroup
          icons={<Search />}
          classNameWrapper="w-[300px] h-10"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px] h-10 data-[size=default]:h-10">
            <SelectValue placeholder="Status" className="h-10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        columns={leadColumns(updateLeadStatus)}
        data={paginatedLeads}
        pageCount={pageCount}
        pageChange={(p) => setPage(p)}
        sizeChange={(size) => setPageSize(size)}
        initialPage={page}
        initialSize={pageSize}
      />
    </section>
  );
};

export default Page;
