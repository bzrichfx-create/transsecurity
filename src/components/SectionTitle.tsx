import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

const SectionTitle: React.FC<Props> = ({ eyebrow, title, subtitle, center, light }) => (
  <div className={`mb-12 ${center ? 'text-center mx-auto max-w-3xl' : ''}`}>
    {eyebrow && (
      <span className={`inline-block uppercase tracking-[0.3em] text-xs font-bold mb-3 ${light ? 'text-gold' : 'text-gold'}`}>
        {eyebrow}
      </span>
    )}
    <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 ${light ? 'text-white' : 'text-navy'}`}>
      {title}
    </h2>
    <div className={`h-1 w-16 bg-gold ${center ? 'mx-auto' : ''} mb-4`}></div>
    {subtitle && <p className={`text-base lg:text-lg leading-relaxed ${light ? 'text-white/80' : 'text-navy/70'}`}>{subtitle}</p>}
  </div>
);

export default SectionTitle;
