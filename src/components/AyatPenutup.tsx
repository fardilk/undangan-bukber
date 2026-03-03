import { Moon } from 'lucide-react'

export default function AyatPenutup() {
  return (
    <section className="px-6 py-20 max-w-xl mx-auto text-center">
      <div className="w-16 h-px bg-[#d4a854]/40 mx-auto mb-10" />
      <Moon className="text-[#d4a854]/40 mx-auto mb-6" size={28} strokeWidth={1} />
      <p className="font-['Amiri',serif] text-2xl md:text-3xl mb-4">
        "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ"
      </p>
      <p className="text-sm md:text-base text-[#f5e6c8]/60 italic mb-8">
        "Dan tolong-menolonglah kamu dalam kebajikan dan ketakwaan." — QS. Al-Maidah: 2
      </p>
      <p className="text-[#f5e6c8]/80 text-base md:text-lg leading-relaxed mb-6">
        Semoga semuanya bisa dan berkenan hadir.<br />
        Salam sehat, sampai jumpa Sabtu di rumah kami.
      </p>
      <p className="text-[#d4a854] text-sm">
        Wassalamu'alaikum Wr. Wb.
      </p>
      <div className="w-16 h-px bg-[#d4a854]/40 mx-auto mt-10" />
    </section>
  )
}
