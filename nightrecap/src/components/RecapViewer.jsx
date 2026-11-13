import { Download, Edit3, RotateCcw, Share2 } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { slideLabels, recapThemes } from '../recapThemes'
import { exportSlide } from '../utils/exportSlide'
import RecapSlide from './RecapSlides'

export default function RecapViewer({ recap, photos, onEdit, onThemeChange }) {
  const [index, setIndex] = useState(0)
  const [themeName, setThemeName] = useState(recap.event.vibe in recapThemes ? recap.event.vibe : 'Neon Nights')
  const [status, setStatus] = useState('')
  const [exporting, setExporting] = useState(false)
  const startX = useRef(null)
  const exportRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const theme = recapThemes[themeName]
  const move = (direction) => setIndex((current) => Math.min(5, Math.max(0, current + direction)))

  useEffect(() => {
    function onKeyDown(event) { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  async function download() {
    if (!exportRef.current) return
    setExporting(true); setStatus('Preparing your 9:16 slide...')
    try { await exportSlide(exportRef.current, `nightrecap-${String(index + 1).padStart(2, '0')}.png`); setStatus('PNG downloaded.') } catch { setStatus('Could not export this slide. Try again after photos finish loading.') } finally { setExporting(false) }
  }

  return <section className="relative mx-auto w-full max-w-6xl px-4 py-4 sm:px-8 sm:py-8"><div className="mb-4 flex items-center justify-between gap-3"><button onClick={onEdit} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-bold text-[#ded5ea] transition hover:border-white/40 hover:text-white"><Edit3 size={16} /> Edit recap</button><div className="flex gap-1" aria-label="Choose recap theme">{Object.keys(recapThemes).map((name) => <button key={name} onClick={() => { setThemeName(name); onThemeChange(name) }} aria-pressed={themeName === name} className={`h-8 w-8 rounded-full border-2 transition ${themeName === name ? 'scale-110 border-white' : 'border-transparent opacity-55 hover:opacity-100'}`} style={{ background: recapThemes[name].gradient }}><span className="sr-only">{name}</span></button>)}</div></div><div className="mx-auto max-w-[27rem]"><div className="mb-3 flex items-center justify-between text-[10px] font-bold tracking-[0.15em] text-[#c6bcd4] uppercase"><span>{slideLabels[index]}</span><span>{index + 1} / 6</span></div><div className="mb-3 flex gap-1.5" aria-label={`Slide ${index + 1} of 6`}>{slideLabels.map((label, step) => <button key={label} onClick={() => setIndex(step)} aria-label={`Go to ${label}`} className="h-1 flex-1 rounded-full transition" style={{ background: step <= index ? theme.accent : '#ffffff24' }} />)}</div><div className="relative aspect-[9/16] overflow-hidden rounded-[2.3rem] bg-[#211936] shadow-[0_30px_100px_#0009]" onPointerDown={(event) => { startX.current = event.clientX }} onPointerUp={(event) => { if (startX.current === null) return; const delta = event.clientX - startX.current; if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1); startX.current = null }}><AnimatePresence mode="wait" initial={false}><motion.div key={`${index}-${themeName}`} initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 45 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -45 }} transition={{ duration: reducedMotion ? 0.12 : 0.34, ease: 'easeOut' }} className="absolute inset-0"><RecapSlide index={index} recap={recap} photos={photos} theme={theme} /></motion.div></AnimatePresence></div><div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2"><button onClick={() => move(-1)} disabled={index === 0} className="min-h-12 rounded-full border border-white/15 px-4 text-sm font-bold disabled:opacity-30">Previous</button><button onClick={() => setIndex(0)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#f8ef4e]" aria-label="Replay recap"><RotateCcw size={17} /></button><button onClick={() => move(1)} disabled={index === 5} className="min-h-12 rounded-full px-4 text-sm font-bold text-[#171020] disabled:opacity-45" style={{ background: theme.accent }}>Next</button></div><button onClick={download} disabled={exporting} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 text-sm font-bold transition hover:bg-white/15 disabled:opacity-55"><Download size={17} /> {exporting ? 'Exporting...' : 'Download this slide as PNG'}</button>{status && <p role="status" className="mt-2 text-center text-xs text-[#c6bcd4]">{status}</p>}</div><div className="pointer-events-none fixed left-[-10000px] top-0 h-[1920px] w-[1080px] overflow-hidden" aria-hidden="true"><div ref={exportRef} className="h-[1920px] w-[1080px]"><RecapSlide index={index} recap={recap} photos={photos} theme={theme} exporting /></div></div><p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-[#8e839f]"><Share2 size={13} /> Swipe or use your arrow keys to move through the night.</p></section>
}
