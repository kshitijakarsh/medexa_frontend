


"use client";

import { useEffect, useState } from "react";
import { Input } from "@workspace/ui/components/input";
import { Header } from "@/components/header";
import { SearchIcon } from "lucide-react";

interface MasterData {
  title: string;
  subtitle: string;
  active: number;
  category: string;
}

export default function MastersPage() {
  const [data, setData] = useState<MasterData[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  return (
    <main className="min-h-svh w-full">
      <Header />
      <div className="p-6 space-y-8 bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF] min-h-screen">
        {/* Header Row */}
        <div className="flex justify-end items-center">
          {/* <h1 className="text-2xl font-semibold">Masters Setup</h1> */}

          {/* Search with icon inside */}
          <div className="relative w-64">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9 bg-white"
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

      </div>
    </main>
  );
}
