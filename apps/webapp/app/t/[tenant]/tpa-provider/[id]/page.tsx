"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { getProviderById } from "../_components/view/api";
import { ProviderDetailsView } from "../_components/view/ProviderDetailsView";

export default function ProviderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const t = setTimeout(async () => {
      const c = await getProviderById(id);
      setProvider(c);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <div className="bg-white p-5 rounded shadow">
            <div className="animate-pulse h-6 w-40 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!provider) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-[#ECF3FF] to-[#D9FFFF]">
        <Header />
        <div className="p-5">
          <div className="bg-white p-5 rounded shadow text-center">
            <p>Provider not found</p>
            <button
              onClick={() => router.push("/tpa-provider")}
              className="mt-3 px-3 py-1.5 border rounded"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return <ProviderDetailsView provider={provider} onBack={() => router.back()} />;
}
