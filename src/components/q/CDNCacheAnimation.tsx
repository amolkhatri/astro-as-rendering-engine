import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const CDNCacheAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'Ready to request /dashboard' },
    { id: 1, label: 'CDN', desc: 'CDN serves cached static shell' },
    { id: 2, label: 'SERVER', desc: 'Server renders dynamic data' },
    { id: 3, label: 'CLIENT', desc: 'Browser hydrates via JS' },
  ];

  const reset = $(() => {
    step.value = 0;
    isPlaying.value = false;
  });

  const runAnimation = $(() => {
    if (isPlaying.value) return;
    isPlaying.value = true;
    step.value = 0;

    const sequence = [1, 2, 3];
    let i = 0;

    const interval = setInterval(() => {
      if (i < sequence.length) {
        step.value = sequence[i];
        i++;
      } else {
        clearInterval(interval);
        isPlaying.value = false;
      }
    }, 2200);
  });

  useVisibleTask$(() => {
    const timer = setTimeout(() => {
      isPlaying.value = true;
      step.value = 1;

      const sequence = [2, 3];
      let i = 0;

      const interval = setInterval(() => {
        if (i < sequence.length) {
          step.value = sequence[i];
          i++;
        } else {
          clearInterval(interval);
          isPlaying.value = false;
        }
      }, 4000);
    }, 2000);

    return () => clearTimeout(timer);
  });

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
          <div class="side-label">👤 Browser</div>
          <div class="browser-screen">
            {step.value === 0 && <div class="screen-idle">Idle</div>}
            {step.value === 1 && (
              <div class="screen-requesting">
                <span class="req-arrow">→</span> GET /dashboard
              </div>
            )}
            {step.value === 2 && (
              <div class="screen-fast">
                <span class="fast-icon">⚡</span> Static shell from CDN
                <div class="fast-time">50ms</div>
              </div>
            )}
            {step.value === 3 && (
              <div class="screen-worse">
                <span class="worse-icon">📦</span> Client fetching dynamic data...
              </div>
            )}
          </div>
          {step.value >= 2 && <div class="fast-badge">✓ Static cached</div>}
        </div>

        {/* CDN Side */}
        <div class="cdn-server-side">
          <div class="side-label">🌐 CDN</div>
          <div class="server-panel">
            <div class="content-section">
              <div class="section-header">📄 Static Assets</div>
              <div class={`content-item ${step.value >= 1 ? 'ready' : ''}`}>
                <span class="item-name">HTML shell</span>
                <span class="item-status">
                  {step.value < 1 ? '—' : '✓ Cached'}
                </span>
              </div>
              <div class={`content-item ${step.value >= 1 ? 'ready' : ''}`}>
                <span class="item-name">CSS / JS chunks</span>
                <span class="item-status">
                  {step.value < 1 ? '—' : '✓ Cached'}
                </span>
              </div>
              {step.value >= 1 && (
                <div class="section-complete">
                  ✓ CDN responds instantly
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Server + Client data */}
        <div class="cdn-server-side">
          <div class="side-label">🖥️ Server</div>
          <div class="server-panel">
            <div class="content-section dynamic">
              <div class="section-header">⚡ Dynamic Content</div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">Personalization</span>
                <span class="item-status">
                  {step.value < 2 && '— waiting'}
                  {step.value === 2 && '↺ rendering'}
                  {step.value === 3 && <span class="lost-status">→ to client</span>}
                </span>
              </div>
              <div class={`content-item ${step.value >= 2 ? 'ready' : ''}`}>
                <span class="item-name">Dynamic Data</span>
                <span class="item-status">
                  {step.value < 2 && '— waiting'}
                  {step.value === 2 && '↺ fetching'}
                  {step.value === 3 && <span class="lost-status">→ fetched client-side</span>}
                </span>
              </div>
              {step.value === 3 && (
                <div class="solution-notice">
                  💡 Client JS pulls dynamic content
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dilemma + Solution */}


      {/* Key Problem */}
      {/* <div class="cdn-problem">
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
      </div> */}

      {/* The Triangle Dilemma */}

    </div>
  );
});
