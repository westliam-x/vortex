"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Folder,
  Star,
  UserCog,
  Settings,
  BookOpen,
  Zap,
} from "lucide-react";
import { cn } from "@/lib";
import { motion } from "framer-motion";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Vortexes", href: "/vortexes", icon: Zap },
  { name: "Reviews", href: "/reviews", icon: Star },
  { name: "Team", href: "/team", icon: UserCog },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logs", href: "/logs", icon: BookOpen },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[#141421]/80 border-r border-[#2F2F41] backdrop-blur-lg p-6 shadow-[inset_0_0_10px_#1E1E3F]">
      <div className="mb-10 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 20, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="text-cyan-400"
        >
          ⚡
        </motion.div>
        <h1 className="text-2xl font-semibold text-cyan-400 tracking-wide">
          West&apos;s Vortex
        </h1>
      </div>

      <nav className="space-y-1">
        {links.map(({ href, name, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-5 px-4 py-4 rounded-lg transition-colors",
                "hover:bg-blue-500/10 hover:text-blue-300",
                isActive
                  ? "bg-blue-500/20 text-blue-300 font-medium"
                  : "text-gray-400"
              )}
            >
              <Icon size={18} className="shrink-0" />
              <span className="truncate">{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
