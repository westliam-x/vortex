"use client";

import { MessageCircle } from "lucide-react";

const recentComments = [
  {
    id: 1,
    client: "Adaobi",
    comment: "Can we change the font on the homepage?",
    project: "Landing Page",
  },
  {
    id: 2,
    client: "Jide",
    comment: "The login page is not mobile-friendly yet.",
    project: "Booking App",
  },
];

const RecentComments = () => {
  return (
    <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} className="text-[#985EFF]" />
        <h2 className="text-white text-lg font-semibold">Client Comments</h2>
      </div>
      <ul className="space-y-4">
        {recentComments.map((item) => (
          <li key={item.id} className="border-b border-gray-700 pb-3">
            <p className="text-sm text-gray-300 italic">“{item.comment}”</p>
            <p className="text-xs text-gray-400 mt-1">
              — {item.client} on <span className="text-[#985EFF]">{item.project}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentComments;