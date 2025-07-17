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
    <div className="sticky top-0 z-30 flex justify-between items-center px-4 h-14 border-b border-gray-800 bg-[#090909] backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          onClick={openSidebar}
          className="md:hidden p-2 rounded-md bg-[#1A1A2B] border border-[#985EFF] text-[985EFF] shadow-md"
        >
          <Menu size={10} />
        </button>
        <div className="text-xs text-white font-poppins">
          Current Time: {time}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs">Hi, {profile?.firstName}</span>
        <div className="h-8 w-8 rounded-full bg-gray-600" />
      </div>
    </div>
  );
};

export default Navbar;
