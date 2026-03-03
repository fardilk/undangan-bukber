import { useEffect, useRef } from 'react'

export function useBackgroundMusic(src: string, volume = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0
    audio.muted = true  // muted autoplay diizinkan semua browser
    audio.preload = 'auto'
    audioRef.current = audio

    // Start muted (always allowed)
    audio.play().catch(() => {})

    // Unmute on first interaction
    const unmute = () => {
      if (!audioRef.current) return
      audioRef.current.muted = false
      audioRef.current.volume = volume
      document.removeEventListener('click',      unmute, true)
      document.removeEventListener('touchstart', unmute, true)
      document.removeEventListener('keydown',    unmute, true)
      document.removeEventListener('scroll',     unmute, true)
    }

    document.addEventListener('click',      unmute, { once: true, capture: true })
    document.addEventListener('touchstart', unmute, { once: true, capture: true })
    document.addEventListener('keydown',    unmute, { once: true, capture: true })
    document.addEventListener('scroll',     unmute, { once: true, capture: true })

    return () => {
      document.removeEventListener('click',      unmute, true)
      document.removeEventListener('touchstart', unmute, true)
      document.removeEventListener('keydown',    unmute, true)
      document.removeEventListener('scroll',     unmute, true)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, volume])
}
