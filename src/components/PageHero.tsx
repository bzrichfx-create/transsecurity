import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  bgImage?: string;
  breadcrumb?: { label: string; to?: string }[];
}

const PageHero: React.FC<Props> = ({ title, subtitle, bgImage, breadcrumb = [] }) => {
  const img = bgImage || 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496502691_0b5daa79.png';
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
          <Link to="/" className="flex items-center gap-1 hover:text-gold transition-colors">
            <Home className="w-3.5 h-3.5" /> Beranda
          </Link>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="w-3.5 h-3.5" />
              {b.to ? <Link to={b.to} className="hover:text-gold transition-colors">{b.label}</Link> : <span className="text-gold">{b.label}</span>}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          {title}
        </h1>
        <div className="w-20 h-1 bg-gold mb-5"></div>
        {subtitle && <p className="text-lg text-white/85 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PageHero;
