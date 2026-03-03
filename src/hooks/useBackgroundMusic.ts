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

    return () => {
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
