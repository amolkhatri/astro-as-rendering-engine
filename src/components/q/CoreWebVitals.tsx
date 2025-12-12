/** @jsxImportSource @builder.io/qwik */

import { component$ } from '@builder.io/qwik';

export const CoreWebVitals = component$(() => {
  return (
    <div class="cwv-visual">
      {/* Core Web Vitals - Visual Cards */}
      <div class="cwv-header">
        <span class="cwv-badge">CORE WEB VITALS</span>
        <span class="cwv-subtitle">Google's ranking factors</span>
      </div>

      <div class="cwv-grid">
        {/* LCP */}
        <div class="cwv-card lcp">
          <div class="cwv-icon">🖼️</div>
          <div class="cwv-acronym">LCP</div>
          <div class="cwv-label">Largest Contentful Paint</div>
          <div class="cwv-visual-bar">
            <div class="bar-segment good" style={{ width: '33%' }}>≤2.5s</div>
            <div class="bar-segment needs" style={{ width: '34%' }}>≤4s</div>
            <div class="bar-segment poor" style={{ width: '33%' }}>&gt;4s</div>
          </div>
          <div class="cwv-factors">
            <span class="factor server">🖥️ Reduce Server Response Time</span>
            <span class="factor js">⚡ Reduce Amount of JS</span>
          </div>
        </div>

        {/* INP */}
        <div class="cwv-card inp">
          <div class="cwv-icon">👆</div>
          <div class="cwv-acronym">INP</div>
          <div class="cwv-label">Interaction to Next Paint</div>
          <div class="cwv-visual-bar">
            <div class="bar-segment good" style={{ width: '33%' }}>≤200ms</div>
            <div class="bar-segment needs" style={{ width: '34%' }}>≤500ms</div>
            <div class="bar-segment poor" style={{ width: '33%' }}>&gt;500ms</div>
          </div>
          <div class="cwv-factors">
            <span class="factor js">⚡ Reduce Amount of JS</span>
          </div>
        </div>

        {/* CLS */}
        <div class="cwv-card cls">
          <div class="cwv-icon">📐</div>
          <div class="cwv-acronym">CLS</div>
          <div class="cwv-label">Cumulative Layout Shift</div>
          <div class="cwv-visual-bar">
            <div class="bar-segment good" style={{ width: '33%' }}>≤0.1</div>
            <div class="bar-segment needs" style={{ width: '34%' }}>≤0.25</div>
            <div class="bar-segment poor" style={{ width: '33%' }}>&gt;0.25</div>
          </div>
          <div class="cwv-factors">
            <span class="factor js">⚡ Reduce Amount of JS</span>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div class="cwv-secondary">
        <span class="cwv-secondary-label">Other Key Metrics</span>
        <div class="cwv-secondary-grid">
          <div class="cwv-secondary-card ttfb">
            <div class="sec-header">
              <span class="sec-icon">⏱️</span>
              <span class="sec-acronym">TTFB</span>
            </div>
            <div class="sec-fullname">Time to First Byte</div>
            <div class="sec-factors">
              <span class="factor server">🖥️ Reduce Server Response Time</span>
            </div>
          </div>
          <div class="cwv-secondary-card fcp">
            <div class="sec-header">
              <span class="sec-icon">🎨</span>
              <span class="sec-acronym">FCP</span>
            </div>
            <div class="sec-fullname">First Contentful Paint</div>
            <div class="sec-factors">
              <span class="factor server">🖥️ Reduce Server Response Time</span>
              <span class="factor js">⚡ Amount of JS</span>
            </div>
          </div>
          <div class="cwv-secondary-card si">
            <div class="sec-header">
              <span class="sec-icon">📊</span>
              <span class="sec-acronym">SI</span>
            </div>
            <div class="sec-fullname">Speed Index</div>
            <div class="sec-factors">
              <span class="factor server">🖥️ Reduce Server Response Time</span>
              <span class="factor js">⚡ Amount of JS</span>
            </div>
          </div>
          <div class="cwv-secondary-card tbt">
            <div class="sec-header">
              <span class="sec-icon">🚫</span>
              <span class="sec-acronym">TBT</span>
            </div>
            <div class="sec-fullname">Total Blocking Time</div>
            <div class="sec-factors">
              <span class="factor js">⚡ Reduce Amount of JS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CoreWebVitals;
