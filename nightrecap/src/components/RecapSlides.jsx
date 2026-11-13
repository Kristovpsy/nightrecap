import { Crown, MapPin, Quote, Sparkles, Star, Trophy } from 'lucide-react'
import { motion } from 'motion/react'

function formatDate(value) {
  if (!value) return 'One for the books'
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? 'One for the books' : new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

function SlideFrame({ theme, children, number, exporting }) {
  return <article className="relative isolate h-full w-full overflow-hidden rounded-[2.3rem] p-6 sm:p-9" style={{ background: theme.bg, color: theme.ink }}>
    <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 84% 9%, ${theme.pop}88, transparent 27%), radial-gradient(circle at 8% 84%, ${theme.cool}55, transparent 30%)` }} />
    <div className="pointer-events-none absolute -right-[12%] top-[28%] h-[42%] w-[58%] rounded-full border-[26px] opacity-25" style={{ borderColor: theme.accent }} />
    <div className="relative z-10 h-full">{children}</div>
    <span className="absolute bottom-6 left-7 z-10 text-[9px] font-bold tracking-[0.24em] opacity-65 sm:bottom-9 sm:left-9">NIGHT/RECAP {String(number + 1).padStart(2, '0')}</span>
    {!exporting && <span className="absolute bottom-6 right-7 z-10 text-[9px] font-bold tracking-[0.2em] opacity-50 sm:bottom-9 sm:right-9">STORY EDITION</span>}
  </article>
}

export function CoverSlide({ recap, photos, theme, exporting }) {
  const cover = photos.find((photo) => photo.cover) || photos[0]
  return <SlideFrame theme={theme} number={0} exporting={exporting}><div className="flex h-full flex-col justify-between"><div className="flex items-center justify-between text-[10px] font-bold tracking-[0.18em] uppercase"><span>{recap.event.vibe}</span><Sparkles size={18} /></div><div className="relative"><div className="absolute -left-2 -top-8 text-7xl leading-none opacity-30">*</div><h1 className="font-display relative max-w-[90%] text-5xl leading-[0.8] tracking-[-0.08em] sm:text-7xl">{recap.event.title || 'THE NIGHT OUT'}</h1><p className="mt-5 flex items-center gap-2 text-sm font-bold"><MapPin size={15} /> {recap.event.location || 'Somewhere unforgettable'}</p><p className="mt-1 text-sm opacity-70">{formatDate(recap.event.date)}</p></div>{cover ? <div className="relative ml-auto w-[78%] rotate-[-3deg] border-[9px] border-[#fff8e7] bg-[#fff8e7] p-2 shadow-2xl"><img crossOrigin="anonymous" src={cover.url} alt="Cover memory" className="aspect-[4/5] w-full object-cover" /><span className="block py-1 text-center text-[10px] font-black tracking-[0.14em] text-[#241738] uppercase">Proof it happened</span></div> : <div className="flex aspect-[4/3] items-end rounded-[2rem] border border-white/25 p-6" style={{ background: theme.gradient }}><span className="font-display max-w-[75%] text-3xl leading-[0.85] tracking-[-0.07em]">A NIGHT IN SIX CHAPTERS.</span></div>}</div></SlideFrame>
}

export function StatsSlide({ recap, photos, theme, exporting }) {
  const stats = [{ value: recap.event.attendees || '—', label: 'in the group chat' }, { value: photos.length, label: 'photos saved' }, { value: recap.event.vibe || '—', label: 'the chosen vibe' }]
  return <SlideFrame theme={theme} number={1} exporting={exporting}><div className="flex h-full flex-col"><p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: theme.accent }}>The debrief</p><h2 className="font-display mt-3 text-5xl leading-[0.82] tracking-[-0.08em] sm:text-7xl">BY THE<br />NUMBERS</h2><div className="mt-auto grid gap-3"><div className="rounded-3xl p-5" style={{ background: theme.accent, color: theme.bg }}><span className="font-display text-6xl leading-none tracking-[-0.08em]">{stats[0].value}</span><p className="mt-2 text-xs font-bold uppercase">{stats[0].label}</p></div><div className="grid grid-cols-2 gap-3">{stats.slice(1).map((stat) => <div key={stat.label} className="min-h-34 rounded-3xl border border-white/20 bg-white/10 p-4"><p className="font-display break-words text-3xl leading-[0.85] tracking-[-0.07em]">{stat.value}</p><p className="mt-3 text-[10px] font-bold tracking-[0.12em] uppercase opacity-70">{stat.label}</p></div>)}</div></div></div></SlideFrame>
}

export function MemoriesSlide({ recap, photos, theme, exporting }) {
  return <SlideFrame theme={theme} number={2} exporting={exporting}><div className="flex h-full flex-col"><div className="flex items-start justify-between"><div><p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: theme.accent }}>The camera roll</p><h2 className="font-display mt-2 text-4xl leading-[0.85] tracking-[-0.07em] sm:text-6xl">THE<br />MEMORIES</h2></div><Star className="mt-1" style={{ color: theme.accent }} fill="currentColor" /></div>{photos.length ? <div className="relative mt-auto h-[65%]"><div className="absolute left-[3%] top-[8%] h-[62%] w-[55%] -rotate-6 border-[7px] border-[#fff8e7] p-1"><img crossOrigin="anonymous" src={photos[0].url} alt="Memory one" className="h-full w-full object-cover" /></div>{photos.slice(1, 4).map((photo, index) => <div key={photo.id} className="absolute border-[6px] border-[#fff8e7] p-1 shadow-xl" style={{ width: index === 0 ? '48%' : '42%', height: index === 0 ? '43%' : '39%', right: index === 0 ? '1%' : `${5 + index * 8}%`, top: index === 0 ? '4%' : `${45 + index * 6}%`, transform: `rotate(${index === 0 ? 7 : -4}deg)` }}><img crossOrigin="anonymous" src={photo.url} alt={`Memory ${index + 2}`} className="h-full w-full object-cover" /></div>)}<p className="absolute bottom-1 left-0 max-w-[75%] font-display text-xl leading-[0.9] tracking-[-0.05em]" style={{ color: theme.accent }}>{recap.moments.bestMoment || 'THE GOOD PARTS STAY WITH US.'}</p></div> : <div className="mt-auto flex h-[58%] flex-col justify-end rounded-[2rem] border-2 border-dashed border-white/25 p-6" style={{ background: theme.gradient }}><span className="text-5xl">✦</span><p className="font-display mt-4 text-3xl leading-[0.86] tracking-[-0.07em]">NO PHOTO RECEIPTS. STILL A NIGHT TO REMEMBER.</p></div>}</div></SlideFrame>
}

const awardLabels = { mvp: 'MVP', dressed: 'BEST DRESSED', twist: 'PLOT TWIST', disappeared: 'VANISHED' }
export function AwardsSlide({ recap, theme, exporting }) {
  const awards = Object.entries(recap.awards).filter(([, award]) => award.name)
  return <SlideFrame theme={theme} number={3} exporting={exporting}><div className="flex h-full flex-col"><p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: theme.accent }}>The superlatives</p><h2 className="font-display mt-2 text-5xl leading-[0.82] tracking-[-0.08em] sm:text-6xl">NIGHT<br />AWARDS</h2>{awards.length ? <div className="mt-auto grid gap-3">{awards.map(([type, award], index) => <div key={type} className="rounded-3xl border border-white/18 bg-white/10 p-4" style={{ transform: `translateX(${index % 2 ? 12 : 0}px)` }}><div className="flex items-center gap-3"><span className="rounded-2xl p-3" style={{ color: theme.accent, background: `${theme.accent}22` }}><Trophy size={19} /></span><div><p className="text-[10px] font-bold tracking-[0.15em] opacity-65">{awardLabels[type]}</p><p className="font-display text-2xl tracking-[-0.06em]">{award.name}</p></div></div>{award.reason && <p className="mt-2 pl-1 text-xs italic opacity-75">“{award.reason}”</p>}</div>)}</div> : <div className="mt-auto rounded-[2rem] border border-dashed border-white/30 p-6"><Crown size={32} style={{ color: theme.accent }} /><p className="font-display mt-4 text-3xl leading-[0.88] tracking-[-0.07em]">NO TROPHIES GIVEN. EVERYONE SURVIVED.</p></div>}</div></SlideFrame>
}

export function QuoteSlide({ recap, theme, exporting }) {
  const hasQuote = recap.moments.iconicQuote || recap.moments.funniestMoment
  const quote = <>“{recap.moments.iconicQuote || (hasQuote ? recap.moments.funniestMoment : 'Some nights are better left in the group chat.')}”</>
  return <SlideFrame theme={theme} number={4} exporting={exporting}><div className="flex h-full flex-col justify-center"><Quote className="mb-5 h-12 w-12" style={{ color: theme.accent }} fill="currentColor" />{exporting ? <p className="font-display text-4xl leading-[0.88] tracking-[-0.08em] sm:text-6xl">{quote}</p> : <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-display text-4xl leading-[0.88] tracking-[-0.08em] sm:text-6xl">{quote}</motion.p>}{recap.moments.funniestMoment && recap.moments.iconicQuote && <div className="mt-10 border-l-2 pl-4" style={{ borderColor: theme.accent }}><p className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ color: theme.accent }}>Also unforgettable</p><p className="mt-2 text-sm leading-relaxed">{recap.moments.funniestMoment}</p></div>}</div></SlideFrame>
}

export function FinaleSlide({ recap, theme, exporting }) {
  const closings = { 'Neon Nights': 'The group chat will never recover.', 'Retro Film': 'Some nights deserve a sequel.', 'Sunset Party': 'Memories were made. Decisions were questionable.' }
  return <SlideFrame theme={theme} number={5} exporting={exporting}><div className="flex h-full flex-col justify-between"><div className="flex items-center gap-2 text-xs font-bold tracking-[0.18em]" style={{ color: theme.accent }}><Sparkles size={15} /> THAT&apos;S A WRAP</div><div><p className="font-display text-5xl leading-[0.82] tracking-[-0.08em] sm:text-7xl">{closings[recap.event.vibe] || closings['Neon Nights']}</p><div className="mt-9 h-1 w-24" style={{ background: theme.accent }} /><p className="mt-5 text-sm font-bold">{recap.event.title || 'One unforgettable night'}</p><p className="mt-1 text-xs opacity-65">{formatDate(recap.event.date)}</p></div><p className="font-display text-2xl tracking-[-0.07em]">NIGHT/RECAP</p></div></SlideFrame>
}

const slides = [CoverSlide, StatsSlide, MemoriesSlide, AwardsSlide, QuoteSlide, FinaleSlide]
export default function RecapSlide({ index, ...props }) { const Component = slides[index]; return <Component {...props} /> }
