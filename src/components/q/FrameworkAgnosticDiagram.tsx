/** @jsxImportSource @builder.io/qwik */

import { component$ } from '@builder.io/qwik';

export const FrameworkAgnosticDiagram = component$(() => {
  return (
    <div class="framework-diagram">
      {/* Frameworks at the top */}
      <div class="frameworks-section">
        <div class="frameworks-label">Use Any Framework</div>
        <div class="frameworks-grid">
          {/* React */}
          <div class="framework-card react">
            <div class="framework-icon">⚛️</div>
            <div class="framework-name">React</div>
            <div class="framework-code">
              <code>&lt;Button client:load /&gt;</code>
            </div>
          </div>

          {/* Vue */}
          <div class="framework-card vue">
            <div class="framework-icon">💚</div>
            <div class="framework-name">Vue</div>
            <div class="framework-code">
              <code>&lt;Counter client:visible /&gt;</code>
            </div>
          </div>

          {/* Svelte */}
          <div class="framework-card svelte">
            <div class="framework-icon">🧡</div>
            <div class="framework-name">Svelte</div>
            <div class="framework-code">
              <code>&lt;Modal client:idle /&gt;</code>
            </div>
          </div>

          {/* Qwik */}
          <div class="framework-card qwik">
            <div class="framework-icon">⚡</div>
            <div class="framework-name">Qwik</div>
            <div class="framework-code">
              <code>&lt;Form client:load /&gt;</code>
            </div>
          </div>

          {/* Solid */}
          <div class="framework-card solid">
            <div class="framework-icon">🔷</div>
            <div class="framework-name">Solid</div>
            <div class="framework-code">
              <code>&lt;Chart client:visible /&gt;</code>
            </div>
          </div>

          {/* Preact */}
          <div class="framework-card preact">
            <div class="framework-icon">⚡</div>
            <div class="framework-name">Preact</div>
            <div class="framework-code">
              <code>&lt;Widget client:load /&gt;</code>
            </div>
          </div>

          {/* Astro */}
          <div class="framework-card astro">
            <div class="framework-icon">✦</div>
            <div class="framework-name">Astro</div>
            <div class="framework-code">
              <code>&lt;Component client:load /&gt;</code>
            </div>
          </div>
        </div>
      </div>

      {/* Flow arrows
      <div class="flow-arrows">
        <div class="arrow">↓</div>
        <div class="arrow">↓</div>
        <div class="arrow">↓</div>
      </div> */}

      {/* Astro at the bottom */}
      <div class="astro-section">
        <div class="astro-core">
          <div class="astro-logo">✦</div>
          <div class="astro-label">ASTRO</div>
          <div class="astro-tagline">Framework Agnostic</div>
        </div>
      </div>

      {/* Unified output */}
      <div class="diagram-footer">
        <div class="unified-output">
          <span class="output-label">→ Unified Output</span>
          <div class="output-box">
            <span class="output-icon">📦</span>
            <span class="output-text">Static HTML + Minimal JS Islands</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FrameworkAgnosticDiagram;

