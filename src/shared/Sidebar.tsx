"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  { name: "Logout", href: "#", icon: LogOut, logout: true },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Clear token
    router.push("/login"); // Redirect to login
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-[#090909] border-r backdrop-blur-lg p-6 shadow-[inset_0_0_10px_backdrop-blur-lg p-6 shadow-[inset_0_0_10px_#1E1E3F]]">
      <div className="mb-10 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 20, -10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="text-[#985EFF]"
        >
          ⚡
        </motion.div>
        <h1 className="text-2xl font-poppins font-semibold text-white tracking-wide">
          Vortex
        </h1>
      </div>

      <nav className="space-y-1">
        {links.map(({ href, name, icon: Icon, logout }) => {
          const isActive = pathname === href;

          if (logout) {
            return (
              <a
                key={name}
                href={href}
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-5 px-4 py-4 rounded-lg transition-colors",
                  "hover:bg-[#ba93fd] hover:text-white",
                  "text-white"
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
                "flex items-center gap-5 px-4 py-4 rounded-lg transition-colors",
                "hover:bg-[#ba93fd] hover:text-white",
                isActive
                  ? "bg-[#985EFF] text-white font-medium"
                  : "text-white"
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
