import { motion } from 'framer-motion'
import { Plus, Flame } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { WHATSAPP_URL } from '../config/site'

// PLACEHOLDER PRICING — Prime Cut's real retainer packages, not Tharun Speaks'
// cohort pricing. Swap the numbers and feature bullets below before launch.
const PLANS = [
  {
    name: 'Starter',
    tagline: 'For creators finding their rhythm.',
    originalPrice: '₹15,000',
    price: '₹9,999',
    variant: 'plain',
    items: [
      '4 videos edited per month',
      'Captions, color grading & sound mix',
      '1 round of revisions',
      'Monthly content calendar',
    ],
  },
  {
    name: 'Growth',
    tagline: 'For creators ready to scale.',
    originalPrice: '₹28,000',
    price: '₹18,999',
    variant: 'popular',
    items: [
      'Everything in Starter',
      '8 videos edited per month',
      'Dedicated editor & thumbnail design',
      'Weekly content strategy call',
      'Priority turnaround',
    ],
  },
  {
    name: 'Premium',
    tagline: 'For brands building a lasting presence.',
    originalPrice: '₹48,000',
    price: '₹32,999',
    variant: 'premium',
    items: [
      'Everything in Growth',
      'Full production support (shoot + edit)',
      'Unlimited revisions',
      'Dedicated brand strategist',
      'Monthly performance report',
      'Priority WhatsApp support',
    ],
  },
]

// Hand-tuned jagged edge for the "torn paper" premium card — zigzag along the
// top and bottom, straight sides.
const TORN_CLIP =
  'polygon(0% 2%, 4% 0%, 8% 3%, 12% 1%, 16% 4%, 20% 0%, 24% 3%, 28% 1%, 32% 4%, 36% 0%, 40% 3%, 44% 1%, 48% 4%, 52% 0%, 56% 3%, 60% 1%, 64% 4%, 68% 0%, 72% 3%, 76% 1%, 80% 4%, 84% 0%, 88% 3%, 92% 1%, 96% 4%, 100% 1%, 100% 98%, 96% 100%, 92% 97%, 88% 100%, 84% 97%, 80% 100%, 76% 97%, 72% 100%, 68% 97%, 64% 100%, 60% 97%, 56% 100%, 52% 97%, 48% 100%, 44% 97%, 40% 100%, 36% 97%, 32% 100%, 28% 97%, 24% 100%, 20% 97%, 16% 100%, 12% 97%, 8% 100%, 4% 97%, 0% 100%)'

function PlanCard({ plan, i }) {
  const isPremium = plan.variant === 'premium'
  const isPopular = plan.variant === 'popular'

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`relative p-8 sm:p-9 ${
        isPremium
          ? 'text-white'
          : isPopular
            ? 'rounded-2xl border border-accent/40 bg-linear-to-b from-accent/10 to-ink-2'
            : 'rounded-2xl border border-line bg-ink-2/70'
      }`}
      style={isPremium ? { clipPath: TORN_CLIP } : undefined}
    >
      {isPopular && (
        <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-ink">
          <Flame size={12} className="fill-ink" /> Most Popular
        </span>
      )}

      <h3 className="font-display text-lg font-bold uppercase tracking-wide">{plan.name}</h3>
      <p className={`mt-1 text-sm ${isPremium ? 'text-white/70' : 'text-muted'}`}>{plan.tagline}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className={`text-sm line-through ${isPremium ? 'text-white/40' : 'text-white/30'}`}>
          {plan.originalPrice}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="display text-4xl sm:text-5xl">{plan.price}</span>
        <span className={`text-sm ${isPremium ? 'text-white/60' : 'text-muted'}`}>/mo +GST</span>
      </div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-7 block rounded-full bg-accent py-3 text-center font-display text-sm font-bold text-ink transition hover:brightness-110"
      >
        Join Now
      </a>

      <p className={`mt-8 font-display text-xs font-semibold uppercase tracking-[0.15em] ${isPremium ? 'text-white/50' : 'text-white/50'}`}>
        What&rsquo;s Included
      </p>
      <ul className="mt-4 space-y-3">
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <Plus size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )

  if (!isPremium) return card

  return (
    <div className="relative lg:-my-6">
      <div
        className="absolute -inset-1.5 bg-white/90"
        style={{ clipPath: TORN_CLIP }}
        aria-hidden
      />
      <div
        className="relative bg-linear-to-b from-red-700 to-red-950"
        style={{ clipPath: TORN_CLIP }}
      >
        {card}
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #05070f 0%, #0a1030 45%, #0c1440 75%, #05070f 100%)' }}
        aria-hidden
      />
      <div
        className="aurora-blob -left-52 top-0 h-155 w-155"
        style={{ background: 'conic-gradient(from 120deg, #4f46e5, #7c3aed, #38bdf8, #4f46e5)' }}
        aria-hidden
      />
      <div
        className="aurora-blob -right-52 bottom-0 h-155 w-155"
        style={{ background: 'conic-gradient(from 300deg, #38bdf8, #6366f1, #a855f7, #38bdf8)', animationDelay: '-10s' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="The Best *Prices* Ever"
          blurb="Pick your plan and start creating today. One flat fee."
        />
        <Reveal>
          <div className="grid gap-6 pt-2 lg:grid-cols-3 lg:items-center lg:gap-5">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} i={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
