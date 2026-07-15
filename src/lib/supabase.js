import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null when env vars are missing — every consumer falls back to bundled content.
export const supabase = url && key ? createClient(url, key) : null

const contentQuery = (table) => async () => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export const fetchProjects = contentQuery('projects')
export const fetchTestimonials = contentQuery('testimonials')
export const fetchLogos = contentQuery('client_logos')
export const fetchStats = contentQuery('site_stats')
export const fetchCaseStudies = contentQuery('case_studies')

export async function fetchProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('projects').select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}

export async function fetchCaseStudyBySlug(slug) {
  const { data, error } = await supabase
    .from('case_studies').select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}

export async function insertLead(lead) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('leads').insert(lead)
  if (error) throw error
}

// ─── Admin auth ───────────────────────────────────────────────────────────
export async function signIn(email, password) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session
}

export async function signOut() {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthStateChange(callback) {
  if (!supabase) return { unsubscribe() {} }
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return data.subscription
}

// ─── Admin CRUD: projects (Works) ─────────────────────────────────────────
export async function insertProject(fields) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('projects').insert(fields)
  if (error) throw error
}

export async function updateProject(id, fields) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('projects').update(fields).eq('id', id)
  if (error) throw error
}

export async function deleteProject(id) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// ─── Admin CRUD: testimonials ──────────────────────────────────────────────
export async function insertTestimonial(fields) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('testimonials').insert(fields)
  if (error) throw error
}

export async function updateTestimonial(id, fields) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('testimonials').update(fields).eq('id', id)
  if (error) throw error
}

export async function deleteTestimonial(id) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}
