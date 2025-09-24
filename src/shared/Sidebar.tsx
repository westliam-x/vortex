"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleLogout } from "@/services/authServices";
import {
  Home,
  Users,
  Folder,
  Star,
  UserCog,
  Settings,
  BookOpen,
  Zap,
  LogOut,
  Receipt,
} from "lucide-react";
import { cn } from "@/lib";
import { motion } from "framer-motion";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Vortexes", href: "/vortexes", icon: Zap },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Invoice", href: "/invoice/new", icon: Receipt },
  { name: "Team", href: "/team", icon: UserCog },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logs", href: "/logs", icon: BookOpen },
  { name: "Logout", href: "#", icon: LogOut, logout: true },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const Logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await handleLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[#090909] border-r border-[#2F2F41] backdrop-blur-lg p-6 shadow-inner">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="text-[#985EFF] text-2xl"
        >
          ⚡
        </motion.div>
        <h1 className="text-2xl font-poppins font-semibold text-white tracking-wide">
          Vortex
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {links.map(({ href, name, icon: Icon, logout }) => {
          const isActive = pathname === href;

          if (logout) {
            return (
              <a
                key={name}
                href={href}
                onClick={Logout}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 transition-all",
                  "hover:bg-[#ba93fd]/10 hover:text-[#ba93fd]"
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{name}</span>
              </a>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-gradient-to-r from-[#985EFF] to-[#BA93FD] text-white font-medium shadow-md"
                  : "text-gray-300 hover:bg-[#ba93fd]/10 hover:text-white"
              )}
            >
              <Icon size={18} className="shrink-0" />
              <span className="truncate">{name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-6 text-xs text-gray-500">
        <p className="font-light">© {new Date().getFullYear()} Vortex</p>
      </div>
    </aside>
  );
};

export default Sidebar;
