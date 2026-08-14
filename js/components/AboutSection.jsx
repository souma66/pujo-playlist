import React from 'https://esm.sh/react@18.2.0';

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative" style={{ padding: '6rem 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>📖</span>
            <span>আমাদের শারদ স্মৃতি • Heritage & Soul</span>
          </div>
          <h2 className="section-title">About Pujo Playlist</h2>
          <p className="section-subtitle-bengali">
            বাঙালির শ্রেষ্ঠ উৎসব ও সুরের চিরন্তন মেলবন্ধন
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Emotion Box */}
        <div className="about-box">
          <p className="about-text-lead">
            দুর্গাপূজা কেবল একটি উৎসব নয়, এটি বাঙালির এক আত্মিক অনুভূতি—একটি মহাকাব্যিক নস্টালজিয়া।
          </p>

          <p className="about-text-body">
            আশ্বিনের নীল আকাশ, ভোরের শিউলি ঝরা গন্ধ, আর মহালয়ার প্রত্যুষে বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ—এই সুরেই বাঙালির পুজো শুরু হয়।
            ছোটবেলার নতুন জামার গন্ধ থেকে শুরু করে রাতের মণ্ডপে বন্ধুদের সঙ্গে অবিরাম আড্ডা, ফুচকার স্বাদ আর ঢাকের উন্মাদনা—পুজোর প্রতিটি মুহূর্ত জড়িয়ে থাকে কোনো না কোনো মিষ্টি সুরে।
          </p>

          <p className="about-text-body">
            <strong>"Pujo Playlist"</strong> তৈরি হয়েছে সেই সমস্ত সুর ও অনুভূতিকে একসূত্রে বাঁধার উদ্দেশ্যে। দেশ বা বিদেশের যেকোনো প্রান্তেই থাকুন না কেন, এই প্লেলিস্টের একটি ক্লিক আপনাকে ফিরিয়ে নিয়ে যাবে আপনার শৈশবের পাড়ার পুজোয়, সন্ধিপূজার শান্ত আলোয়, আর ভাসানের দিনে অশ্রুসজল বিদায়লগ্নে।
          </p>

          <div className="about-quote-box">
            <p style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '1.1rem', marginBottom: '0.4rem' }}>
              "আবার আসিব ফিরে ধানসিঁড়িটির তীরে—এই বাংলায়..."
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              May the divine rhythms of Durga Puja bring timeless joy, love, and sweet nostalgia to your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
