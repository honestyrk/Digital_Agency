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
