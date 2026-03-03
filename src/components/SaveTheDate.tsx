import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

const EVENT_DATE = new Date('2026-03-07T15:00:00+07:00').getTime()

const CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=Buka+Puasa+Bersama+Keluarga' +
  '&dates=20260307T080000Z/20260307T170000Z' +
  '&details=Buka+Puasa+Bersama+%28Bukber%29+Keluarga' +
  '&location=Sawo+Griya+Kencana+2%2C+Blok+G4%2C+Limo%2C+Cinere'

export default function SaveTheDate() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [past, setPast] = useState(false)

  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE - Date.now()
      if (diff <= 0) { setPast(true); return }
      setCountdown({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="bg-[#120600] py-16 px-6 text-center border-t border-[#d4a854]/10">
      <p className="text-[#d4a854] text-xs md:text-sm tracking-[0.3em] uppercase mb-8">
        {past ? 'Acara Telah Berlangsung' : 'Menghitung Hari'}
      </p>

      {!past && (
        <div className="flex justify-center gap-4 md:gap-6 mb-10">
          {[
            { value: countdown.days,    label: 'Hari' },
            { value: String(countdown.hours).padStart(2, '0'),   label: 'Jam' },
            { value: String(countdown.minutes).padStart(2, '0'), label: 'Menit' },
            { value: String(countdown.seconds).padStart(2, '0'), label: 'Detik' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-xl md:text-3xl font-semibold mb-2 bg-[#d4a854]/10 border border-[#d4a854]/20 text-[#f5e6c8]">
                {value}
              </div>
              <span className="text-[10px] md:text-xs tracking-widest uppercase text-[#d4a854]/50">{label}</span>
            </div>
          ))}
        </div>
      )}

      <a
        href={CALENDAR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4a854]/40 text-[#d4a854] text-xs md:text-sm tracking-widest uppercase hover:bg-[#d4a854]/10 transition-colors"
      >
        <Calendar size={14} />
        Simpan ke Kalender
      </a>
    </section>
  )
}
