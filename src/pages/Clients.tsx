import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { clients, testimonials } from '@/data/site';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const caseStudies = [
  {
    title: 'Transformasi Keamanan Mall Premium',
    before: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496502691_0b5daa79.png',
    after: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496724585_9fe71fe3.jpg',
    desc: 'Penurunan insiden 87% dalam 6 bulan setelah implementasi Trans Security di mall dengan 200+ tenant.',
    result: '87% Insiden Turun',
  },
  {
    title: 'Pengamanan Cabang Bank Nasional',
    before: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496477417_7deced03.png',
    after: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496744615_7a34ffbc.jpg',
    desc: 'Zero incident selama 5 tahun di 120+ cabang dengan integrasi CCTV AI dan personel bersertifikat.',
    result: '0 Insiden / 5 Tahun',
  },
];

const BeforeAfter: React.FC<{ before: string; after: string }> = ({ before, after }) => {

  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl select-none bg-navy">
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} className="absolute inset-0 h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} alt="Before" />
      </div>
      <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs px-3 py-1 rounded uppercase tracking-wider z-10">Sebelum</div>
      <div className="absolute top-3 right-3 bg-gold text-navy text-xs px-3 py-1 rounded uppercase tracking-wider font-bold z-10">Sesudah</div>
      <input
        type="range" min={1} max={99} value={pos}
        onChange={e => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Before after slider"
      />
      <div className="absolute top-0 bottom-0 w-1 bg-gold shadow-lg pointer-events-none z-10" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold text-navy flex items-center justify-center shadow-lg">
          <ChevronLeft className="w-4 h-4" /><ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};


const Clients: React.FC = () => {
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Klien Kami"
        subtitle="Dipercaya oleh ratusan perusahaan terkemuka di Indonesia — dari perbankan, manufaktur, hingga ritel."
        breadcrumb={[{ label: 'Klien' }]}
      />

      {/* Client Logos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Trusted Partner" title="100+ Klien Korporat" center />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
            {clients.map((c, i) => (
              <div key={i} className="client-logo bg-grey aspect-[3/2] rounded-lg flex items-center justify-center border border-navy/5">
                <span className="font-heading font-bold text-navy text-base text-center px-2">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials slider */}
      <section className="relative py-20 lg:py-28 parallax-bg" style={{ backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496477417_7deced03.png)' }}>
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <SectionTitle eyebrow="Testimoni" title="Cerita Sukses Klien" center light />
          <div className="relative mt-10">
            {testimonials.map((t, i) => (
              <div key={i} className={`${i === tIdx ? 'block animate-fade-in' : 'hidden'} bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 lg:p-12`}>
                <Quote className="w-12 h-12 text-gold mx-auto mb-5" />
                <p className="text-white text-lg lg:text-xl leading-relaxed italic mb-7">"{t.quote}"</p>
                <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gold" />
                <p className="font-heading font-bold text-white">{t.name}</p>
                <p className="text-gold text-sm uppercase tracking-wider">{t.role}</p>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTIdx(i)} className={`h-1.5 rounded-full transition-all ${i === tIdx ? 'w-10 bg-gold' : 'w-5 bg-white/30'}`} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Case Studies */}
      <section className="py-20 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Studi Kasus" title="Hasil Nyata, Bukti Nyata" center />
          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            {caseStudies.map((cs, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <BeforeAfter before={cs.before} after={cs.after} />
                <div className="mt-5">
                  <span className="inline-block bg-gold text-navy px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3">
                    {cs.result}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">{cs.title}</h3>
                  <p className="text-navy/70 text-sm leading-relaxed">{cs.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Clients;
