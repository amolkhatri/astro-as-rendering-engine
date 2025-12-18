/** @jsxImportSource @builder.io/qwik */

import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const PlatformAspects = component$(() => {
  const animated = useSignal(false);

  useVisibleTask$(() => {
    setTimeout(() => {
      animated.value = true;
    }, 100);
  });

  return (
    <div class="platform-aspects">
      <div class="aspects-header">
      </div>

      {/* Central Hub Diagram */}
      <div class={`aspects-diagram ${animated.value ? 'animated' : ''}`}>
        {/* SVG Connections */}
        <svg class="connection-svg" viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet">
          {/* Outer connecting lines */}
          <path class="connect-line line-1" d="M 200 140 Q 400 70 600 140" />
          <path class="connect-line line-2" d="M 600 140 Q 730 275 600 410" />
          <path class="connect-line line-3" d="M 600 410 Q 400 480 200 410" />
          <path class="connect-line line-4" d="M 200 410 Q 70 275 200 140" />
          
          {/* Inner radial lines to center */}
          <line class="center-line cl-1" x1="200" y1="140" x2="347" y2="234" />
          <line class="center-line cl-2" x1="600" y1="140" x2="453" y2="234" />
          <line class="center-line cl-3" x1="600" y1="410" x2="453" y2="316" />
          <line class="center-line cl-4" x1="200" y1="410" x2="347" y2="316" />
          
          {/* Connection dots */}
          <circle class="conn-dot dot-1" cx="200" cy="140" r="5" />
          <circle class="conn-dot dot-2" cx="600" cy="140" r="5" />
          <circle class="conn-dot dot-3" cx="600" cy="410" r="5" />
          <circle class="conn-dot dot-4" cx="200" cy="410" r="5" />
          
          {/* Pulse effect on center */}
          <circle class="pulse-circle" cx="400" cy="275" r="40" />
          <circle class="pulse-circle delay-1" cx="400" cy="275" r="40" />
        </svg>

        {/* Aspect Blocks */}
        <div class="aspect-card card-1">
          <div class="card-icon">🏝️</div>
          <div class="card-title">Handling different content types</div>
          <div class="card-desc">Islands Architecture</div>
        </div>

        <div class="aspect-card card-2">
          <div class="card-icon">🔍</div>
          <div class="card-title">SEO Friendly</div>
          <div class="card-desc">
            <div class="desc-item"><span class="bullet">•</span> Server Side Rendering ( SSR )</div>
            <div class="desc-item"><span class="bullet">•</span> Dynamic Rendering</div>
          </div>
        </div>

        <div class="aspect-card card-3">
          <div class="card-icon">🚀</div>
          <div class="card-title">Performant</div>
          <div class="card-desc">
            <div class="desc-item"><span class="bullet">•</span> No or less javascript on the client side</div>
            <div class="desc-item"><span class="bullet">•</span> Faster Server Response Time ( CDN Cache )</div>
          </div>
        </div>

        <div class="aspect-card card-4">
          <div class="card-icon">🛡️</div>
          <div class="card-title">Future Proof</div>
          <div class="card-desc">
            <div class="desc-item"><span class="bullet">•</span> Framework Agnostic</div>
            <div class="desc-item"><span class="bullet">•</span> Modern Web Techniques</div>
          </div>
        </div>

        {/* Center Hub */}
        <div class="center-hub">
          <span class="hub-icon">✦</span>
          <span class="hub-text">PLATFORM</span>
        </div>
      </div>

      {/* Relationship explanations */}
      {/* <div class="relationships">
        <div class="rel-item">
          <span class="rel-arrow">↔</span>
          <span class="rel-content"><strong>Islands + Performance:</strong> Islands Architecture enables minimal JS & faster response times</span>
        </div>
        <div class="rel-item">
          <span class="rel-arrow">↔</span>
          <span class="rel-content"><strong>SEO + Future Proof:</strong> SSR with framework agnostic approach ensures search visibility & adaptability</span>
        </div>
      </div> */}

      <style>
        {`
        .platform-aspects {
          width: 100%;
          padding: 0;
        }

        .aspects-header {
          text-align: center;
          margin-bottom: 1.25rem;
        }

        .aspects-badge {
          display: inline-block;
          font-family: var(--font-mono, monospace);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent, #818cf8);
          background: var(--accent-dim, rgba(129, 140, 248, 0.15));
          padding: 0.375rem 0.875rem;
          border-radius: 4px;
          border: 1px solid var(--accent, #818cf8);
          opacity: 0.8;
        }

        .aspects-subtitle {
          display: block;
          font-size: 0.8125rem;
          color: var(--text-dim, #94a3b8);
          margin-top: 0.5rem;
        }

        .aspects-diagram {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 550px;
          margin: 0 auto 1.25rem;
        }

        .connection-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .connect-line {
          fill: none;
          stroke: var(--accent, #818cf8);
          stroke-width: 2;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          opacity: 0.2;
        }

        .animated .connect-line {
          animation: drawPath 1.5s ease forwards;
        }

        .animated .line-1 { animation-delay: 0.2s; }
        .animated .line-2 { animation-delay: 0.4s; }
        .animated .line-3 { animation-delay: 0.6s; }
        .animated .line-4 { animation-delay: 0.8s; }

        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
            opacity: 0.35;
          }
        }

        .center-line {
          stroke: var(--accent, #818cf8);
          stroke-width: 2;
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          opacity: 0;
        }

        .animated .center-line {
          animation: drawLine 0.8s ease forwards;
        }

        .animated .cl-1 { animation-delay: 0.3s; }
        .animated .cl-2 { animation-delay: 0.5s; }
        .animated .cl-3 { animation-delay: 0.7s; }
        .animated .cl-4 { animation-delay: 0.9s; }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
            opacity: 0.5;
          }
        }

        .conn-dot {
          fill: var(--accent, #818cf8);
          opacity: 0;
          transform-origin: center;
        }

        .animated .conn-dot {
          animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animated .dot-1 { animation-delay: 0.4s; }
        .animated .dot-2 { animation-delay: 0.6s; }
        .animated .dot-3 { animation-delay: 0.8s; }
        .animated .dot-4 { animation-delay: 1s; }

        @keyframes popIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .pulse-circle {
          fill: none;
          stroke: var(--accent, #818cf8);
          stroke-width: 2;
          opacity: 0;
        }

        .animated .pulse-circle {
          animation: pulse 2.5s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .animated .pulse-circle.delay-1 {
          animation-delay: 1.8s;
        }

        @keyframes pulse {
          0% { opacity: 0; transform: scale(1); transform-origin: 400px 275px; }
          50% { opacity: 0.4; transform: scale(2); transform-origin: 400px 275px; }
          100% { opacity: 0; transform: scale(2.5); transform-origin: 400px 275px; }
        }

        .aspect-card {
          position: absolute;
          width: 180px;
          background: var(--bg-secondary, #1e293b);
          border: 1px solid var(--border, #334155);
          border-radius: 10px;
          padding: 1.125rem;
          text-align: center;
          z-index: 5;
          opacity: 0;
          transform: scale(0.8) translateY(10px);
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-3 {
          width: 200px;
          padding: 1.125rem;
        }

        .card-4 {
          width: 180px;
        }

        .aspect-card:hover {
          border-color: var(--accent, #818cf8);
          transform: scale(1.05) translateY(0) !important;
          z-index: 10;
          box-shadow: var(--accent-glow, 0 0 20px rgba(129, 140, 248, 0.3));
        }

        .card-1 { top: 30px; left: calc(25% - 90px); }
        .card-2 { top: 30px; right: calc(25% - 90px); }
        .card-3 { bottom: 30px; right: calc(25% - 100px); }
        .card-4 { bottom: 30px; left: calc(25% - 90px); }

        .animated .card-1 { animation: cardIn 0.5s ease forwards 0.3s; }
        .animated .card-2 { animation: cardIn 0.5s ease forwards 0.5s; }
        .animated .card-3 { animation: cardIn 0.5s ease forwards 0.7s; }
        .animated .card-4 { animation: cardIn 0.5s ease forwards 0.9s; }

        @keyframes cardIn {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .card-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary, #f8fafc);
          margin-bottom: 0.375rem;
          letter-spacing: -0.01em;
        }

        .card-desc {
          font-size: 0.875rem;
          color: var(--text-secondary, #cbd5e1);
          line-height: 1.5;
          font-weight: 400;
        }

        .desc-item {
          font-size: 0.875rem;
          color: var(--text-secondary, #cbd5e1);
          line-height: 1.6;
          margin-top: 0.5rem;
          text-align: left;
          font-weight: 400;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .desc-item:first-child {
          margin-top: 0;
        }

        .bullet {
          color: var(--accent, #818cf8);
          font-weight: 700;
          font-size: 0.9375rem;
          flex-shrink: 0;
          margin-top: 0.0625rem;
        }

        .card-3 .card-desc {
          text-align: left;
          padding-top: 0.25rem;
        }

        .center-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 95px;
          height: 95px;
          background: linear-gradient(135deg, var(--accent, #818cf8) 0%, #a78bfa 50%, #c084fc 100%);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--accent-glow, 0 0 20px rgba(129, 140, 248, 0.3));
          z-index: 15;
        }

        .animated .center-hub {
          animation: hubIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s;
        }

        @keyframes hubIn {
          to {
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .hub-icon {
          font-size: 1.75rem;
          color: #0a0f1a;
        }

        .hub-text {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0a0f1a;
        }

        .relationships {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 520px;
          margin: 0 auto;
        }

        .rel-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--bg-card, #151d2e);
          border: 1px solid var(--border-color, rgba(148, 163, 184, 0.12));
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary, #94a3b8);
          line-height: 1.5;
          transition: all 0.2s ease;
        }

        .rel-item:hover {
          border-color: var(--border-hover, rgba(148, 163, 184, 0.24));
          background: var(--bg-tertiary, #1a2234);
        }

        .rel-arrow {
          color: var(--accent-secondary, #f59e0b);
          font-weight: 700;
          font-size: 0.875rem;
          flex-shrink: 0;
          margin-top: -1px;
        }

        .rel-content strong {
          color: var(--accent-secondary, #f59e0b);
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .aspects-diagram {
            height: 450px;
            max-width: 100%;
          }

          .aspect-card {
            width: 140px;
            padding: 0.875rem;
          }

          .card-1 { left: calc(20% - 70px); }
          .card-2 { right: calc(20% - 70px); }
          .card-3 { 
            width: 160px;
            right: calc(20% - 80px);
            padding: 0.875rem;
          }
          .card-4 { 
            width: 140px;
            left: calc(20% - 70px); 
          }

          .card-icon {
            font-size: 1.5rem;
          }

          .card-title {
            font-size: 0.8125rem;
          }

          .card-desc {
            font-size: 0.75rem;
          }

          .desc-item {
            font-size: 0.75rem;
            margin-top: 0.375rem;
            gap: 0.375rem;
          }

          .bullet {
            font-size: 0.8125rem;
          }

          .center-hub {
            width: 70px;
            height: 70px;
          }

          .hub-icon {
            font-size: 1.25rem;
          }
        }

        /* Light Theme Overrides */
        [data-theme="light"] .aspect-card {
          background: var(--bg-secondary, #ffffff);
          border-color: var(--border, #cbd5e1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        [data-theme="light"] .aspect-card:hover {
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .card-title {
          color: var(--text-primary, #0f172a);
        }

        [data-theme="light"] .card-desc {
          color: var(--text-secondary, #334155);
        }

        [data-theme="light"] .desc-item {
          color: var(--text-secondary, #334155);
        }

        [data-theme="light"] .aspects-badge {
          background: var(--accent-dim, rgba(99, 102, 241, 0.1));
        }

        [data-theme="light"] .aspects-subtitle {
          color: var(--text-dim, #64748b);
        }

        [data-theme="light"] .center-hub {
          background: linear-gradient(135deg, var(--accent, #6366f1) 0%, #818cf8 50%, #a78bfa 100%);
        }

        [data-theme="light"] .hub-icon,
        [data-theme="light"] .hub-text {
          color: #ffffff;
        }
        `}
      </style>
    </div>
  );
});

export default PlatformAspects;
