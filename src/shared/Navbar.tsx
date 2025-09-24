"use client";

import { Menu } from "lucide-react";
import { useMobileSidebar } from "@/store/useMobileSidebar";
import { useEffect, useState } from "react";
import { getProfile, USER_RESPONSE } from "@/services/profileServices";

const Navbar = () => {
  const openSidebar = useMobileSidebar((state) => state.open);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [profile, setProfile] = useState<USER_RESPONSE>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-4 h-14 border-b border-[#2F2F41] bg-[#090909] backdrop-blur-lg shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="md:hidden p-2 rounded-lg bg-[#1A1A2B] border border-[#2F2F41] text-gray-300 hover:text-white hover:border-[#985EFF] transition-colors"
        >
          <Menu size={18} />
        </button>
        <div className="text-xs text-gray-400 font-mono">
          ⏰ {time}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-200">
          Hi, <span className="font-medium text-white">{profile?.firstName}</span>
        </span>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#985EFF] to-[#4A1D96] flex items-center justify-center text-xs text-white font-semibold">
          {profile?.firstName?.[0] ?? "U"}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
