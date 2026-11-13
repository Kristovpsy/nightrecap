import { toPng } from 'html-to-image'

export async function exportSlide(node, filename) {
  await document.fonts?.ready
  const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 1, width: 1080, height: 1920, canvasWidth: 1080, canvasHeight: 1920 })
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
