import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import FadeIn from './FadeIn'

interface Pesan {
  name: string
  message: string
}

export default function PesanBukber() {
  const [messages, setMessages] = useState<Pesan[]>([])
  const [formName, setFormName] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    supabase
      .from('pesan_bukber')
      .select('name, message')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setMessages(data) })
  }, [])

  async function handleKirim() {
    const name = formName.trim()
    const message = formMessage.trim()
    if (!name || !message) return
    setSending(true)
    const { error } = await supabase.from('pesan_bukber').insert({ name, message })
    if (!error) {
      setMessages(prev => [{ name, message }, ...prev])
      setFormName('')
      setFormMessage('')
    }
    setSending(false)
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,168,84,0.2)',
    color: '#f5e6c8',
  }

  return (
    <section className="bg-[#150700] py-16 px-6 border-t border-[#d4a854]/10">
      <FadeIn>
        <p className="text-[#d4a854] text-xs md:text-sm tracking-[0.3em] uppercase text-center mb-8">Pesan & Doa</p>
      </FadeIn>

      <FadeIn delay={100}>
      <div className="max-w-xl mx-auto space-y-3 mb-4">
        <input
          type="text"
          placeholder="Nama kamu"
          value={formName}
          onChange={e => setFormName(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm md:text-base outline-none font-['Lato',sans-serif]"
          style={inputStyle}
        />
        <textarea
          placeholder="Tulis pesan & doa untuk acara bukber..."
          rows={4}
          value={formMessage}
          onChange={e => setFormMessage(e.target.value)}
          className="w-full rounded-lg px-4 py-3 text-sm md:text-base outline-none resize-none font-['Lato',sans-serif]"
          style={inputStyle}
        />
        <button
          onClick={handleKirim}
          disabled={!formName.trim() || !formMessage.trim() || sending}
          className="w-full py-3 rounded-lg text-sm md:text-base tracking-widest uppercase bg-[#d4a854] text-[#1a0a00] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </div>
      </FadeIn>

      <div className="max-w-xl mx-auto mt-8 space-y-3">
        {messages.map((m, i) => (
          <FadeIn key={i} delay={i * 60}>
            <div className="rounded-lg p-4 bg-[#d4a854]/5 border border-[#d4a854]/15">
              <p className="text-xs md:text-sm font-semibold text-[#d4a854] mb-1">{m.name}</p>
              <p className="text-sm md:text-base text-[#f5e6c8]/80 leading-relaxed">{m.message}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
