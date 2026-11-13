import { MessageCircleHeart, PartyPopper, Quote, ScrollText } from 'lucide-react'

const fields = [
  { key: 'funniestMoment', label: 'Funniest moment', placeholder: 'The exact second everyone lost it...', limit: 280, icon: PartyPopper },
  { key: 'iconicQuote', label: 'Most iconic quote', placeholder: 'Put it on a T-shirt.', limit: 160, icon: Quote },
  { key: 'bestMoment', label: 'Best moment of the night', placeholder: 'The bit everyone will remember.', limit: 280, icon: MessageCircleHeart },
  { key: 'description', label: 'The short version', placeholder: 'Give the recap a little context.', limit: 400, icon: ScrollText },
]

export default function IconicMoments({ moments, onChange }) {
  return <section className="mt-10 border-t border-white/10 pt-8"><p className="text-xs font-bold tracking-[0.16em] text-[#f8ef4e] uppercase">The details</p><h3 className="font-display mt-1 text-3xl tracking-[-0.06em]">ICONIC MOMENTS</h3><p className="mt-2 text-sm text-[#a99fba]">Optional, but the little specifics make a recap hit differently.</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">{fields.map(({ key, label, placeholder, limit, icon: Icon }) => <label key={key} className={key === 'description' ? 'sm:col-span-2' : ''}><span className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#d9d0e8] uppercase"><Icon size={14} className="text-[#4ae0bd]" /> {label}</span><textarea value={moments[key]} maxLength={limit} onChange={(event) => onChange(key, event.target.value)} placeholder={placeholder} rows={key === 'description' ? 3 : 4} className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-[#7e7493] focus:border-[#f8ef4e] focus:bg-white/[0.09]" /><span className="mt-1 block text-right text-[11px] text-[#867c99]">{moments[key].length}/{limit}</span></label>)}</div>
  </section>
}
