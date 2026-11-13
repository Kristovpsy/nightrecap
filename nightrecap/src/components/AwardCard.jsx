import { Crown, Drama, Shirt, Wind } from 'lucide-react'
import { motion } from 'motion/react'

const awardStyles = {
  mvp: { title: 'MVP of the Night', caption: 'carried the entire function', icon: Crown, color: 'text-[#f8ef4e]', border: 'border-[#f8ef4e]/35', bg: 'bg-[#f8ef4e]/8' },
  dressed: { title: 'Best Dressed', caption: 'understood the assignment', icon: Shirt, color: 'text-[#ff8dcb]', border: 'border-[#ff8dcb]/35', bg: 'bg-[#ff8dcb]/8' },
  twist: { title: 'Biggest Plot Twist', caption: 'nobody saw it coming', icon: Drama, color: 'text-[#4ae0bd]', border: 'border-[#4ae0bd]/35', bg: 'bg-[#4ae0bd]/8' },
  disappeared: { title: 'Disappearing Act', caption: 'gone without a trace', icon: Wind, color: 'text-[#91b9ff]', border: 'border-[#91b9ff]/35', bg: 'bg-[#91b9ff]/8' },
}

export default function AwardCard({ type, award, onChange }) {
  const style = awardStyles[type]
  const Icon = style.icon
  return <motion.article layout className={`rounded-3xl border ${style.border} ${style.bg} p-4`}><div className="flex items-start gap-3"><span className={`rounded-2xl bg-black/15 p-3 ${style.color}`}><Icon size={22} /></span><div><h4 className="font-display text-xl tracking-[-0.05em]">{style.title}</h4><p className="mt-0.5 text-xs text-[#aaa0bd]">{style.caption}</p></div></div><div className="mt-5 space-y-3"><label className="block text-xs font-bold tracking-[0.1em] text-[#cfc5df] uppercase">Recipient<input value={award.name} onChange={(event) => onChange(type, 'name', event.target.value)} placeholder="Give credit where due" className="mt-2 w-full rounded-xl border border-white/10 bg-black/15 px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7e7493] focus:border-white/50" /></label><label className="block text-xs font-bold tracking-[0.1em] text-[#cfc5df] uppercase">Why? <span className="normal-case text-[#827791]">optional</span><input value={award.reason} onChange={(event) => onChange(type, 'reason', event.target.value)} maxLength={120} placeholder="A little context..." className="mt-2 w-full rounded-xl border border-white/10 bg-black/15 px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#7e7493] focus:border-white/50" /></label></div><div className="mt-4 border-t border-white/10 pt-3 text-center"><span className={`font-display text-lg tracking-[-0.04em] ${award.name ? style.color : 'text-[#776c88]'}`}>{award.name || 'YOUR LEGEND HERE'}</span></div></motion.article>
}
