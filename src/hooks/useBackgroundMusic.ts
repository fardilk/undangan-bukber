import { useEffect, useRef } from 'react'

export function useBackgroundMusic(src: string, volume = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume
    audio.preload = 'auto'
    audioRef.current = audio

    const play = () => audio.play().catch(() => {})

    const onInteraction = () => {
      play()
      document.removeEventListener('click',      onInteraction, true)
      document.removeEventListener('touchend',   onInteraction, true)
      document.removeEventListener('pointerup',  onInteraction, true)
    }

    // Try autoplay directly first
    audio.play().catch(() => {
      // Blocked — wait for user interaction
      document.addEventListener('click',     onInteraction, { once: true, capture: true })
      document.addEventListener('touchend',  onInteraction, { once: true, capture: true })
      document.addEventListener('pointerup', onInteraction, { once: true, capture: true })
    })

    return () => {
      document.removeEventListener('click',     onInteraction, true)
      document.removeEventListener('touchend',  onInteraction, true)
      document.removeEventListener('pointerup', onInteraction, true)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [src, volume])
}
