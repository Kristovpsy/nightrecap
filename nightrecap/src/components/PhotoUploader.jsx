import { ImagePlus, Star, Trash2, Upload } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']

export default function PhotoUploader({ photos, onAdd, onRemove, onCover }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const remaining = 10 - photos.length

  function handleFiles(files) {
    const incoming = Array.from(files)
    const invalid = incoming.find((file) => !acceptedTypes.includes(file.type) || file.size > 5 * 1024 * 1024)
    if (invalid) {
      setError(!acceptedTypes.includes(invalid.type) ? 'Use JPG, PNG, or WebP images only.' : 'Each photo must be 5 MB or smaller.')
      return
    }
    if (incoming.length > remaining) {
      setError(`There is room for ${remaining} more ${remaining === 1 ? 'photo' : 'photos'}.`)
      return
    }
    setError('')
    onAdd(incoming)
  }

  return <section>
    <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold tracking-[0.16em] text-[#f8ef4e] uppercase">The camera roll</p><h3 className="font-display mt-1 text-3xl tracking-[-0.06em]">PHOTO PROOF</h3></div><span className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-[#d9d0e8]">{photos.length}/10</span></div>
    <p className="mb-4 rounded-2xl border border-[#4ae0bd]/20 bg-[#4ae0bd]/8 px-4 py-3 text-xs leading-relaxed text-[#c9ffef]">Photos are processed only in this browser and are never uploaded. They live in memory, so they will be lost if you refresh or close this tab.</p>
    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => { handleFiles(event.target.files); event.target.value = '' }} />
    {remaining > 0 && <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); handleFiles(event.dataTransfer.files) }} className={`group flex min-h-40 w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed px-5 text-center transition ${dragging ? 'border-[#f8ef4e] bg-[#f8ef4e]/10' : 'border-white/15 bg-white/[0.035] hover:border-[#4ae0bd] hover:bg-[#4ae0bd]/8'}`}>
      <span className="mb-3 rounded-full bg-[#4ae0bd] p-3 text-[#13211e] transition group-hover:-translate-y-1"><Upload size={20} /></span><span className="font-bold">Drop photos here or browse</span><span className="mt-1 text-xs text-[#a99fba]">JPG, PNG, or WebP. Up to 5 MB each.</span>
    </button>}
    {error && <p role="alert" className="mt-3 rounded-xl border border-[#ff5aaf]/40 bg-[#ff5aaf]/10 px-3 py-2 text-sm text-[#ffd5e9]">{error}</p>}
    {photos.length === 0 ? <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/8 px-4 py-3 text-sm text-[#a99fba]"><ImagePlus size={18} className="text-[#4ae0bd]" /> Your shots will become the heart of your recap.</div> : <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((photo, index) => <motion.article key={photo.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className={`group relative aspect-square overflow-hidden rounded-2xl border-2 ${photo.cover ? 'border-[#f8ef4e]' : 'border-white/10'} bg-[#302644]`}>
        <img src={photo.url} alt={`Uploaded memory ${index + 1}`} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-2 pt-10"><button type="button" onClick={() => onCover(photo.id)} className={`inline-flex min-h-9 items-center gap-1 rounded-full px-2 text-[10px] font-bold uppercase ${photo.cover ? 'bg-[#f8ef4e] text-[#191125]' : 'bg-black/35 text-white hover:bg-black/55'}`}><Star size={12} fill={photo.cover ? 'currentColor' : 'none'} />{photo.cover ? 'Cover' : 'Set cover'}</button><button type="button" onClick={() => onRemove(photo.id)} aria-label={`Remove uploaded memory ${index + 1}`} className="rounded-full bg-black/45 p-2 text-white hover:bg-[#ff5aaf]"><Trash2 size={15} /></button></div>
      </motion.article>)}
    </div>}
  </section>
}
