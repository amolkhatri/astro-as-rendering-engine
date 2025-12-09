import { component$ } from '@builder.io/qwik';

export const ImpossibleTriangle = component$(() => {
  return (
    <div class="cdn-problem triangle-section">
      <div class="problem-title">🔺 THE IMPOSSIBLE TRIANGLE</div>
      <div class="triangle-container">
        <svg class="triangle-svg" viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">
          {/* Triangle outline */}
          <polygon
            points="200,30 50,300 350,300"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            stroke-width="2"
          />

          {/* Gradient fill for the triangle */}
          <defs>
            <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:0.15" />
              <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:0.15" />
              <stop offset="100%" style="stop-color:#ffe66d;stop-opacity:0.15" />
            </linearGradient>
          </defs>
          <polygon
            points="200,30 50,300 350,300"
            fill="url(#triangleGrad)"
          />

          {/* Connecting lines to center */}
          <line x1="200" y1="30" x2="200" y2="210" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4,4" />
          <line x1="50" y1="300" x2="200" y2="210" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4,4" />
          <line x1="350" y1="300" x2="200" y2="210" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="4,4" />

          {/* Center question mark */}
          <circle cx="200" cy="210" r="25" fill="rgba(255,100,100,0.3)" stroke="#ff6b6b" stroke-width="2" />
          <text x="200" y="218" text-anchor="middle" fill="#ff6b6b" font-size="24" font-weight="bold">?</text>
        </svg>

        {/* Corner labels positioned outside SVG */}
        <div class="triangle-label top">
          <span class="label-icon">⚡</span>
          <span class="label-text">Performance</span>
          <span class="label-desc">Fast load times</span>
        </div>

        <div class="triangle-label bottom-left">
          <span class="label-icon">📄</span>
          <span class="label-text">Dynamic Content</span>
          <span class="label-desc">Personalization & Data</span>
        </div>

        <div class="triangle-label bottom-right">
          <span class="label-icon">🔍</span>
          <span class="label-text">SEO Friendly</span>
          <span class="label-desc">Search indexable</span>
        </div>
      </div>

      <div class="triangle-explanation">
        <div class="explanation-title">Traditional approaches force you to sacrifice one:</div>
        <div class="sacrifice-options">
          <div class="sacrifice-option">
            <span class="sacrifice-combo">⚡ + 📄</span>
            <span class="sacrifice-lose">= Lose 🔍 SEO</span>
            <span class="sacrifice-why">Client-side JS not indexable</span>
          </div>
          <div class="sacrifice-option">
            <span class="sacrifice-combo">⚡ + 🔍</span>
            <span class="sacrifice-lose">= Lose 📄 Dynamic</span>
            <span class="sacrifice-why">CDN serves static pages</span>
          </div>
          <div class="sacrifice-option">
            <span class="sacrifice-combo">📄 + 🔍</span>
            <span class="sacrifice-lose">= Lose ⚡ Speed</span>
            <span class="sacrifice-why">SSR on every request</span>
          </div>
        </div>
      </div>
    </div>
  );
});

