import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const IslandsArchitectureAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'The Astro solution...' },
    { id: 1, label: 'REQUEST', desc: 'User requests page...' },
    { id: 2, label: 'STATIC', desc: 'Server renders static HTML instantly...' },
    { id: 3, label: 'SEND', desc: 'Sending HTML (no JS!) to browser...' },
    { id: 4, label: 'RENDER', desc: 'Browser renders immediately...' },
    { id: 5, label: 'ISLANDS', desc: 'Islands load on-demand...' },
    { id: 6, label: 'DYNAMIC', desc: 'Dynamic content from server...' },
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

  const getElapsedTime = () => {
    if (step.value <= 1) return '0.0s';
    if (step.value === 2) return '0.01s';
    if (step.value === 3) return '0.05s';
    if (step.value === 4) return '0.1s';
    if (step.value === 5) return '0.15s';
    if (step.value === 6) return '0.3s';
    return '0.5s';
  };

  return (
    <div class="islands-anim">
      {/* Header */}
      <div class="islands-header">
        <div class="islands-status-bar">
          <span class="islands-status-step">[{steps[step.value].label}]</span>
          <span class="islands-status-desc">{steps[step.value].desc}</span>
        </div>
        <div class="islands-controls">
          <button class="islands-btn" onClick$={runAnimation} disabled={isPlaying.value}>
            {isPlaying.value ? '▶ running...' : '▶ play'}
          </button>
          <button class="islands-btn" onClick$={reset}>↺ reset</button>
        </div>
      </div>

      {/* Main Layout */}
      <div class="islands-layout">
        {/* Browser Side */}
        <div class="islands-browser-side">
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
            {step.value >= 2 && step.value < 4 && (
              <div class="screen-waiting">
                <span class="wait-icon">⏳</span> Waiting for response...
              </div>
            )}
            {step.value >= 4 && (
              <div class="page-preview">
                <div class="preview-header">
                  <div class="preview-title">Dashboard</div>
                  {step.value >= 4 && <span class="preview-badge">✓ Rendered</span>}
                </div>
                <div class="preview-content">
                  <div class={`preview-section static ${step.value >= 4 ? 'visible' : ''}`}>
                    <span class="section-label">📄 Header</span>
                    <span class="section-js">0kb JS</span>
                  </div>
                  <div class={`preview-section static ${step.value >= 4 ? 'visible' : ''}`}>
                    <span class="section-label">📄 Content</span>
                    <span class="section-js">0kb JS</span>
                  </div>
                  <div class={`preview-section island ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                    <span class="section-label">🏝️ Form</span>
                    <span class="section-js">
                      {step.value < 5 && '0kb JS'}
                      {step.value === 5 && '⏳ Loading...'}
                      {step.value >= 6 && '~15kb JS'}
                    </span>
                  </div>
                  <div class={`preview-section static ${step.value >= 4 ? 'visible' : ''}`}>
                    <span class="section-label">📄 Footer</span>
                    <span class="section-js">0kb JS</span>
                  </div>
                </div>
                {step.value >= 4 && (
                  <div class="preview-total">
                    Total JS: <span class="js-total">{step.value < 6 ? '0kb' : '~15kb'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          {step.value >= 4 && (
            <div class="instant-badge">⚡ Instant render!</div>
          )}
        </div>

        {/* Server Side */}
        <div class="islands-server-side">
          <div class="side-label">🖥️ ASTRO SERVER</div>
          <div class="server-panel">
            {/* Static Content - Fast */}
            <div class="content-section">
              <div class="section-header">📄 STATIC CONTENT</div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">HTML Template</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ 5ms'}
                </span>
              </div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">Static Islands</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ 0kb JS'}
                </span>
              </div>
              {step.value >= 2 && (
                <div class="section-complete fast">
                  ✓ Ready instantly — CDN cacheable!
                </div>
              )}
            </div>

            {/* Dynamic Content - Server-Side */}
            <div class="content-section dynamic">
              <div class="section-header">⚡ DYNAMIC CONTENT</div>
              
              <div class={`content-item ${step.value >= 6 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                <span class="item-name">🗄️ Database Query</span>
                <span class="item-status">
                  {step.value < 6 && '—'}
                  {step.value === 6 && <span class="loading-text">⏳ 200ms</span>}
                  {step.value >= 7 && '✓ 200ms'}
                </span>
              </div>

              <div class={`content-item ${step.value >= 6 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                <span class="item-name">👤 User Profile</span>
                <span class="item-status">
                  {step.value < 6 && '—'}
                  {step.value === 6 && <span class="loading-text">⏳ 150ms</span>}
                  {step.value >= 7 && '✓ 150ms'}
                </span>
              </div>

              {step.value >= 6 && (
                <div class="section-complete server-side">
                  ✓ Server handles — No client JS needed!
                </div>
              )}
            </div>

            {/* Islands - On-Demand */}
            {step.value >= 5 && (
              <div class="content-section islands">
                <div class="section-header">🏝️ INTERACTIVE ISLANDS</div>
                
                <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                  <span class="item-name">Form Component</span>
                  <span class="item-status">
                    {step.value === 5 && <span class="loading-text">⏳ Loading on-demand...</span>}
                    {step.value >= 6 && <span class="js-size">~15kb JS</span>}
                  </span>
                </div>

                {step.value >= 6 && (
                  <div class="section-complete islands-complete">
                    ✓ Only interactive parts need JS!
                  </div>
                )}
              </div>
            )}

            {/* Response */}
            {step.value >= 3 && (
              <div class="content-section response">
                <div class="section-header">📤 RESPONSE</div>
                <div class="response-content">
                  <div class="response-item">
                    <span class="response-label">HTML:</span>
                    <span class="response-value">Complete</span>
                  </div>
                  <div class="response-item">
                    <span class="response-label">JS:</span>
                    <span class="response-value zero">{step.value < 6 ? '0kb' : '~15kb'}</span>
                  </div>
                  <div class="response-item">
                    <span class="response-label">TTFB:</span>
                    <span class="response-value fast">~50ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CDN Layer */}
      {step.value >= 3 && (
        <div class="cdn-layer-section">
          <div class="cdn-label">🌐 CDN CACHE</div>
          <div class="cdn-status">
            {step.value >= 3 && step.value < 4 && (
              <span class="cdn-caching">Caching HTML...</span>
            )}
            {step.value >= 4 && (
              <span class="cdn-cached">✓ Cached — Future requests: 50ms!</span>
            )}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div class="islands-timeline">
        <div class="timeline-header">
          <span class="timeline-icon">⏱️</span>
          <span class="timeline-title">TIMELINE</span>
          <span class="timeline-elapsed">Elapsed: {getElapsedTime()}</span>
        </div>
        <div class="timeline-track">
          <div class="timeline-fill" style={`width: ${(step.value / 7) * 100}%`}></div>
          <div class="timeline-markers">
            <div class={`marker ${step.value >= 2 ? 'reached' : ''}`} style="left: 10%">
              <span class="marker-label">Static Ready</span>
            </div>
            <div class={`marker ${step.value >= 4 ? 'reached' : ''}`} style="left: 30%">
              <span class="marker-label">Rendered</span>
            </div>
            <div class={`marker ${step.value >= 5 ? 'reached' : ''}`} style="left: 50%">
              <span class="marker-label">Islands</span>
            </div>
            <div class={`marker ${step.value >= 7 ? 'reached' : ''}`} style="left: 90%">
              <span class="marker-label">Complete</span>
            </div>
          </div>
        </div>
        <div class="timeline-legend">
          <span class="legend-item static-legend">■ Static: Instant</span>
          <span class="legend-item dynamic-legend">■ Dynamic: Server-side</span>
          <span class="legend-item islands-legend">■ Islands: On-demand</span>
        </div>
      </div>

      {/* Key Benefits */}
      {step.value >= 7 && (
        <div class="islands-benefits">
          <div class="benefits-title">✨ THE BENEFITS</div>
          <div class="benefits-grid">
            <div class="benefit-item">
              <span class="benefit-icon">📦</span>
              <span class="benefit-text">No or Less JavaScript</span>
              <span class="benefit-value">~15kb vs 2-5MB</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">⚡</span>
              <span class="benefit-text">Faster Server Response</span>
              <span class="benefit-value">~50ms TTFB</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">🏝️</span>
              <span class="benefit-text">Island Architecture</span>
              <span class="benefit-value">On-demand JS</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">🌐</span>
              <span class="benefit-text">CDN Cacheable</span>
              <span class="benefit-value">Perfect caching</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

