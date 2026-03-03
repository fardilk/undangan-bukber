import Hero from './components/Hero'
import SaveTheDate from './components/SaveTheDate'
import DetailAcara from './components/DetailAcara'
import Reservasi from './components/Reservasi'
import DaftarUndangan from './components/DaftarUndangan'
import PesanBukber from './components/PesanBukber'
import AyatPenutup from './components/AyatPenutup'
import Footer from './components/Footer'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'

const MUSIC_SRC = '/fiikuri-marhaban-ya-ramadan-promotion-commercial-background-music-307992.mp3'

export default function App() {
  useBackgroundMusic(MUSIC_SRC, 0.35)

  return (
    <div className="min-h-full bg-[#1a0a00] text-[#f5e6c8] font-['Lato',sans-serif]">
      <Hero />
      <SaveTheDate />
      <DetailAcara />
      <Reservasi />
      <DaftarUndangan />
      <PesanBukber />
      <AyatPenutup />
      <Footer />
    </div>
  )
}
