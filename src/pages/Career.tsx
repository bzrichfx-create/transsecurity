import React, { useState } from 'react';
import { ChevronDown, ClipboardCheck, UserCheck, GraduationCap, Briefcase, Upload, Check } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { jobs } from '@/data/site';

const steps = [
  { icon: ClipboardCheck, title: 'Daftar', desc: 'Submit CV dan lamaran online melalui form di bawah.' },
  { icon: UserCheck, title: 'Seleksi', desc: 'Tes administrasi, kesamaptaan, wawancara, dan psikotes.' },
  { icon: GraduationCap, title: 'Training', desc: 'Pelatihan Gada Pratama bersertifikat Mabes Polri (232 jam).' },
  { icon: Briefcase, title: 'Penempatan', desc: 'Penempatan di klien sesuai keahlian dan domisili Anda.' },
];

const Career: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', cv: null as File | null });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('https://famous.ai/api/crm/6a01b32adf2cf6860d4ff564/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          source: 'career-application',
          tags: ['career', 'job-application', form.position || 'general'],
        })
      });
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', position: '', cv: null });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <PageLayout>
      <PageHero
        title="Bergabung Bersama Pasukan Profesional Kami"
        subtitle="Karir yang stabil, pelatihan berkelas, dan peluang berkembang di perusahaan keamanan terkemuka di Indonesia."
        breadcrumb={[{ label: 'Karir' }]}
        bgImage="https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496433125_fee58a0b.jpg"
      />

      {/* Recruitment Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Alur Rekrutmen" title="Empat Langkah Menuju Karir Anda" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="relative group">
                  <div className="bg-grey p-7 rounded-xl text-center hover:bg-navy hover:text-white transition-all hover:-translate-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gold/20 text-gold group-hover:bg-gold group-hover:text-navy flex items-center justify-center mb-4 transition-all">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gold font-bold">Step {i + 1}</span>
                    <h3 className="font-heading text-lg font-bold mt-1 mb-2">{s.title}</h3>
                    <p className="text-sm opacity-80">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold/40"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-grey">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Lowongan Aktif" title="Posisi Tersedia" center />
          <div className="space-y-4 mt-10">
            {jobs.map((j, i) => {
              const open = openIdx === i;
              return (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-gold">
                  <button onClick={() => setOpenIdx(open ? null : i)} className="w-full flex items-center justify-between p-5 lg:p-6 hover:bg-grey transition-colors">
                    <div className="text-left">
                      <h3 className="font-heading font-bold text-navy text-lg">{j.title}</h3>
                      <p className="text-navy/60 text-xs uppercase tracking-wider mt-1">Full Time · Jabodetabek</p>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gold transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
                    <div className="p-5 lg:p-6 pt-0 border-t border-navy/5">
                      <h4 className="font-heading font-bold text-navy mb-3 text-sm uppercase tracking-wider">Syarat & Kualifikasi</h4>
                      <ul className="space-y-2 mb-5">
                        {j.requirements.map((r, ri) => (
                          <li key={ri} className="flex gap-2 text-sm text-navy/80">
                            <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => { setForm({ ...form, position: j.title }); document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="bg-gold hover:bg-gold-dark text-navy font-bold px-6 py-2.5 rounded uppercase text-sm tracking-wide transition-all">
                        Lamar Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Form Lamaran" title="Kirim Lamaran Anda" center />
          <form onSubmit={submit} className="bg-grey p-8 rounded-xl mt-10 space-y-4 border-t-4 border-gold">
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
              <input required placeholder="No. Telepon / WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
              <select required value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm">
                <option value="">Pilih Posisi</option>
                {jobs.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
              </select>
            </div>
            <label className="block">
              <span className="block text-sm font-semibold text-navy mb-2">Upload CV (PDF, max 5MB)</span>
              <div className="flex items-center gap-3 bg-white border-2 border-dashed border-navy/20 hover:border-gold transition-colors rounded-md p-4 cursor-pointer">
                <Upload className="w-5 h-5 text-gold" />
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => setForm({ ...form, cv: e.target.files?.[0] || null })} className="text-sm flex-1" />
              </div>
            </label>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-navy hover:bg-gold hover:text-navy text-white font-bold py-3.5 rounded-md uppercase tracking-wide text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {status === 'sending' ? 'Mengirim...' : status === 'sent' ? <><Check className="w-4 h-4" /> Lamaran Terkirim</> : 'Kirim Lamaran'}
            </button>
          </form>
        </div>
      </section>
    </PageLayout>
  );
};

export default Career;
