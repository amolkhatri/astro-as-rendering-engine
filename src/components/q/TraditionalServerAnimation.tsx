import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const TraditionalServerAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'Click play to visualize' },
    { id: 1, label: 'REQUEST', desc: 'User requests page...' },
    { id: 2, label: 'SERVER', desc: 'Server assembling content...' },
    { id: 3, label: 'BUNDLE', desc: 'Bundling JavaScript...' },
    { id: 4, label: 'SHIP', desc: 'Sending HTML + heavy JS bundle...' },
    { id: 5, label: 'DOWNLOAD', desc: 'Browser downloading JS...' },
    { id: 6, label: 'PARSE', desc: 'Parsing & executing JS...' },
    { id: 7, label: 'HYDRATE', desc: 'Hydrating components...' },
    { id: 8, label: 'READY', desc: 'Finally interactive! (slow TTI)' },
  ];

  const reset = $(() => {
    step.value = 0;
    isPlaying.value = false;
  });

  const runAnimation = $(() => {
    if (isPlaying.value) return;
    isPlaying.value = true;
    step.value = 0;
    
    const sequence = [1, 2, 3, 4, 5, 6, 7, 8];
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

  // Auto-start animation
  useVisibleTask$(() => {
    const timer = setTimeout(() => {
      isPlaying.value = true;
      step.value = 1;
      
      const sequence = [2, 3, 4, 5, 6, 7, 8];
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
    <div class="trad-animation">
      <div class="anim-header">
        <span class="status">
          [{steps[step.value].label}] {steps[step.value].desc}
        </span>
        <div class="controls">
          <button class="ctrl-btn" onClick$={runAnimation} disabled={isPlaying.value}>
            ▶ {isPlaying.value ? 'running...' : 'replay'}
          </button>
          <button class="ctrl-btn" onClick$={reset}>↺ reset</button>
        </div>
      </div>

      <div class="anim-flow">
        {/* User/Browser */}
        <div class={`flow-node browser-node ${step.value >= 1 ? 'active' : ''}`}>
          <div class="node-emoji">👤</div>
          <div class="node-name">USER</div>
          <div class="node-detail">
            {step.value === 0 && 'waiting...'}
            {step.value === 1 && '→ GET /page'}
            {step.value >= 2 && step.value < 5 && '⏳ waiting...'}
            {step.value === 5 && '📥 downloading...'}
            {step.value === 6 && '⚙️ parsing JS...'}
            {step.value === 7 && '🔄 hydrating...'}
            {step.value === 8 && '✓ ready (finally!)'}
          </div>
        </div>

        {/* Arrow */}
        <div class={`flow-arrow ${step.value >= 1 ? 'active' : ''}`}>
          <div class="arrow-line"></div>
          {step.value >= 4 && step.value < 8 && (
            <div class="payload">
              <span class="payload-html">HTML</span>
              <span class="payload-plus">+</span>
              <span class="payload-js">JS 2.4MB</span>
            </div>
          )}
        </div>

        {/* Server */}
        <div class={`flow-node server-node ${step.value >= 2 ? 'active' : ''}`}>
          <div class="node-emoji">🖥️</div>
          <div class="node-name">SERVER</div>
          <div class="server-tasks">
            <div class={`task ${step.value >= 2 ? 'done' : ''}`}>
              <span class="task-icon">📄</span> Static HTML
            </div>
            <div class={`task ${step.value >= 2 ? 'done' : ''}`}>
              <span class="task-icon">⚡</span> Dynamic Data
            </div>
            <div class={`task ${step.value >= 2 ? 'done' : ''}`}>
              <span class="task-icon">👤</span> Personalization
            </div>
            <div class={`task ${step.value >= 3 ? 'done' : ''}`}>
              <span class="task-icon">📦</span> Bundle JS
              {step.value >= 3 && <span class="size-warn">2.4MB!</span>}
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div class="data-layer">
          <div class={`data-source ${step.value >= 2 ? 'active' : ''}`}>
            <span class="src-icon">🗄️</span>
            <span class="src-name">Database</span>
          </div>
          <div class={`data-source ${step.value >= 2 ? 'active' : ''}`}>
            <span class="src-icon">🔌</span>
            <span class="src-name">APIs</span>
          </div>
          <div class={`data-source ${step.value >= 2 ? 'active' : ''}`}>
            <span class="src-icon">📝</span>
            <span class="src-name">CMS</span>
          </div>
        </div>
      </div>

      {/* Problems Section */}
      <div class="problems-section">
        <div class="problems-title">⚠️ THE PROBLEMS</div>
        <div class="problems-grid">
          <div class={`problem ${step.value >= 4 ? 'visible' : ''}`}>
            <span class="prob-icon">📦</span>
            <span class="prob-text">Heavy JS bundles shipped to client</span>
          </div>
          <div class={`problem ${step.value >= 6 ? 'visible' : ''}`}>
            <span class="prob-icon">🐌</span>
            <span class="prob-text">Slow Time to Interactive (TTI)</span>
          </div>
          <div class={`problem ${step.value >= 7 ? 'visible' : ''}`}>
            <span class="prob-icon">🔄</span>
            <span class="prob-text">Full page hydration overhead</span>
          </div>
          <div class={`problem ${step.value >= 8 ? 'visible' : ''}`}>
            <span class="prob-icon">💰</span>
            <span class="prob-text">Need CDN caching for performance</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div class="timeline">
        <div class="timeline-bar">
          <div class="timeline-progress" style={`width: ${(step.value / 8) * 100}%`}></div>
        </div>
        <div class="timeline-labels">
          <span>Request</span>
          <span>Server</span>
          <span>Download</span>
          <span>Parse</span>
          <span>Hydrate</span>
          <span class={step.value >= 8 ? 'ready' : ''}>Ready</span>
        </div>
        {step.value >= 8 && (
          <div class="tti-warning">
            TTI: ~4-8 seconds on 3G 😱
          </div>
        )}
      </div>
    </div>
  );
});

