"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, HardHat, ChevronRight } from "lucide-react"

const sidebarLinks = [
  { href: "/admin/dashboard/our-works", label: "Our Works" },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 z-50 h-full w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0"
      >
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-5">
          <HardHat className="h-6 w-6 text-amber-600" />
          <span className="text-lg font-bold text-gray-900">Ractysh Admin</span>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-amber-50 text-amber-800"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">Dashboard</span>
            <ChevronRight className="hidden h-4 w-4 sm:inline" />
            <span className="text-gray-900">
              {pathname === "/admin/dashboard/our-works"
                ? "Our Works"
                : "Loading..."}
            </span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
