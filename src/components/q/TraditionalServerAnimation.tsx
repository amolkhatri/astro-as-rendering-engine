import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const TraditionalServerAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'Click play to visualize' },
    { id: 1, label: 'REQUEST', desc: 'User requests page...' },
    { id: 2, label: 'STATIC', desc: 'Static content ready instantly!' },
    { id: 3, label: 'DYNAMIC_1', desc: 'Fetching from database...' },
    { id: 4, label: 'DYNAMIC_2', desc: 'Waiting for external API... (slow!)' },
    { id: 5, label: 'DYNAMIC_3', desc: 'Still waiting... user sees nothing!' },
    { id: 6, label: 'COMPLETE', desc: 'All data ready. Now building HTML...' },
    { id: 7, label: 'BUNDLE', desc: 'Bundling JavaScript...' },
    { id: 8, label: 'SEND', desc: 'Finally sending to browser...' },
    { id: 9, label: 'HYDRATE', desc: 'Browser parsing & hydrating...' },
    { id: 10, label: 'READY', desc: 'Page is finally interactive!' },
  ];

  const reset = $(() => {
    step.value = 0;
    isPlaying.value = false;
  });

  const runAnimation = $(() => {
    if (isPlaying.value) return;
    isPlaying.value = true;
    step.value = 0;
    
    const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      
      const sequence = [2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  const getElapsedTime = () => {
    if (step.value <= 1) return '0.0s';
    if (step.value === 2) return '0.1s';
    if (step.value === 3) return '0.3s';
    if (step.value === 4) return '1.5s';
    if (step.value === 5) return '2.8s';
    if (step.value >= 6 && step.value < 8) return '3.0s';
    if (step.value === 8) return '3.5s';
    if (step.value === 9) return '5.0s';
    return '6.2s';
  };

  return (
    <div class="trad-anim">
      {/* Header */}
      <div class="trad-header">
        <div class="trad-status-bar">
          <span class="status-step">[{steps[step.value].label}]</span>
          <span class="status-desc">{steps[step.value].desc}</span>
        </div>
        <div class="trad-controls">
          <button class="trad-btn" onClick$={runAnimation} disabled={isPlaying.value}>
            {isPlaying.value ? '▶ running...' : '▶ play'}
          </button>
          <button class="trad-btn" onClick$={reset}>↺ reset</button>
        </div>
      </div>

      {/* Main Layout - Side by Side */}
      <div class="trad-layout">
        {/* Browser Side */}
        <div class="trad-browser-side">
          <div class="side-label">👤 BROWSER</div>
          <div class="browser-screen">
            {step.value === 0 && (
              <div class="screen-idle">Ready to request</div>
            )}
            {step.value === 1 && (
              <div class="screen-requesting">
                <span class="req-arrow">→</span> GET /dashboard
              </div>
            )}
            {step.value >= 2 && step.value < 8 && (
              <div class="screen-waiting">
                <div class="blank-indicator">
                  <div class="blank-spinner"></div>
                  <span>Loading...</span>
                </div>
                <div class="wait-info">
                  <span class="wait-label">Waiting:</span>
                  <span class="wait-time">{getElapsedTime()}</span>
                </div>
              </div>
            )}
            {step.value === 8 && (
              <div class="screen-receiving">
                <span class="recv-icon">📥</span> Receiving HTML + JS...
              </div>
            )}
            {step.value === 9 && (
              <div class="screen-hydrating">
                <span class="hydr-icon">🔄</span> Hydrating components...
              </div>
            )}
            {step.value === 10 && (
              <div class="screen-ready">
                <span class="ready-icon">✓</span> Interactive!
              </div>
            )}
          </div>
          {step.value >= 2 && step.value < 8 && (
            <div class="blank-warning">⚠️ User sees blank page!</div>
          )}
        </div>

        {/* Server Side */}
        <div class="trad-server-side">
          <div class="side-label">🖥️ SERVER</div>
          <div class="server-panel">
            {/* Static Content - Always Fast */}
            <div class="content-section">
              <div class="section-header">📄 STATIC CONTENT</div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">HTML Template</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ 10ms'}
                </span>
              </div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">CSS Styles</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ 5ms'}
                </span>
              </div>
              {step.value >= 2 && (
                <div class="section-complete">
                  ✓ Ready in 15ms — but can't send yet!
                </div>
              )}
            </div>

            {/* Dynamic Content - The Blocker */}
            <div class="content-section dynamic">
              <div class="section-header">⚡ DYNAMIC CONTENT</div>
              
              <div class={`content-item ${step.value >= 3 ? 'loading' : ''} ${step.value >= 4 ? 'ready' : ''}`}>
                <span class="item-name">🗄️ Database Query</span>
                <span class="item-status">
                  {step.value < 3 && '—'}
                  {step.value === 3 && <span class="loading-text">⏳ 200ms</span>}
                  {step.value >= 4 && '✓ 200ms'}
                </span>
              </div>

              <div class={`content-item slow ${step.value >= 4 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                <span class="item-name">🔌 External API</span>
                <span class="item-status">
                  {step.value < 4 && '—'}
                  {step.value === 4 && <span class="loading-text slow-text">⏳ 1.2s...</span>}
                  {step.value === 5 && <span class="loading-text slow-text">⏳ 2.5s... 🐌</span>}
                  {step.value >= 6 && '✓ 2.5s'}
                </span>
              </div>

              <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                <span class="item-name">👤 User Profile</span>
                <span class="item-status">
                  {step.value < 5 && '—'}
                  {step.value === 5 && <span class="loading-text">⏳ 150ms</span>}
                  {step.value >= 6 && '✓ 150ms'}
                </span>
              </div>

              {step.value >= 3 && step.value < 6 && (
                <div class="blocking-notice">
                  🚫 BLOCKED: Must wait for ALL data!
                </div>
              )}

              {step.value >= 6 && (
                <div class="section-complete delayed">
                  ✓ Ready after 2.85s — HTML can now be built
                </div>
              )}
            </div>

            {/* Build & Bundle Phase */}
            {step.value >= 6 && (
              <div class="content-section build">
                <div class="section-header">📦 BUILD & BUNDLE</div>
                
                <div class={`content-item ${step.value >= 6 ? 'loading' : ''} ${step.value >= 7 ? 'ready' : ''}`}>
                  <span class="item-name">Assemble HTML</span>
                  <span class="item-status">
                    {step.value === 6 && <span class="loading-text">⏳ building...</span>}
                    {step.value >= 7 && '✓ 150ms'}
                  </span>
                </div>

                <div class={`content-item js-bundle ${step.value >= 7 ? 'loading' : ''} ${step.value >= 8 ? 'ready' : ''}`}>
                  <span class="item-name">Bundle JavaScript</span>
                  <span class="item-status">
                    {step.value < 7 && '—'}
                    {step.value === 7 && <span class="loading-text">⏳ bundling...</span>}
                    {step.value >= 8 && <span class="js-size">2.4 MB</span>}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      

      {/* Key Problem */}
      
    </div>
  );
});
