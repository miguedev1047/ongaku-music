import { useTheme } from '@/hooks/use-theme'
import { useMediaStore } from '@/stores/media-store'
import { useEffect, useRef } from 'react'

function useAudioAnalyser(audioRef: HTMLAudioElement | null) {
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  useEffect(() => {
    if (!audioRef) return

    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(audioRef)

    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.85

    source.connect(analyser)
    analyser.connect(ctx.destination)

    analyserRef.current = analyser
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)

    return () => {
      ctx.close()
    }
  }, [audioRef])

  return { analyserRef, dataArrayRef }
}

function useCanvasVisualizer(
  canvasRef: HTMLCanvasElement | null,
  analyserRef: React.RefObject<AnalyserNode>,
  dataArrayRef: React.RefObject<Uint8Array>
) {
  const theme = useTheme()
  const isDark = theme.theme === 'dark'

  useEffect(() => {
    if (!canvasRef || !analyserRef.current || !dataArrayRef.current) return

    const canvas = canvasRef
    const ctx = canvas.getContext('2d')!
    let rafId: number

    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio
      canvas.height = canvas.clientHeight * devicePixelRatio
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      rafId = requestAnimationFrame(draw)

      analyserRef.current!.getByteFrequencyData(dataArrayRef.current! as never)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const bars = 24
      const step = Math.floor(dataArrayRef.current!.length / bars)
      const barWidth = canvas.width / bars

      for (let i = 0; i < bars; i++) {
        const value = dataArrayRef.current![i * step] / 255
        const barHeight = value * canvas.height

        ctx.fillStyle = isDark ? '#fff' : '#000'
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth * 0.8, barHeight)
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, analyserRef, dataArrayRef, isDark])
}

export function AudioVisualizer() {
  const audioRef = useMediaStore((s) => s.ref)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { analyserRef, dataArrayRef } = useAudioAnalyser(audioRef)

  useCanvasVisualizer(canvasRef.current, analyserRef as never, dataArrayRef as never)

  return <canvas ref={canvasRef} className="w-full h-24 absolute bottom-0 inset-x-0" />
}
