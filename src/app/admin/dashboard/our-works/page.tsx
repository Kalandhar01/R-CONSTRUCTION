"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  ImageIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react"

const DIVISION = "Construction"

type Work = {
  _id: string
  id: string
  title: string
  slug: string
  division: string
  shortDescription: string
  description: string
  location: string
  status: "Completed" | "Ongoing" | "Upcoming"
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

const emptyWork: Partial<Work> = {
  title: "",
  shortDescription: "",
  description: "",
  location: "",
  status: "Completed",
  coverImage: "",
  galleryImages: [],
  featured: false,
  published: false,
  displayOrder: 0,
}

export default function OurWorksAdminPage() {
  const [works, setWorks] = useState<Work[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [featuredFilter, setFeaturedFilter] = useState("")
  const [page, setPage] = useState(1)

  const [showForm, setShowForm] = useState(false)
  const [editingWork, setEditingWork] = useState<Work | null>(null)
  const [formData, setFormData] = useState<Partial<Work>>(emptyWork)
  const [saving, setSaving] = useState(false)

  const [viewingWork, setViewingWork] = useState<Work | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<Work | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [coverUploading, setCoverUploading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)

  const fetchWorks = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        division: DIVISION,
        admin: "true",
        page: String(page),
        limit: "10",
      })
      if (search) params.set("search", search)
      if (statusFilter) params.set("status", statusFilter)
      if (featuredFilter) params.set("featured", featuredFilter)
      const res = await fetch(`/api/our-works?${params}`)
      const data = await res.json()
      setWorks(data.works || [])
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 })
    } catch {
      console.error("Failed to fetch works")
    } finally {
      setLoading(false)
    }
  }, [page, search, statusFilter, featuredFilter])

  useEffect(() => {
    fetchWorks()
  }, [fetchWorks])

  function openAddForm() {
    setEditingWork(null)
    setFormData(emptyWork)
    setShowForm(true)
  }

  function openEditForm(work: Work) {
    setEditingWork(work)
    setFormData({ ...work })
    setShowForm(true)
  }

  async function handleSave() {
    if (!formData.title) return
    setSaving(true)
    try {
      const body = { ...formData }
      delete (body as Record<string, unknown>)._id
      delete (body as Record<string, unknown>).id

      const url = editingWork
        ? `/api/our-works/${editingWork._id}`
        : "/api/our-works"
      const method = editingWork ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error("Save failed")
      setShowForm(false)
      fetchWorks()
    } catch {
      console.error("Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/our-works/${deleteTarget._id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete failed")
      setDeleteTarget(null)
      fetchWorks()
    } catch {
      console.error("Delete failed")
    } finally {
      setDeleting(false)
    }
  }

  async function uploadFile(file: File, type: "cover" | "gallery") {
    const form = new FormData()
    form.append("file", file)
    if (type === "cover") setCoverUploading(true)
    else setGalleryUploading(true)
    try {
      const res = await fetch("/api/our-works/upload", {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      if (type === "cover") {
        setFormData((prev) => ({ ...prev, coverImage: data.url }))
      } else {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...(prev.galleryImages || []), data.url],
        }))
      }
    } catch {
      console.error("Upload failed")
    } finally {
      if (type === "cover") setCoverUploading(false)
      else setGalleryUploading(false)
    }
  }

  function handleCoverDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) uploadFile(file, "cover")
  }

  function handleGalleryDrop(e: React.DragEvent) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    )
    files.forEach((f) => uploadFile(f, "gallery"))
  }

  function removeGalleryImage(index: number) {
    setFormData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index),
    }))
  }

  function handleSearch() {
    setPage(1)
    fetchWorks()
  }

  function statusColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Our Works</h1>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by title..."
              className="h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Featured
          </label>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            <option value="">All</option>
            <option value="true">Featured</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="h-9 rounded-lg bg-amber-600 px-4 text-sm font-medium text-white transition hover:bg-amber-700"
        >
          Apply
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && works.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 py-16 text-center">
          <ImageIcon className="h-12 w-12 text-gray-300" />
          <p className="text-sm text-gray-500">No projects found</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            <Plus className="h-4 w-4" />
            Add your first project
          </button>
        </div>
      )}

      {/* Data Table */}
      {!loading && works.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Cover
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">
                  Title
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-gray-500 md:table-cell">
                  Location
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-gray-500 sm:table-cell">
                  Status
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-gray-500 lg:table-cell">
                  Featured
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {works.map((work) => (
                <motion.tr
                  key={work._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="h-10 w-14 overflow-hidden rounded bg-gray-100">
                      {work.coverImage ? (
                        <img
                          src={work.coverImage}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="max-w-[200px] px-4 py-3">
                    <p className="truncate font-medium text-gray-900">
                      {work.title}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {work.shortDescription}
                    </p>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 md:table-cell">
                    {work.location || "—"}
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(work.status)}`}
                    >
                      {work.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {work.featured ? (
                      <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setViewingWork(work)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openEditForm(work)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(work)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            Page {pagination.page} of {pagination.totalPages} ({pagination.total}{" "}
            total)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-lg border border-gray-300 p-1.5 text-gray-600 transition hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              className="rounded-lg border border-gray-300 p-1.5 text-gray-600 transition hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 pt-10 pb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-6 text-xl font-bold text-gray-900">
                {editingWork ? "Edit Project" : "Add Project"}
              </h2>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Title *
                    </label>
                    <input
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Slug
                    </label>
                    <input
                      value={formData.slug || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="Auto-generated from title"
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Short Description
                    </label>
                    <input
                      value={formData.shortDescription || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          shortDescription: e.target.value,
                        }))
                      }
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Location
                    </label>
                    <input
                      value={formData.location || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Status
                    </label>
                    <select
                      value={formData.status || "Completed"}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, status: e.target.value as Work["status"] }))
                      }
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.displayOrder ?? 0}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          displayOrder: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="h-9 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex items-end gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={!!formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={!!formData.published}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            published: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      Published
                    </label>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Cover Image
                  </label>
                  <div
                    onDrop={handleCoverDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-amber-400"
                  >
                    {coverUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-500">
                      Drop an image or{" "}
                      <label className="cursor-pointer font-medium text-amber-600 hover:text-amber-700">
                        browse
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) uploadFile(file, "cover")
                          }}
                        />
                      </label>
                    </span>
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="h-12 w-20 rounded object-cover"
                      />
                      <span className="truncate text-xs text-gray-400">
                        {formData.coverImage}
                      </span>
                      <button
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, coverImage: "" }))
                        }
                        className="ml-auto text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Gallery Images
                  </label>
                  <div
                    onDrop={handleGalleryDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-amber-400"
                  >
                    {galleryUploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-amber-600" />
                    ) : (
                      <Upload className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-500">
                      Drop images or{" "}
                      <label className="cursor-pointer font-medium text-amber-600 hover:text-amber-700">
                        browse
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            files.forEach((f) => uploadFile(f, "gallery"))
                          }}
                        />
                      </label>
                    </span>
                  </div>
                  {(formData.galleryImages?.length ?? 0) > 0 && (
                    <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {formData.galleryImages?.map((img, i) => (
                        <div key={i} className="group relative">
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="h-16 w-full rounded object-cover"
                          />
                          <button
                            onClick={() => removeGalleryImage(i)}
                            className="absolute right-1 top-1 rounded bg-black/50 p-0.5 text-white opacity-0 transition group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.title}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-50"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingWork ? "Update" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {viewingWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 pt-10 pb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
            >
              <button
                onClick={() => setViewingWork(null)}
                className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-4 text-xl font-bold text-gray-900">
                {viewingWork.title}
              </h2>

              {viewingWork.coverImage && (
                <img
                  src={viewingWork.coverImage}
                  alt={viewingWork.title}
                  className="mb-4 w-full rounded-lg object-cover"
                  style={{ maxHeight: 300 }}
                />
              )}

              <div className="space-y-3 text-sm">
                <p className="text-gray-600">
                  {viewingWork.shortDescription}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {viewingWork.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {viewingWork.location && (
                    <div>
                      <span className="font-medium text-gray-500">
                        Location:{" "}
                      </span>
                      <span className="text-gray-700">
                        {viewingWork.location}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-500">Status: </span>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(viewingWork.status)}`}
                    >
                      {viewingWork.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Featured:{" "}
                    </span>
                    <span>{viewingWork.featured ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Published:{" "}
                    </span>
                    <span>{viewingWork.published ? "Yes" : "No"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500">
                      Division:{" "}
                    </span>
                    <span>{viewingWork.division}</span>
                  </div>
                </div>
              </div>

              {viewingWork.galleryImages?.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {viewingWork.galleryImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        className="h-24 w-full rounded object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-gray-900">
                Delete Project
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete{" "}
                <span className="font-medium text-gray-700">
                  {deleteTarget.title}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
