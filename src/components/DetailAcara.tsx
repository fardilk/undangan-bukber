import { MapPin, Clock, Calendar } from 'lucide-react'
import FadeIn from './FadeIn'

export default function DetailAcara() {
  return (
    <section id="detail" className="px-6 py-20 max-w-xl mx-auto">
      <FadeIn>
        <h2 className="font-['Amiri',serif] text-3xl md:text-4xl text-center mb-3">Detail Acara</h2>
        <p className="text-center text-[#d4a854]/70 text-xs md:text-sm tracking-[0.25em] uppercase mb-12">
          Ramah Tamah Keluarga Besar Ngangin
        </p>
      </FadeIn>

      <div className="flex flex-col gap-8">
        <FadeIn delay={100}>
          <div className="flex items-start gap-4">
            <Calendar className="text-[#d4a854] shrink-0 mt-1" size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[#d4a854] text-xs md:text-sm tracking-widest uppercase mb-1">Hari / Tanggal</p>
              <p className="text-lg md:text-xl font-light">Sabtu, 7 Maret 2026</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex items-start gap-4">
            <Clock className="text-[#d4a854] shrink-0 mt-1" size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[#d4a854] text-xs md:text-sm tracking-widest uppercase mb-1">Waktu</p>
              <p className="text-lg md:text-xl font-light">15.00 WIB — Selesai</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="flex items-start gap-4">
            <MapPin className="text-[#d4a854] shrink-0 mt-1" size={22} strokeWidth={1.5} />
            <div>
              <p className="text-[#d4a854] text-xs md:text-sm tracking-widest uppercase mb-1">Tempat</p>
              <p className="text-lg md:text-xl font-light">Sawo Griya Kencana 2</p>
              <p className="text-sm md:text-base text-[#f5e6c8]/60 mt-1">Blok G4, Limo, Cinere</p>
              <a
                href="https://maps.app.goo.gl/t7rdXbR4haGzsxfy6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-full border border-[#d4a854]/40 text-[#d4a854] text-xs tracking-widest uppercase hover:bg-[#d4a854]/10 transition-colors"
              >
                <MapPin size={12} /> Buka Google Maps
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
