import { Moon } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-20">
      <img
        src="/keluarga-ngangin.jpg"
        alt="Keluarga Ngangin"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#1a0a00] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
        <Moon className="text-[#d4a854]" size={48} strokeWidth={1.5} />

        <p className="text-[#d4a854] text-base md:text-lg font-light">
          Assalamu'alaikum Wr. Wb.
        </p>

        <p className="text-[#f5e6c8]/90 text-sm md:text-base leading-relaxed">
          Om, Tante, Mas, Mba, Adik & semua keponakan tersayang
        </p>

        <h1 className="font-['Amiri',serif] text-5xl md:text-7xl leading-tight">
          Buka Puasa<br />Bersama
        </h1>

        <p className="text-[#d4a854] text-sm md:text-base tracking-[0.3em] uppercase font-light">
          Ramadan 1447 H
        </p>

        <div className="w-16 h-px bg-[#d4a854]/60 my-2" />

        <p className="text-[#f5e6c8]/80 text-base md:text-lg leading-relaxed">
          Kami mengundang semua keluarga untuk silaturahmi dan berkumpul
          di rumah kami dalam acara <span className="text-[#d4a854]">Buka Puasa Bersama (Bukber)</span>.
        </p>

        <a
          href="#detail"
          className="mt-4 px-8 py-3 border border-[#d4a854]/60 text-[#d4a854] text-sm md:text-base tracking-widest uppercase hover:bg-[#d4a854]/10 transition-colors rounded"
        >
          Lihat Detail
        </a>
      </div>
    </section>
  )
}
