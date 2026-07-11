import { SITE_NAME } from '../config/site'

/**
 * Per-route SEO tags. React 19 hoists <title>/<meta> rendered anywhere in the
 * tree into <head>, so no helmet library is needed.
 */
export default function SEO({ title, description, image }) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Personal Branding Agency`
  const desc =
    description ||
    'Prime Cut is a Personal Branding Agency specializing in video editing, scripting, branding visuals and AI-powered content systems that help brands stand out and scale.'
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  )
}
