import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchProjects, insertProject, updateProject, deleteProject,
  fetchTestimonials, insertTestimonial, updateTestimonial, deleteTestimonial,
  uploadTestimonialPhoto, uploadTestimonialVideo,
  signOut,
} from '../lib/supabase'
import { CATEGORIES } from '../config/site'

const inputCls =
  'w-full rounded-xl border border-line bg-ink-3 px-4 py-3 text-sm outline-none focus:border-accent'
const labelCls = 'mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted'

const PROJECT_FIELDS = [
  { name: 'slug', label: 'Slug', required: true },
  { name: 'title', label: 'Title', required: true },
  { name: 'client_name', label: 'Client Name' },
  { name: 'industry', label: 'Industry' },
  { name: 'thumbnail_url', label: 'Thumbnail URL' },
  { name: 'cover_image_url', label: 'Cover Image URL' },
  { name: 'preview_video_url', label: 'Preview Video URL' },
  { name: 'full_video_url', label: 'Full Video URL' },
  { name: 'results', label: 'Results (optional one-liner)' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
]

const emptyProject = {
  slug: '', title: '', client_name: '', category: CATEGORIES[0].key, industry: '',
  description: '', services: '', thumbnail_url: '', cover_image_url: '',
  preview_video_url: '', full_video_url: '', gallery_urls: '', results: '', sort_order: 0,
}

const emptyTestimonial = { client_name: '', company: '', review: '', photo_url: '', video_url: '', sort_order: 0 }

/** projects.services/gallery_urls are jsonb arrays; the form edits them as comma-separated text. */
function toFormProject(p) {
  return {
    ...emptyProject,
    ...p,
    services: (p.services || []).join(', '),
    gallery_urls: (p.gallery_urls || []).join(', '),
  }
}

function toDbProject(form) {
  return {
    ...form,
    sort_order: Number(form.sort_order) || 0,
    services: form.services.split(',').map((s) => s.trim()).filter(Boolean),
    gallery_urls: form.gallery_urls.split(',').map((s) => s.trim()).filter(Boolean),
  }
}

function ProjectForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const isEdit = Boolean(initial.id)

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toDbProject(form)
      if (isEdit) await updateProject(form.id, payload)
      else await insertProject(payload)
      onSaved()
    } catch (err) {
      setError(err.message || 'Failed to save project.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-ink-2 p-6 sm:grid-cols-2">
      <h3 className="display text-xl sm:col-span-2">{isEdit ? 'Edit Project' : 'New Project'}</h3>

      <label>
        <span className={labelCls}>Category</span>
        <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>{c.title}</option>
          ))}
        </select>
      </label>

      {PROJECT_FIELDS.map((f) => (
        <label key={f.name}>
          <span className={labelCls}>{f.label}{f.required && <span className="text-accent"> *</span>}</span>
          <input
            type={f.type || 'text'}
            required={f.required}
            value={form[f.name]}
            onChange={(e) => set(f.name, e.target.value)}
            className={inputCls}
          />
        </label>
      ))}

      <label className="sm:col-span-2">
        <span className={labelCls}>Description</span>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} className={inputCls} />
      </label>

      <label className="sm:col-span-2">
        <span className={labelCls}>Services (comma-separated)</span>
        <input value={form.services} onChange={(e) => set('services', e.target.value)} className={inputCls} />
      </label>

      <label className="sm:col-span-2">
        <span className={labelCls}>Gallery Image URLs (comma-separated)</span>
        <input value={form.gallery_urls} onChange={(e) => set('gallery_urls', e.target.value)} className={inputCls} />
      </label>

      {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={saving} className="rounded-full bg-accent px-6 py-2.5 font-display text-sm font-semibold text-ink disabled:opacity-60">
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-6 py-2.5 font-display text-sm text-white/70 hover:text-white">
          Cancel
        </button>
      </div>
    </form>
  )
}

function WorksPanel() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null=list, object=form (new or existing)

  const load = () => {
    setLoading(true)
    fetchProjects().then(setProjects).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const onDelete = async (p) => {
    if (!window.confirm(`Delete "${p.title}"? This can't be undone.`)) return
    await deleteProject(p.id)
    load()
  }

  if (editing) {
    return (
      <ProjectForm
        initial={editing.id ? toFormProject(editing) : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); load() }}
      />
    )
  }

  return (
    <div>
      <button
        onClick={() => setEditing(emptyProject)}
        className="mb-6 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-semibold text-ink"
      >
        + Add Project
      </button>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Sort</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="p-4">{p.title}</td>
                  <td className="p-4 text-muted">{p.category}</td>
                  <td className="p-4 text-muted">{p.sort_order}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setEditing(p)} className="mr-4 text-accent hover:underline">Edit</button>
                    <button onClick={() => onDelete(p)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const fileInputCls =
  'block w-full text-xs text-muted file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-display file:text-xs file:font-semibold file:text-ink file:cursor-pointer'

function TestimonialForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState({ photo: false, video: false })
  const [uploadError, setUploadError] = useState({ photo: '', video: '' })
  const isEdit = Boolean(initial.id)

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const handleFileUpload = async (field, uploaderFn, file) => {
    if (!file) return
    setUploading((u) => ({ ...u, [field]: true }))
    setUploadError((u) => ({ ...u, [field]: '' }))
    try {
      const url = await uploaderFn(file)
      set(`${field}_url`, url)
    } catch (err) {
      setUploadError((u) => ({ ...u, [field]: err.message || `Failed to upload ${field}.` }))
    } finally {
      setUploading((u) => ({ ...u, [field]: false }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0 }
      if (isEdit) await updateTestimonial(form.id, payload)
      else await insertTestimonial(payload)
      onSaved()
    } catch (err) {
      setError(err.message || 'Failed to save testimonial.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-ink-2 p-6 sm:grid-cols-2">
      <h3 className="display text-xl sm:col-span-2">{isEdit ? 'Edit Testimonial' : 'New Testimonial'}</h3>

      <label>
        <span className={labelCls}>Client Name <span className="text-accent">*</span></span>
        <input required value={form.client_name} onChange={(e) => set('client_name', e.target.value)} className={inputCls} />
      </label>
      <label>
        <span className={labelCls}>Company</span>
        <input value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls} />
      </label>
      <label className="sm:col-span-2">
        <span className={labelCls}>Review <span className="text-accent">*</span></span>
        <textarea required rows={3} value={form.review} onChange={(e) => set('review', e.target.value)} className={inputCls} />
      </label>

      <div className="space-y-2">
        <span className={labelCls}>Photo</span>
        <div className="flex items-center gap-3">
          {form.photo_url && (
            <img src={form.photo_url} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={uploading.photo}
            onChange={(e) => handleFileUpload('photo', uploadTestimonialPhoto, e.target.files?.[0])}
            className={fileInputCls}
          />
        </div>
        {uploading.photo && <p className="text-xs text-muted">Uploading…</p>}
        {uploadError.photo && <p className="text-xs text-red-400">{uploadError.photo}</p>}
        <input
          value={form.photo_url}
          onChange={(e) => set('photo_url', e.target.value)}
          placeholder="Or paste a photo URL"
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <span className={labelCls}>Video</span>
        {form.video_url && (
          <video src={form.video_url} controls muted className="aspect-video w-full rounded-lg bg-black" />
        )}
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          disabled={uploading.video}
          onChange={(e) => handleFileUpload('video', uploadTestimonialVideo, e.target.files?.[0])}
          className={fileInputCls}
        />
        {uploading.video && <p className="text-xs text-muted">Uploading…</p>}
        {uploadError.video && <p className="text-xs text-red-400">{uploadError.video}</p>}
        <input
          value={form.video_url}
          onChange={(e) => set('video_url', e.target.value)}
          placeholder="Or paste a video URL"
          className={inputCls}
        />
      </div>

      <label>
        <span className={labelCls}>Sort Order</span>
        <input type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} className={inputCls} />
      </label>

      {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={saving || uploading.photo || uploading.video}
          className="rounded-full bg-accent px-6 py-2.5 font-display text-sm font-semibold text-ink disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-line px-6 py-2.5 font-display text-sm text-white/70 hover:text-white">
          Cancel
        </button>
      </div>
    </form>
  )
}

function TestimonialsPanel() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  const load = () => {
    setLoading(true)
    fetchTestimonials().then(setTestimonials).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const onDelete = async (t) => {
    if (!window.confirm(`Delete testimonial from "${t.client_name}"? This can't be undone.`)) return
    await deleteTestimonial(t.id)
    load()
  }

  if (editing) {
    return (
      <TestimonialForm
        initial={editing.id ? editing : emptyTestimonial}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); load() }}
      />
    )
  }

  return (
    <div>
      <button
        onClick={() => setEditing(emptyTestimonial)}
        className="mb-6 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-semibold text-ink"
      >
        + Add Testimonial
      </button>

      {loading ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Company</th>
                <th className="p-4">Sort</th>
                <th className="p-4" />
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-b border-line last:border-0">
                  <td className="p-4">{t.client_name}</td>
                  <td className="p-4 text-muted">{t.company}</td>
                  <td className="p-4 text-muted">{t.sort_order}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setEditing(t)} className="mr-4 text-accent hover:underline">Edit</button>
                    <button onClick={() => onDelete(t)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('works')

  const onLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-svh bg-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-5">
        <span className="display text-lg">Edit Theory Admin</span>
        <button onClick={onLogout} className="rounded-full border border-line px-4 py-2 text-sm text-white/70 hover:text-white">
          Log out
        </button>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex gap-2">
          {['works', 'testimonials'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full border px-5 py-2 font-display text-xs uppercase tracking-wide ${
                tab === t ? 'border-accent bg-accent text-ink' : 'border-line text-white/60 hover:text-white'
              }`}
            >
              {t === 'works' ? 'Works' : 'Testimonials'}
            </button>
          ))}
        </div>

        {tab === 'works' ? <WorksPanel /> : <TestimonialsPanel />}
      </div>
    </div>
  )
}
