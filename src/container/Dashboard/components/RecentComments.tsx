"use client";

import { MessageCircle, Quote } from "lucide-react";

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
  {
    id: 3,
    client: "Jide",
    comment: "The signup page is not mobile-friendly yet.",
    project: "Booking App",
  },
  {
    id: 4,
    client: "Jide",
    comment: "The signup page is not mobile-friendly yet.",
    project: "Booking App",
  },
];

const RecentComments = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] border border-[#2F2F41] rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-5">
        <MessageCircle size={20} className="text-[#985EFF]" />
        <h2 className="text-gray-200 text-lg font-semibold">Client Comments</h2>
      </div>

      <ul className="space-y-5">
        {recentComments.length > 0 ? (
          recentComments.map((item) => (
            <li
              key={item.id}
              className="border-b border-[#2F2F41]/60 pb-4 last:border-0"
            >
              {/* Comment text */}
              <div className="flex items-start gap-2">
                <Quote size={14} className="text-[#985EFF] mt-1" />
                <p className="text-sm text-gray-300 italic leading-relaxed">
                  “{item.comment}”
                </p>
              </div>

              {/* Client + Project */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className="text-gray-400">— {item.client}</span>
                <span className="px-2 py-[2px] text-[10px] rounded-md bg-[#2F2F41] text-[#985EFF] font-medium">
                  {item.project}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500 italic">
            No recent client comments.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentComments;
