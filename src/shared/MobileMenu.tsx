"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useMobileSidebar } from "@/store/useMobileSidebar";
import { cn } from "@/lib";
import { handleLogout } from "@/services/authServices";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Clients", href: "/clients" },
  { name: "Projects", href: "/projects" },
  // { name: "Vortex Spaces", href: "/vortexes", badge: "Soon" },
  { name: "Reviews", href: "/reviews" },
  { name: "Invoices", href: "/invoice" },
  { name: "Team", href: "/team" },
  { name: "Settings", href: "/settings", badge: "Soon" },
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
      } catch {
        router.push("/login");
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
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed top-0 left-0 w-72 h-full bg-[var(--bg-elevated)] p-6 shadow-xl border-r border-[var(--border)]"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-strong)]/40 flex items-center justify-center text-[var(--accent)] font-semibold">
                  V
                </div>
                <div>
                  <p className="text-xs text-[var(--text-subtle)]">Workspace</p>
                  <h2 className="text-lg font-semibold text-[var(--text)]">Vortex</h2>
                </div>
              </div>
              <button onClick={close} className="text-[var(--text-muted)] hover:text-[var(--text)] transition">
                <X size={22} />
              </button>
            </div>

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
                      "flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-[var(--accent-soft)] text-[var(--text)] border border-[var(--accent-strong)]/40"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                    )}
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-[var(--text-subtle)]">
                        {link.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--text-subtle)]">
                Vortex Ac {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
