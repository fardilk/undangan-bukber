import { Music2, VolumeX } from 'lucide-react'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'

const MUSIC_SRC = '/fiikuri-marhaban-ya-ramadan-promotion-commercial-background-music-307992.mp3'

export default function MusicToggle() {
  const { playing, toggle } = useBackgroundMusic(MUSIC_SRC, 0.35)

  return (
    <button
      onClick={toggle}
      title={playing ? 'Matikan musik' : 'Putar musik'}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
      style={{
        background: playing
          ? 'linear-gradient(135deg, #d4a854, #a07830)'
          : 'rgba(26,10,0,0.75)',
        border: '1px solid rgba(212,168,84,0.4)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {playing
        ? <Music2 size={18} className="text-[#1a0a00]" />
        : <VolumeX size={18} className="text-[#d4a854]" />
      }
    </button>
  )
}
