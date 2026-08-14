import React, { useState } from 'https://esm.sh/react@18.2.0';
import { PUJO_GALLERY } from '../data/galleryData.js';

export function PujoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="py-24 relative" style={{ padding: '6rem 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>🖼️</span>
            <span>শারদ চিত্রপট • Cinematic Visuals</span>
          </div>
          <h2 className="section-title">Pujo Gallery</h2>
          <p className="section-subtitle-bengali">
            চোখের আলোয় মায়ের দর্শন ও শারদোৎসবের নানা রঙ
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {PUJO_GALLERY.map((item) => (
            <div
              key={item.id}
              className={`gallery-card ${item.span}`}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPhoto(item)}
              aria-label={`View photo: ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-card-overlay">
                <span className="gallery-card-badge">{item.tag}</span>
                <h3 className="gallery-card-title">{item.title}</h3>
                <p className="gallery-card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="lightbox-modal-backdrop"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="lightbox-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>

            {/* Photo View */}
            <div className="lightbox-image-wrap">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="lightbox-image"
              />
            </div>

            {/* Photo Metadata */}
            <div className="lightbox-details">
              <span className="gallery-card-badge" style={{ marginBottom: '0.6rem' }}>
                {selectedPhoto.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '1.4rem', color: 'var(--cream-pure)', marginBottom: '0.4rem' }}>
                {selectedPhoto.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--gold-radiant)', marginBottom: '0.8rem', fontStyle: 'italic' }}>
                {selectedPhoto.subtitle}
              </p>
              <p style={{ fontFamily: 'var(--font-bengali-sans)', fontSize: '0.95rem', color: 'var(--cream-soft)', lineHeight: '1.7' }}>
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
