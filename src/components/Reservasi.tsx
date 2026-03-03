import { Heart, Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

type Status = 'idle' | 'checking' | 'already' | 'form' | 'sending' | 'done'

export default function Reservasi() {
  const [status, setStatus] = useState<Status>('idle')
  const [nama, setNama] = useState('')
  const [telp, setTelp] = useState('')
  const [clientIp, setClientIp] = useState<string | null>(null)

  async function handleClick() {
    setStatus('checking')
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const { ip } = await res.json()
      setClientIp(ip)
      const { data } = await supabase.from('rsvp_bukber').select('id').eq('ip_address', ip).maybeSingle()
      if (data) {
        setStatus('already')
        return
      }
    } catch {
      setClientIp(null)
    }
    setStatus('form')
  }

  async function handleKirim() {
    const trimNama = nama.trim()
    const trimTelp = telp.trim()
    if (!trimNama || !trimTelp) return
    setStatus('sending')
    const { error } = await supabase
      .from('rsvp_bukber')
      .insert({ nama: trimNama, nomor_telp: trimTelp, ip_address: clientIp })
    if (!error) {
      setNama('')
      setTelp('')
      setStatus('done')
    } else {
      setStatus('form')
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(212,168,84,0.25)',
    color: '#f5e6c8',
  }

  return (
    <>
      {/* Section */}
      <section className="bg-[#0e0400] py-16 px-6 text-center border-t border-[#d4a854]/10">
        <p className="text-[#d4a854] text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Konfirmasi Kehadiran</p>
        <p className="text-[#f5e6c8]/60 text-sm md:text-base leading-relaxed mb-8 max-w-xs mx-auto font-['Amiri',serif]">
          Mohon konfirmasi kehadiran Anda agar kami bisa mempersiapkan dengan baik.
        </p>

        {status === 'already' ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#d4a854]/10 border border-[#d4a854]/30 text-[#d4a854] text-sm md:text-base">
            <Heart className="w-4 h-4 fill-current" />
            Anda sudah mengisi, terima kasih!
          </div>
        ) : status === 'done' ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#d4a854]/10 border border-[#d4a854]/30 text-[#d4a854] text-sm md:text-base">
            <Heart className="w-4 h-4 fill-current" />
            Konfirmasi diterima, sampai jumpa Sabtu!
          </div>
        ) : (
          <button
            onClick={handleClick}
            disabled={status === 'checking'}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#d4a854] text-[#1a0a00] text-sm md:text-base tracking-widest uppercase font-semibold hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'checking' && <Loader2 className="w-4 h-4 animate-spin" />}
            {status === 'checking' ? 'Memeriksa...' : 'Konfirmasi Sekarang'}
          </button>
        )}
      </section>

      {/* Modal */}
      {(status === 'form' || status === 'sending') && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setStatus('idle')}
        >
          <div
            className="rounded-2xl p-6 mx-4 max-w-xs w-full shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #2a1000 0%, #3d1800 40%, #1a0a00 100%)',
              border: '1px solid rgba(212,168,84,0.25)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm tracking-widest uppercase text-[#d4a854]">Konfirmasi Hadir</h3>
              <button onClick={() => setStatus('idle')} className="text-[#f5e6c8]/40 hover:text-[#f5e6c8] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Nama lengkap"
                value={nama}
                onChange={e => setNama(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Nomor telepon / WhatsApp"
                value={telp}
                onChange={e => setTelp(e.target.value)}
                className="w-full rounded-lg px-4 py-3 text-sm outline-none"
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleKirim}
              disabled={!nama.trim() || !telp.trim() || status === 'sending'}
              className="w-full py-3 rounded-lg text-sm tracking-wider bg-[#d4a854] text-[#1a0a00] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
