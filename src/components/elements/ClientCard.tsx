"use client";

import { Client } from "@/types/client";
import { useRouter } from "next/navigation";

const ClientCard = ({ client }: { client: Client }) => {
  const router = useRouter();

  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold truncate text-white">{client.name}</h2>
      <p className="text-sm text-gray-400 truncate">{client.email}</p>
      <div className="mt-3 flex justify-between text-sm text-gray-300">
        <span>{(client?.projects).length} Projects</span>
        <span
          className={
            client.status === "Active" ? "text-green-400" : "text-yellow-400"
          }
        >
          {client.status}
        </span>
      </div>
      <button
        className="mt-4 w-full cursor-pointer bg-[#985EFF] hover:bg-[#ac84f1] text-white text-sm py-2 rounded-md transition"
        onClick={() => router.push(`/clients/${client._id}`)}
      >
        View Details
      </button>
    </div>
  );
};

export default ClientCard;
