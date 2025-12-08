import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const SolutionAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'PROBLEM', desc: 'The old way had issues...' },
    { id: 1, label: 'RETHINK', desc: 'What if we rethink everything?' },
    { id: 2, label: 'SERVER', desc: 'Keep rendering on server...' },
    { id: 3, label: 'STATIC', desc: 'Ship static HTML...' },
    { id: 4, label: 'NO_JS', desc: 'Zero JavaScript by default!' },
    { id: 5, label: 'CDN', desc: 'CDN caches perfectly...' },
    { id: 6, label: 'ISLANDS', desc: 'Add interactivity only where needed!' },
    { id: 7, label: 'PERFECT', desc: '✨ Best of all worlds!' },
  ];

  const reset = $(() => {
    step.value = 0;
    isPlaying.value = false;
  });

  const runAnimation = $(() => {
    if (isPlaying.value) return;
    isPlaying.value = true;
    step.value = 0;
    
    const sequence = [1, 2, 3, 4, 5, 6, 7];
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < sequence.length) {
        step.value = sequence[i];
        i++;
      } else {
        clearInterval(interval);
        isPlaying.value = false;
      }
    }, 1000);
  });

  useVisibleTask$(() => {
    const timer = setTimeout(() => {
      isPlaying.value = true;
      step.value = 1;
      
      const sequence = [2, 3, 4, 5, 6, 7];
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < sequence.length) {
          step.value = sequence[i];
          i++;
        } else {
          clearInterval(interval);
          isPlaying.value = false;
        }
      }, 1000);
    }, 600);
    
    return () => clearTimeout(timer);
  });

  return (
    <div class="solution-anim">
      <div class="sol-header">
        <span class="sol-status">
          [{steps[step.value].label}] {steps[step.value].desc}
        </span>
        <div class="sol-controls">
          <button class="sol-btn" onClick$={runAnimation} disabled={isPlaying.value}>
            ▶ {isPlaying.value ? 'running...' : 'replay'}
          </button>
          <button class="sol-btn" onClick$={reset}>↺ reset</button>
        </div>
      </div>

      {/* Problems Recap - Crossed Out */}
      <div class="problems-recap">
        <div class="recap-title">OLD PROBLEMS:</div>
        <div class="recap-items">
          <div class={`recap-item ${step.value >= 2 ? 'solved' : ''}`}>
            <span class="recap-icon">📦</span>
            <span class="recap-text">Heavy JS bundles (2-5MB)</span>
            {step.value >= 4 && <span class="solved-badge">✓ SOLVED</span>}
          </div>
          <div class={`recap-item ${step.value >= 3 ? 'solved' : ''}`}>
            <span class="recap-icon">🐌</span>
            <span class="recap-text">Slow Time to Interactive</span>
            {step.value >= 4 && <span class="solved-badge">✓ SOLVED</span>}
          </div>
          <div class={`recap-item ${step.value >= 5 ? 'solved' : ''}`}>
            <span class="recap-icon">🔄</span>
            <span class="recap-text">CDN breaks personalization</span>
            {step.value >= 6 && <span class="solved-badge">✓ SOLVED</span>}
          </div>
          <div class={`recap-item ${step.value >= 5 ? 'solved' : ''}`}>
            <span class="recap-icon">💰</span>
            <span class="recap-text">Complex infrastructure</span>
            {step.value >= 6 && <span class="solved-badge">✓ SOLVED</span>}
          </div>
        </div>
      </div>

      {/* The New Architecture */}
      <div class="new-arch">
        <div class="arch-title">THE NEW WAY:</div>
        
        <div class="arch-flow">
          {/* Server */}
          <div class={`arch-node server-node ${step.value >= 2 ? 'active' : ''}`}>
            <div class="arch-icon">🖥️</div>
            <div class="arch-label">SERVER</div>
            <div class="arch-features">
              {step.value >= 2 && <div class="feature-item on">✓ Renders HTML</div>}
              {step.value >= 2 && <div class="feature-item on">✓ Fetches data</div>}
              {step.value >= 2 && <div class="feature-item on">✓ Personalization</div>}
            </div>
          </div>

          <div class={`arch-arrow ${step.value >= 3 ? 'active' : ''}`}>
            <span class="arrow-content">
              {step.value >= 3 && (
                <span class="html-only">HTML only!</span>
              )}
            </span>
          </div>

          {/* CDN */}
          <div class={`arch-node cdn-node ${step.value >= 5 ? 'active' : ''}`}>
            <div class="arch-icon">🌐</div>
            <div class="arch-label">CDN</div>
            <div class="arch-features">
              {step.value >= 5 && <div class="feature-item on">✓ Caches HTML</div>}
              {step.value >= 5 && <div class="feature-item on">✓ Edge delivery</div>}
              {step.value >= 5 && <div class="feature-item on">✓ 50ms response</div>}
            </div>
          </div>

          <div class={`arch-arrow ${step.value >= 4 ? 'active' : ''}`}>
            <span class="arrow-content">
              {step.value >= 4 && (
                <span class="no-js-badge">0kb JS!</span>
              )}
            </span>
          </div>

          {/* Browser */}
          <div class={`arch-node browser-node ${step.value >= 4 ? 'active' : ''} ${step.value >= 7 ? 'perfect' : ''}`}>
            <div class="arch-icon">👤</div>
            <div class="arch-label">BROWSER</div>
            <div class="arch-features">
              {step.value >= 4 && <div class="feature-item on">✓ Instant render</div>}
              {step.value >= 4 && <div class="feature-item on">✓ No parsing</div>}
              {step.value >= 6 && <div class="feature-item on">✓ Islands hydrate</div>}
            </div>
          </div>
        </div>

        {/* Islands Concept */}
        {step.value >= 6 && (
          <div class="islands-demo">
            <div class="islands-title">🏝️ ISLANDS = Interactive parts only</div>
            <div class="page-mock">
              <div class="mock-section static">
                <span class="section-label">Static Header</span>
                <span class="section-js">0kb JS</span>
              </div>
              <div class="mock-section static">
                <span class="section-label">Static Content</span>
                <span class="section-js">0kb JS</span>
              </div>
              <div class="mock-section island">
                <span class="section-label">🏝️ Interactive Form</span>
                <span class="section-js">~15kb JS</span>
              </div>
              <div class="mock-section static">
                <span class="section-label">Static Footer</span>
                <span class="section-js">0kb JS</span>
              </div>
              <div class="total-js">
                Total JS: <span class="js-amount">~15kb</span> vs <span class="old-amount">2-5MB</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Comparison */}
      {step.value >= 7 && (
        <div class="final-comparison">
          <div class="comparison-title">📊 THE DIFFERENCE</div>
          <div class="comparison-grid">
            <div class="comp-col old-way">
              <div class="col-header">❌ Old Way</div>
              <div class="col-item">JS: 2-5 MB</div>
              <div class="col-item">TTI: 4-12 seconds</div>
              <div class="col-item">CDN: Breaks features</div>
              <div class="col-item">Complexity: High</div>
            </div>
            <div class="comp-col new-way">
              <div class="col-header">✅ Astro Way</div>
              <div class="col-item good">JS: ~15 KB</div>
              <div class="col-item good">TTI: Instant</div>
              <div class="col-item good">CDN: Works perfectly</div>
              <div class="col-item good">Complexity: Low</div>
            </div>
          </div>
          <div class="magic-formula">
            <span class="formula-icon">✨</span>
            <span class="formula-text">Server Rendering + Zero JS + Islands = Perfect</span>
          </div>
        </div>
      )}
    </div>
  );
});



