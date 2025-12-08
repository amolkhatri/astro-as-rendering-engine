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
          <div class="problem-point">
            <span class="point-icon">😱</span>
            <span class="point-text">It improved solve performance metrics but worsen others as browser has to manage more javascript.</span>
          </div>
          <div class="problem-point">
            <span class="point-icon">😱</span>
            <span class="point-text">It is not SEO friendly. As search engines need to execute javascript to index the page.</span>
          </div>
          <div class="problem-point">
            <span class="point-icon">😱</span>
            <span class="point-text">Developers keep adding more and more javascript to the client side. Making page slower.</span>
          </div>
          <div class="problem-point">
            <span class="point-icon">😱</span>
            <span class="point-text">Carefully engineering the dynamic content to load it from client is error prone and difficult to maintain.</span>
          </div>
        </div>
      </div>

      {/* The Triangle Dilemma */}
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
    </div>
  );
});
