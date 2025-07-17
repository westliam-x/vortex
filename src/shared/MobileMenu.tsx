"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMobileSidebar } from "@/store/useMobileSidebar";
import { cn } from "@/lib";
import { handleLogout } from "@/services/authServices";

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

    close();
  };

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50 md:hidden">
      <div className="fixed inset-0 bg-[#090909] backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed top-0 left-0 w-64 h-full bg-[#090909] p-6 shadow-xl border-r border-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-white">⚡ Vortex</h2>
          <button onClick={close} className="text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-4">
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
                  "block px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-all",
                  isActive && "bg-cyan-500/10 text-white font-medium"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </Dialog>
  );
};

export default MobileSidebar;
