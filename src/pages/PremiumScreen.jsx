import React, { useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { useApp } from '../context/AppContext';

export const PremiumScreen = () => {
  const { activePlan, setActivePlan } = useApp();
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const prices = {
    basic: billing === 'annual' ? '$6.39' : '$7.99',
    standard: billing === 'annual' ? '$10.39' : '$12.99',
    premium: billing === 'annual' ? '$14.99' : '$18.99',
  };

  const handleSelectPlan = (plan) => {
    setActivePlan(plan);
    setToastMessage(`Switched to ${plan} Plan successfully!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader title="Premium" />

      <main className="flex-1 flex flex-col relative w-full pt-16 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-surface-container-high border border-primary-container text-white text-xs font-meta-mono shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[18px] text-primary-container">verified</span>
            {toastMessage}
          </div>
        )}

        <div className="flex flex-col w-full text-on-surface">
          {/* Atmospheric Screening Room Vignette Glow */}
          <div className="relative w-full overflow-hidden px-gutter-sm pt-space-md pb-space-lg">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-52 bg-primary-container/20 blur-3xl rounded-full pointer-events-none"></div>

            {/* Editorial Intro & Value Proposition */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container mb-space-sm shadow-sm border border-surface-container-high">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                  AETHER+ PASS
                </span>
              </div>
              <h1 className="font-headline-xl-mobile sm:font-headline-xl text-headline-xl-mobile sm:text-headline-xl uppercase tracking-tight text-on-surface font-extrabold mb-space-xs">
                Your Next Favorite Story Starts Here
              </h1>
              <p className="font-body-md text-body-md text-secondary leading-relaxed">
                Unlock an uncompromising realm of cinematic vision. Tailored tiering, instant 4K HDR playback, cancel anytime without penalty.
              </p>

              {/* Billing Frequency Toggle */}
              <div className="mt-space-lg w-full flex items-center justify-center">
                <div className="relative flex items-center bg-surface-container-low p-1 rounded-full shadow-inner w-full max-w-[320px] border border-surface-container-high/40">
                  <button
                    onClick={() => setBilling('monthly')}
                    className={`flex-1 py-2 rounded-full font-label-md text-sm transition-all duration-200 flex items-center justify-center font-semibold ${
                      billing === 'monthly'
                        ? 'bg-surface-container text-on-surface shadow-md'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBilling('annual')}
                    className={`flex-1 py-2 rounded-full font-label-md text-sm transition-all duration-200 flex items-center justify-center gap-1.5 font-semibold ${
                      billing === 'annual'
                        ? 'bg-surface-container text-on-surface shadow-md'
                        : 'text-secondary hover:text-on-surface'
                    }`}
                  >
                    <span>Annual</span>
                    <span className="font-label-sm text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-primary-container text-white">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Plan Stack */}
          <div className="px-gutter-sm grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Card 1: Basic */}
            <div
              className={`w-full bg-surface-container rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-200 border ${
                activePlan === 'Basic'
                  ? 'border-primary-container ring-1 ring-primary-container'
                  : 'border-surface-container-high/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold text-on-surface">
                    Basic
                  </span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary">
                    Ad-Supported
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary mb-space-md text-xs">
                  The essential gateway to AETHER+ original festival entries.
                </p>
                <div className="flex items-baseline gap-1 mb-space-md">
                  <span className="font-headline-xl-mobile text-headline-xl font-bold text-on-surface">
                    {prices.basic}
                  </span>
                  <span className="font-meta-mono text-meta-mono text-secondary">/ month</span>
                </div>
                <div className="flex flex-col gap-space-xs mb-space-lg text-xs">
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>1080p Full HD presentation</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>1 active screening session</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>Mobile phone & tablet access</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSelectPlan('Basic')}
                className={`w-full py-3 rounded-xl font-label-md text-label-md uppercase tracking-wider transition-colors text-center shadow-sm ${
                  activePlan === 'Basic'
                    ? 'bg-primary-container text-white font-bold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                {activePlan === 'Basic' ? 'Current Plan' : 'Choose Basic'}
              </button>
            </div>

            {/* Card 2: Standard */}
            <div
              className={`w-full bg-surface-container rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-200 border ${
                activePlan === 'Standard'
                  ? 'border-primary-container ring-1 ring-primary-container'
                  : 'border-surface-container-high/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold text-on-surface">
                    Standard
                  </span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary">
                    Ad-Free
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary mb-space-md text-xs">
                  Pure audiovisual clarity across personal domestic screens.
                </p>
                <div className="flex items-baseline gap-1 mb-space-md">
                  <span className="font-headline-xl-mobile text-headline-xl font-bold text-on-surface">
                    {prices.standard}
                  </span>
                  <span className="font-meta-mono text-meta-mono text-secondary">/ month</span>
                </div>
                <div className="flex flex-col gap-space-xs mb-space-lg text-xs">
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>1080p Full HD Ad-free stream</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>2 simultaneous screening streams</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>Offline storage on 2 devices</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-secondary">
                    <span className="material-symbols-outlined text-[18px] text-on-surface">check_circle</span>
                    <span>TV, Desktop, Mobile & Console</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSelectPlan('Standard')}
                className={`w-full py-3 rounded-xl font-label-md text-label-md uppercase tracking-wider transition-colors text-center shadow-sm ${
                  activePlan === 'Standard'
                    ? 'bg-primary-container text-white font-bold'
                    : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
                }`}
              >
                {activePlan === 'Standard' ? 'Current Plan' : 'Choose Standard'}
              </button>
            </div>

            {/* Card 3: Premium (Featured) */}
            <div
              className={`relative w-full bg-surface-container-high rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden border ${
                activePlan === 'Premium'
                  ? 'border-primary-container ring-2 ring-primary-container glow-accent'
                  : 'border-surface-container-highest'
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary-container shadow-[0_0_12px_rgba(229,9,20,0.8)]"></div>
              <div className="pt-space-xs">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-headline-sm uppercase tracking-wide font-extrabold text-on-surface">
                      Premium
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      stars
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-primary-container text-white shadow-sm">
                    Most Popular
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary mb-space-md text-xs">
                  Master quality, uncompressed acoustics, and priority premiere access.
                </p>
                <div className="flex items-baseline gap-1 mb-space-md">
                  <span className="font-headline-xl-mobile text-headline-xl font-bold text-on-surface">
                    {prices.premium}
                  </span>
                  <span className="font-meta-mono text-meta-mono text-secondary">/ month</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-space-md">
                  <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                    4K UHD
                  </span>
                  <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                    Dolby Vision
                  </span>
                  <span className="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                    Dolby Atmos
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs mb-space-lg text-xs">
                  <div className="flex items-center gap-space-sm text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                    <span className="font-medium">Dolby Atmos Spatial Master audio</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                    <span className="font-medium">4 simultaneous ultra-clarity screens</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                    <span className="font-medium">Offline storage on 6 devices</span>
                  </div>
                  <div className="flex items-center gap-space-sm text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
                    <span className="font-medium">VIP 48-Hour Festival premiere access</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSelectPlan('Premium')}
                className="w-full py-3.5 rounded-xl bg-primary-container text-white font-label-md text-label-md uppercase tracking-wider font-bold shadow-md hover:brightness-110 active:brightness-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>{activePlan === 'Premium' ? 'Active Membership' : 'Start 7-Day Free Trial'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Archival Vault Promo */}
          <div className="px-gutter-sm mt-space-xl">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-surface-container-low border border-surface-container-high/40">
              <img
                className="w-full h-40 object-cover opacity-50"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApIsarHU3nL2WwqIixbbVso996kBG8CpKwwlfMosFoia_uirSrUiZnMWPaF26X-YagHP8fPw1oOb1TUmCV4x0ZCJjWuVIPW_1MwO8KChp2hxLmS5cVlaAfWJWYnGiYsvINMipRQimhJ6TWCxJTbfQh3wEXdjs1wd2PtUU1GWdYj8cz8Cje1dw6UPLaPkJz9l4P8qeZsNBFJeR6ZJkDcEO3vm6fL2X31qjRVmQ5LeFVGcF6KO8d47wNFA"
                alt="Vault"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent p-space-md flex flex-col justify-end">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-0.5 font-bold">
                  AETHER Archival Vault
                </span>
                <p className="font-body-md text-on-surface font-semibold line-clamp-1">
                  Stream over 4,200 curated world cinema masterpieces & Criterion restorations.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="px-gutter-sm mt-space-xl">
            <h2 className="font-headline-md text-headline-md font-bold uppercase tracking-tight text-on-surface mb-space-sm">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-space-xs">
              {[
                {
                  q: 'Can I cancel or switch plans at any time?',
                  a: 'Yes. Upgrades and downgrades reflect instantaneously. If you cancel, your access remains valid through your current billing cycle without cancellation penalties or hidden processing fees.',
                },
                {
                  q: 'Where can I stream AETHER+?',
                  a: 'AETHER+ is supported natively on Apple TV, Google TV, Roku, PlayStation 5, Xbox Series, Amazon Fire TV, iOS, Android, and all Chromium/Safari web desktop clients.',
                },
                {
                  q: 'What is AETHER Spatial Audio?',
                  a: 'Calibrated via Dolby Atmos and binaural rendering matrices, our spatial audio feeds directional sound cues straight into multi-channel home theaters or stereo headphones without distortion.',
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container rounded-xl overflow-hidden transition-all duration-200 border border-surface-container-high/40"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-space-md py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-body-md text-body-md font-semibold text-on-surface pr-2">
                      {faq.q}
                    </span>
                    <span
                      className="material-symbols-outlined text-[20px] text-secondary transition-transform duration-200"
                      style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      expand_more
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-space-md pb-space-md text-secondary font-body-md text-sm leading-relaxed border-t border-surface-container-high/30 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="px-gutter-sm mt-space-xl mb-space-lg">
            <div className="bg-surface-container-low rounded-2xl p-space-md text-center flex flex-col items-center gap-space-sm shadow-inner border border-surface-container-high/40">
              <div className="flex items-center justify-center gap-space-md text-secondary">
                <div className="flex items-center gap-1 font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-on-surface">lock</span>
                  <span>256-Bit Encrypted</span>
                </div>
                <div className="flex items-center gap-1 font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-on-surface">bolt</span>
                  <span>Instant Activation</span>
                </div>
              </div>
              <p className="font-meta-mono text-meta-mono text-secondary max-w-xs text-xs">
                No long-term commitments. Cancel online at anytime with single-click profile management.
              </p>
              <div className="flex items-center justify-center gap-space-sm pt-1 opacity-70">
                <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-bold">
                  VISA
                </span>
                <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-bold">
                  MASTERCARD
                </span>
                <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-bold">
                  APPLE PAY
                </span>
                <span className="font-label-sm text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-bold">
                  PAYPAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppNavBar />
    </div>
  );
};
