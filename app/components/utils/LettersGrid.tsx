"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { PendingLetter } from "@/types/letters";
import Modals from "./Modals";
import apiServices from "@/app/ExportApi";
import { generateQRCode } from "./generateQRCode";

interface LettersGridProps {
  data: PendingLetter[];
  authority: string | null;
}

export default function LettersGrid({ data, authority }: LettersGridProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchRefNo, setSearchRefNo] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "approved" | "pending">("");
  const [userId, setUserId] = useState<string | null>(null);
  const [Uname, setUname] = useState<string | null>("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    const storedUname = sessionStorage.getItem("Uname");

    console.log("Stored User ID:", storedUserId);
    console.log("Stored Username:", storedUname);

    if (storedUname) {
      setUname(storedUname);
    } else {
      console.log("Uname is not set, defaulting to Guest User.");
      setUname("Guest User"); // Fallback if null
    }
  }, []);

  const [rows, setRows] = useState<PendingLetter[]>(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const processedData = React.useMemo(() => {
    let out = rows;
    if (statusFilter === "approved") out = out.filter((d) => d.status === 2);
    if (statusFilter === "pending") out = out.filter((d) => d.status === 1);
    if (searchRefNo.trim()) {
      const q = searchRefNo.trim().toLowerCase();
      out = out.filter((d) => d.refNo?.toLowerCase().includes(q));
    }
    return out;
  }, [rows, statusFilter, searchRefNo]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<PendingLetter | null>(null);

  async function handleApprove(refNo: string) {
    console.log("Before approval, Uname:", Uname);

    if (!Uname) {
      alert("Username is not set. Please log in again.");
      return;
    }

    console.log("Data to be sent to backend:", refNo, Uname);
    const result = await apiServices.post("approveLetter", {
      refNo: refNo,
      approveby: Uname,
    });

    if (result.status !== 200) {
      console.log("Something went wrong. Please correct it.");
    } else {
      console.log(result.status);
      alert("The data is approved successfully");
      setRows((prev) =>
        prev.map((r) => (r.refNo === refNo ? { ...r, status: 2 } : r))
      );
    }
  }

  const openPreview = (letter: PendingLetter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
  };

  const closePreview = () => {
    setSelectedLetter(null);
    setIsModalOpen(false);
  };

  const handleGenerateLetter = async (item: PendingLetter) => {
    console.log("Attempting to generate QR code for:", item);
    if (item.status !== 2) {
      alert("QR code can only be generated for letters with status 2.");
      return;
    }

    const baseUrl = "http://172.16.239.70:3000"; // Your base URL
    const link = `${baseUrl}/summary/${encodeURIComponent(item.refNo)}`;

    try {
      const url = await generateQRCode(link);
      console.log("Generated QR Code URL:", url);
      if (url) {
        setQrCodeUrl(url);
        setSelectedLetter(item);
        setIsModalOpen(true);
      } else {
        console.error("Failed to generate QR code.");
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const columns = React.useMemo<ColumnDef<PendingLetter>[]>(
    () => [
      {
        accessorKey: "refNo",
        header: () => (
          <button className="font-medium" title="Sort">
            Ref No
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-gray-900 font-medium">{row.original.refNo}</span>
        ),
      },
      {
        accessorKey: "letterType",
        header: "Letter Type",
        cell: ({ row }) => (
          <span className="text-gray-700">{row.original.letterType}</span>
        ),
      },
      {
        accessorKey: "toCompanyName",
        header: "To Company",
        cell: ({ row }) => (
          <span className="text-gray-700">{row.original.toCompanyName}</span>
        ),
      },
      {
        accessorKey: "clientName",
        header: "Client",
        cell: ({ row }) => (
          <span className="text-gray-700">{row.original.clientName}</span>
        ),
      },
      {
        accessorKey: "guaranteeAmount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="text-gray-900">
            {new Intl.NumberFormat("en-US").format(row.original.guaranteeAmount)}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          const label = s === 2 ? "Approved" : s === 1 ? "Pending" : "Unknown";
          const color =
            s === 2
              ? "bg-green-100 text-green-700"
              : s === 1
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-700";
          return (
            <span className={`px-2 py-0.5 text-xs font-medium rounded ${color}`}>
              {label}
            </span>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const s = row.original.status;
          const isApproved = s === 2;
          return (
            <div className="flex items-center justify-center gap-2">
              {authority === "1" && (
                <>
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white rounded-sm shadow-sm transition-all duration-200 ease-in-out"
                    style={{ backgroundColor: '#025AA2' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fedc61')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#025AA2')}
                    onClick={() => openPreview(row.original)}
                  >
                    Preview
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-semibold text-white rounded-sm shadow-sm transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#025AA2' }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fedc61')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#025AA2')}
                    onClick={() => handleApprove(row.original.refNo)}
                    disabled={isApproved}
                  >
                    Approve
                  </button>
                </>
              )}
              {authority === "2" && (
                <button
                  className="px-3 py-1 text-sm font-semibold text-white rounded-sm shadow-sm transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#025AA2' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fedc61')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#025AA2')}
                  onClick={() => handleGenerateLetter(row.original)}
                  disabled={row.original.status === 1}
                >
                  Generate
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [authority]
  );

  const table = useReactTable({
    data: processedData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const pageNumbers = React.useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(0, pageIndex - 2);
    const end = Math.min(pageCount - 1, start + maxButtons - 1);
    start = Math.max(0, Math.min(start, end - maxButtons + 1));
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [pageIndex, pageCount]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Ref No..."
            className="px-3 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchRefNo}
            onChange={(e) => setSearchRefNo(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              id="status-approved"
              name="status"
              type="radio"
              className="h-4 w-4 text-blue-600"
              checked={statusFilter === "approved"}
              onChange={() => setStatusFilter("approved")}
            />
            <label htmlFor="status-approved" className="text-sm text-gray-700">
              Approved
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="status-pending"
              name="status"
              type="radio"
              className="h-4 w-4 text-blue-600"
              checked={statusFilter === "pending"}
              onChange={() => setStatusFilter("pending")}
            />
            <label htmlFor="status-pending" className="text-sm text-gray-700">
              Pending
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && <span className="ml-1">▲</span>}
                    {header.column.getIsSorted() === "desc" && <span className="ml-1">▼</span>}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <span>Rows per page:</span>
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>
            Page {pageIndex + 1} of {pageCount}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          {pageNumbers.map((p) => (
            <button
              key={p}
              className={`px-3 py-1 border rounded ${
                p === pageIndex ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-50"
              }`}
              onClick={() => table.setPageIndex(p)}
            >
              {p + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>

      <Modals
        open={isModalOpen}
        letter={selectedLetter}
        onClose={closePreview}
        qrCodeUrl={qrCodeUrl}
      />
    </div>
  );
}