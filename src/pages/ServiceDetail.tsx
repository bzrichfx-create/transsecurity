import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { services } from '@/data/site';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug) || services[0];
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('https://famous.ai/api/crm/6a01b32adf2cf6860d4ff564/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          source: 'service-quote-form',
          tags: ['quote-request', service.slug],
        })
      });
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('idle');
    }
  };

  const gallery = [
    service.image,
    'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496450891_3f72151f.jpg',
    'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496433125_fee58a0b.jpg',
  ];

  return (
    <PageLayout>
      <PageHero
        title={service.title}
        subtitle={service.short}
        bgImage={service.image}
        breadcrumb={[{ label: 'Layanan', to: '/layanan' }, { label: service.title }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-gold">Detail Layanan</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-navy mt-3 mb-4">
              {service.title}
            </h2>
            <div className="w-16 h-1 bg-gold mb-5"></div>
            <p className="text-navy/80 leading-relaxed mb-8">
              {service.short} Tim kami berpengalaman melayani korporat besar dari berbagai sektor industri, dengan pendekatan yang disesuaikan dengan risiko dan kebutuhan spesifik setiap klien.
            </p>

            {/* Gallery */}
            <div className="grid grid-cols-3 gap-3 mb-10">
              {gallery.map((g, i) => (
                <img key={i} src={g} alt="" className="aspect-[4/3] object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer" />
              ))}
            </div>

            <h3 className="font-heading text-2xl font-bold text-navy mb-5">Benefit untuk Bisnis Anda</h3>
            <ul className="space-y-3 mb-10">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex gap-3 bg-grey p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-navy/80">{b}</span>
                </li>
              ))}
            </ul>

            <div className="bg-navy text-white p-7 rounded-xl">
              <h4 className="font-heading text-xl font-bold mb-2">Tertarik dengan layanan ini?</h4>
              <p className="text-white/80 mb-4 text-sm">Tim konsultan kami siap membantu menganalisis kebutuhan keamanan Anda.</p>
              <Link to="/kontak" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded uppercase text-sm tracking-wide hover:bg-gold-light transition-all">
                Konsultasi Gratis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quote Form */}
          <aside>
            <div className="bg-grey p-7 rounded-xl border-t-4 border-gold sticky top-28">
              <h3 className="font-heading text-xl font-bold text-navy mb-2">Minta Penawaran Layanan Ini</h3>
              <p className="text-navy/70 text-sm mb-5">Isi form dan tim kami akan menghubungi dalam 1×24 jam.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
                <input required placeholder="No. Telepon" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
                <input placeholder="Perusahaan" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
                <textarea rows={4} placeholder="Kebutuhan Anda..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none bg-white text-sm" />
                <button type="submit" disabled={status === 'sending'} className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3.5 rounded-md uppercase tracking-wide text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {status === 'sending' ? 'Mengirim...' : status === 'sent' ? <><Check className="w-4 h-4" /> Berhasil Terkirim</> : 'Kirim Permintaan'}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-heading text-2xl font-bold text-navy mb-8">Layanan Lainnya</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {services.filter(s => s.slug !== service.slug).slice(0, 3).map(s => (
              <Link key={s.slug} to={`/layanan/${s.slug}`} className="service-card bg-white rounded-xl overflow-hidden shadow-md">
                <img src={s.image} alt={s.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <h4 className="font-heading font-bold text-navy mb-2">{s.title}</h4>
                  <span className="text-gold text-sm font-semibold inline-flex items-center gap-1">Detail <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
