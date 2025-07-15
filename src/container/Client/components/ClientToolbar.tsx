// app/clients/ClientToolbar.tsx
"use client";

interface Props {
  onAddClient: () => void;
}

const ClientToolbar = ({ onAddClient }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
      <h1 className="text-2xl font-bold text-cyan-300">Clients</h1>
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full md:w-72 px-3 py-2 rounded-md bg-[#141421] text-white border border-gray-700 focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={onAddClient}
          className="bg-cyan-700 hover:bg-cyan-800 transition text-white px-4 py-2 rounded-md text-sm"
        >
          ➕ Add Client
        </button>
      </div>
    </div>
  );
};

export default ClientToolbar;
