import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const CDNCacheAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'The "performance fix"...' },
    { id: 1, label: 'CACHE', desc: 'Adding CDN cache layer...' },
    { id: 2, label: 'FAST', desc: 'Page loads fast! ✓' },
    { id: 3, label: 'PROBLEM', desc: 'But wait... personalization?' },
    { id: 4, label: 'STATIC', desc: 'CDN serves same page to everyone!' },
    { id: 5, label: 'FIX', desc: 'Solution: Move logic to client...' },
    { id: 6, label: 'MORE_JS', desc: 'Ship MORE JavaScript!' },
    { id: 7, label: 'WORSE', desc: 'Problem is now worse 😱' },
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
    }, 1200);
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
      }, 1200);
    }, 600);
    
    return () => clearTimeout(timer);
  });

  const getElapsedTime = () => {
    if (step.value <= 1) return '0.0s';
    if (step.value === 2) return '0.05s';
    if (step.value === 3) return '0.1s';
    if (step.value === 4) return '0.15s';
    if (step.value === 5) return '0.2s';
    if (step.value === 6) return '0.3s';
    return '0.5s';
  };

  return (
    <div class="cdn-anim">
      {/* Header */}
      <div class="cdn-header">
        <div class="cdn-status-bar">
          <span class="cdn-status-step">[{steps[step.value].label}]</span>
          <span class="cdn-status-desc">{steps[step.value].desc}</span>
        </div>
        <div class="cdn-controls">
          <button class="cdn-btn" onClick$={runAnimation} disabled={isPlaying.value}>
            {isPlaying.value ? '▶ running...' : '▶ play'}
          </button>
          <button class="cdn-btn" onClick$={reset}>↺ reset</button>
        </div>
      </div>

      {/* Main Layout - Side by Side */}
      <div class="cdn-layout">
        {/* Browser Side */}
        <div class="cdn-browser-side">
          <div class="side-label">👤 USERS</div>
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
              <div class="screen-fast">
                <span class="fast-icon">⚡</span> Fast response!
                <div class="fast-time">50ms</div>
              </div>
            )}
            {step.value >= 4 && step.value < 6 && (
              <div class="screen-problem">
                <span class="problem-icon">⚠️</span> Same page for all!
                <div class="problem-detail">No personalization</div>
              </div>
            )}
            {step.value >= 6 && (
              <div class="screen-worse">
                <span class="worse-icon">📦</span> Downloading JS...
                <div class="worse-size">4.8 MB</div>
              </div>
            )}
          </div>
          {step.value >= 2 && step.value < 4 && (
            <div class="fast-badge">✓ CDN working!</div>
          )}
          {step.value >= 4 && (
            <div class="problem-badge">⚠️ Features lost!</div>
          )}
        </div>

        {/* CDN/Server Side */}
        <div class="cdn-server-side">
          <div class="side-label">🌐 CDN + SERVER</div>
          <div class="server-panel">
            {/* Static Content - Cached Fast */}
            <div class="content-section">
              <div class="section-header">📄 STATIC CONTENT</div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">HTML Template</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ Cached'}
                </span>
              </div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">CSS Styles</span>
                <span class="item-status">
                  {step.value < 2 ? '—' : '✓ Cached'}
                </span>
              </div>
              {step.value >= 2 && (
                <div class="section-complete">
                  ✓ Served from CDN in 50ms — Fast!
                </div>
              )}
            </div>

            {/* Dynamic Content - The Problem */}
            <div class="content-section dynamic">
              <div class="section-header">⚡ DYNAMIC CONTENT</div>
              
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''} ${step.value >= 3 ? 'problem' : ''}`}>
                <span class="item-name">👤 Personalization</span>
                <span class="item-status">
                  {step.value < 2 && '—'}
                  {step.value === 2 && '✓ Cached'}
                  {step.value >= 3 && <span class="lost-status">❌ LOST</span>}
                </span>
              </div>

              <div class={`content-item ${step.value >= 2 ? 'ready' : ''} ${step.value >= 3 ? 'problem' : ''}`}>
                <span class="item-name">⚡ Dynamic Data</span>
                <span class="item-status">
                  {step.value < 2 && '—'}
                  {step.value === 2 && '✓ Cached'}
                  {step.value >= 3 && <span class="lost-status">❌ LOST</span>}
                </span>
              </div>

              <div class={`content-item ${step.value >= 2 ? 'ready' : ''} ${step.value >= 3 ? 'problem' : ''}`}>
                <span class="item-name">🔄 Real-time Updates</span>
                <span class="item-status">
                  {step.value < 2 && '—'}
                  {step.value === 2 && '✓ Cached'}
                  {step.value >= 3 && <span class="lost-status">❌ LOST</span>}
                </span>
              </div>

              {step.value >= 3 && step.value < 5 && (
                <div class="blocking-notice">
                  🚫 CDN serves SAME page to everyone!
                </div>
              )}

              {step.value >= 5 && (
                <div class="solution-notice">
                  💡 "Fix": Move to client-side JS
                </div>
              )}
            </div>

            {/* Client-Side JS Explosion */}
            {step.value >= 5 && (
              <div class="content-section js-explosion">
                <div class="section-header">📦 CLIENT-SIDE JAVASCRIPT</div>
                
                <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                  <span class="item-name">Auth SDK</span>
                  <span class="item-status">
                    {step.value === 5 && <span class="loading-text">⏳ adding...</span>}
                    {step.value >= 6 && <span class="js-size">+500 KB</span>}
                  </span>
                </div>

                <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                  <span class="item-name">Personalization Engine</span>
                  <span class="item-status">
                    {step.value === 5 && <span class="loading-text">⏳ adding...</span>}
                    {step.value >= 6 && <span class="js-size">+800 KB</span>}
                  </span>
                </div>

                <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                  <span class="item-name">API Client</span>
                  <span class="item-status">
                    {step.value === 5 && <span class="loading-text">⏳ adding...</span>}
                    {step.value >= 6 && <span class="js-size">+400 KB</span>}
                  </span>
                </div>

                <div class={`content-item ${step.value >= 5 ? 'loading' : ''} ${step.value >= 6 ? 'ready' : ''}`}>
                  <span class="item-name">State Management</span>
                  <span class="item-status">
                    {step.value === 5 && <span class="loading-text">⏳ adding...</span>}
                    {step.value >= 6 && <span class="js-size">+400 KB</span>}
                  </span>
                </div>

                {step.value >= 6 && (
                  <div class="section-complete worse">
                    Total: 2.4MB → 4.8MB 😱
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div class="cdn-timeline">
        <div class="timeline-header">
          <span class="timeline-icon">⏱️</span>
          <span class="timeline-title">TIMELINE</span>
          <span class="timeline-elapsed">Elapsed: {getElapsedTime()}</span>
        </div>
        <div class="timeline-track">
          <div class="timeline-fill" style={`width: ${(step.value / 7) * 100}%`}></div>
          <div class="timeline-markers">
            <div class={`marker ${step.value >= 2 ? 'reached' : ''}`} style="left: 15%">
              <span class="marker-label">CDN Fast</span>
            </div>
            <div class={`marker ${step.value >= 3 ? 'reached' : ''}`} style="left: 35%">
              <span class="marker-label">Problem</span>
            </div>
            <div class={`marker ${step.value >= 5 ? 'reached' : ''}`} style="left: 60%">
              <span class="marker-label">Client Fix</span>
            </div>
            <div class={`marker ${step.value >= 6 ? 'reached' : ''}`} style="left: 85%">
              <span class="marker-label">JS Explosion</span>
            </div>
          </div>
        </div>
        <div class="timeline-legend">
          <span class="legend-item fast-legend">■ CDN: 50ms (fast!)</span>
          <span class="legend-item problem-legend">■ Features: Lost</span>
          <span class="legend-item worse-legend">■ JS: 2.4MB → 4.8MB</span>
        </div>
      </div>

      {/* Dilemma + Solution */}
      {step.value >= 3 && (
        <div class="dilemma-solution-container">
          {/* Dilemma Section - stays visible */}
          <div class="dilemma-section">
            <div class="dilemma-title">❌ THE DILEMMA</div>
            <div class="dilemma-content">
              <div class="lost-feature">
                <span class="lost-icon">👤</span>
                <span class="lost-text">Personalization</span>
                <span class="lost-status">❌ LOST</span>
              </div>
              <div class="lost-feature">
                <span class="lost-icon">⚡</span>
                <span class="lost-text">Dynamic Content</span>
                <span class="lost-status">❌ LOST</span>
              </div>
              <div class="lost-feature">
                <span class="lost-icon">🔄</span>
                <span class="lost-text">Real-time Data</span>
                <span class="lost-status">❌ LOST</span>
              </div>
            </div>
          </div>

          {/* Solution Section - appears after dilemma */}
          {step.value >= 5 && (
            <div class="solution-section">
              <div class="solution-arrow-down">↓</div>
              <div class="solution-title">💡 THE "SOLUTION"</div>
              <div class="solution-text">Move ALL dynamic logic to client-side JavaScript!</div>
              
              <div class="js-explosion-visual">
                <div class="js-bundle original">
                  <span class="bundle-label">Before</span>
                  <span class="bundle-size">2.4 MB</span>
                </div>
                <div class="js-arrow">→</div>
                <div class={`js-bundle expanded ${step.value >= 6 ? 'visible' : ''}`}>
                  <span class="bundle-label">After CDN</span>
                  <span class="bundle-size explode">4.8 MB</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Key Problem */}
      <div class="cdn-problem">
        <div class="problem-title">⚠️ THE KEY PROBLEM</div>
        <div class="problem-content">
          <div class="problem-point">
            <span class="point-icon">⚡</span>
            <span class="point-text">CDN makes static content fast (<strong>50ms</strong>) — but breaks dynamic features!</span>
          </div>
          <div class="problem-point">
            <span class="point-icon">💡</span>
            <span class="point-text">"Solution" moves logic to client — now we ship <strong>4.8MB JavaScript</strong>!</span>
          </div>
          <div class="problem-point">
            <span class="point-icon">😱</span>
            <span class="point-text">Problem is now <strong>worse</strong> than before CDN!</span>
          </div>
        </div>
      </div>
    </div>
  );
});
