"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMobileSidebar } from "@/store/useMobileSidebar";
import { cn } from "@/lib";
import { handleLogout } from "@/services/authServices";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Clients", href: "/clients" },
  { name: "Projects", href: "/projects" },
  { name: "Vortexes", href: "/vortexes" },
  { name: "Reviews", href: "/reviews" },
  { name: "Team", href: "/team" },
  { name: "Settings", href: "/settings" },
  { name: "Logs", href: "/logs" },
  { name: "Logout", href: "#logout", logout: true },
];

const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { x: "0%", opacity: 1, transition: { duration: 0.3 } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
};


const MobileSidebar = () => {
  const { isOpen, close } = useMobileSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async (link: (typeof links)[number]) => {
    if (link.logout) {
      try {
        await handleLogout();
        router.push("/login");
      } catch (error) {
        console.error("Logout failed", error);
      }
      return;
    }

    router.push(link.href);
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={close} className="relative z-50 md:hidden">
          {/* Background Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black backdrop-blur-sm"
          />

           <motion.div
            key="sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed top-0 left-0 w-64 h-full bg-[#090909] p-6 shadow-xl border-r border-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold text-white tracking-wide">⚡ Vortex</h2>
              <button onClick={close} className="text-gray-400 hover:text-white transition">
                <X size={22} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.logout ? "#" : link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(link);
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "hover:bg-cyan-400/10 hover:text-cyan-300",
                      isActive && "bg-[#aa7cfa] text-white shadow-sm"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer (Optional, like version or profile quick link) */}
            <div className="mt-auto pt-6 border-t border-[#2F2F41]">
              <p className="text-xs text-gray-500">Vortex © {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
