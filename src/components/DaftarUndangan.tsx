import { Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import FadeIn from './FadeIn'

interface Tamu {
  nama: string
  created_at: string
}

export default function DaftarUndangan() {
  const [tamu, setTamu] = useState<Tamu[]>([])

  useEffect(() => {
    supabase
      .from('rsvp_bukber')
      .select('nama, created_at')
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setTamu(data) })
  }, [])

  return (
    <section className="bg-[#100500] py-16 px-6 border-t border-[#d4a854]/10">
      <div className="max-w-xl mx-auto">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-8">
            <p className="text-[#d4a854] text-xs md:text-sm tracking-[0.3em] uppercase">Daftar Hadir</p>
            <span className="px-2 py-0.5 rounded-full bg-[#d4a854]/15 text-[#d4a854] text-xs md:text-sm font-semibold">
              {tamu.length}
            </span>
          </div>
        </FadeIn>

        <div className="space-y-2">
          {tamu.map((t, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#d4a854]/5 border border-[#d4a854]/10">
                <div className="w-7 h-7 rounded-full bg-[#d4a854]/15 border border-[#d4a854]/25 flex items-center justify-center shrink-0">
                  <Users size={13} className="text-[#d4a854]" />
                </div>
                <span className="text-[#f5e6c8]/85 text-sm md:text-base">{t.nama}</span>
                <span className="ml-auto text-[#f5e6c8]/30 text-xs md:text-sm">
                  {new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
