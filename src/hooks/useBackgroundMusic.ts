import { useEffect, useRef, useState } from 'react'

export function useBackgroundMusic(src: string, volume = 0.35) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = document.createElement('audio')
    audio.src = src
    audio.loop = true
    audio.volume = volume
    audio.preload = 'auto'
    document.body.appendChild(audio)
    audioRef.current = audio

    // Auto-play on first scroll
    const onScroll = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { once: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      audio.pause()
      audio.src = ''
      document.body.removeChild(audio)
      audioRef.current = null
    }
  }, [src, volume])

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      await audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return { playing, toggle }
}
