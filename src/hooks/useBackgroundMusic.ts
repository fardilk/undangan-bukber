import { useEffect, useRef } from 'react'

export function useBackgroundMusic(src: string, volume = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume
    audio.preload = 'auto'
    audioRef.current = audio

    const tryPlay = () => {
      if (!audioRef.current) return
      audioRef.current.play().catch(() => {})
      cleanup()
    }

    const cleanup = () => {
      document.removeEventListener('scroll', tryPlay, true)
      document.removeEventListener('touchstart', tryPlay, true)
      document.removeEventListener('click', tryPlay, true)
      document.removeEventListener('pointerdown', tryPlay, true)
    }

    document.addEventListener('scroll', tryPlay, { once: true, capture: true })
    document.addEventListener('touchstart', tryPlay, { once: true, capture: true })
    document.addEventListener('click', tryPlay, { once: true, capture: true })
    document.addEventListener('pointerdown', tryPlay, { once: true, capture: true })

    return () => {
      cleanup()
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, volume])
}
