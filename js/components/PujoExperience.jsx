import React, { useState } from 'https://esm.sh/react@18.2.0';
import { PUJO_EXPERIENCES } from '../data/experienceData.js';

export function PujoExperience({ isDhakPlaying, onToggleDhak }) {
  const [activeBeatStep, setActiveBeatStep] = useState(0);

  return (
    <section id="experience" className="py-24 relative" style={{ padding: '6rem 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>🪔</span>
            <span>শারদীয় অনুভূতি • Cultural Traditions</span>
          </div>
          <h2 className="section-title">The Pujo Experience</h2>
          <p className="section-subtitle-bengali">
            ঢাকের কাঠি, ধুনুচি আর কাশফুলের মনমাতানো শারদ পরব
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* 6 Experience Cards */}
        <div className="experience-grid">
          {PUJO_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="experience-card">
              {/* Icon */}
              <div className="experience-icon-wrap">
                <span>{exp.icon}</span>
              </div>

              {/* Title Bengali */}
              <h3 className="experience-title-bengali">
                {exp.bengaliTitle}
              </h3>

              {/* Title English */}
              <span className="experience-title-english">
                {exp.englishTitle}
              </span>

              {/* Description */}
              <p className="experience-desc">
                {exp.description}
              </p>

              {/* English detail summary */}
              <p className="experience-detail">
                {exp.detail}
              </p>

              {/* Interactive Dhak Percussion Sound Trigger for Dhak card */}
              {exp.hasSoundTrigger && (
                <button
                  onClick={onToggleDhak}
                  className={`dhak-interactive-btn ${isDhakPlaying ? 'pulse-playing' : ''}`}
                  aria-label="Toggle traditional Dhak sound"
                >
                  <span>🥁</span>
                  <span>
                    {isDhakPlaying ? 'ঢাক বন্ধ করুন (Stop Dhak)' : 'ঢাকের তাল শুনুন (Play Live Dhak)'}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
