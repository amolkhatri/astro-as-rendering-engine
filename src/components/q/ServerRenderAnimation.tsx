import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const ServerRenderAnimation = component$(() => {
  const step = useSignal(0);
  const isPlaying = useSignal(false);

  const steps = [
    { id: 0, label: 'IDLE', desc: 'Click play to start' },
    { id: 1, label: 'REQUEST', desc: 'Browser requests /page' },
    { id: 2, label: 'STATIC', desc: 'Loading static template...' },
    { id: 3, label: 'DYNAMIC', desc: 'Fetching dynamic data...' },
    { id: 4, label: 'COMPILE', desc: 'Combining on server...' },
    { id: 5, label: 'RESPONSE', desc: 'Sending HTML to browser' },
    { id: 6, label: 'RENDER', desc: 'Page rendered! Zero JS shipped.' },
  ];

  const reset = $(() => {
    step.value = 0;
    isPlaying.value = false;
  });

  const runAnimation = $(() => {
    if (isPlaying.value) return;
    isPlaying.value = true;
    step.value = 0;
    
    const sequence = [1, 2, 3, 4, 5, 6];
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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => step.value);
    // Auto-start on mount
    if (step.value === 0 && !isPlaying.value) {
      const timer = setTimeout(() => {
        isPlaying.value = true;
        step.value = 1;
        
        const sequence = [2, 3, 4, 5, 6];
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
      }, 800);
      
      return () => clearTimeout(timer);
    }
  });

  return (
    <div class="ssr-animation">
      <div class="animation-header">
        <span class="status-label">
          [{steps[step.value].label}] {steps[step.value].desc}
        </span>
        <div class="controls">
          <button 
            class="ctrl-btn" 
            onClick$={runAnimation}
            disabled={isPlaying.value}
          >
            {isPlaying.value ? '▶ running...' : '▶ play()'}
          </button>
          <button class="ctrl-btn" onClick$={reset}>
            ↺ reset()
          </button>
        </div>
      </div>

      <div class="animation-stage">
        {/* Browser */}
        <div class={`node browser ${step.value >= 1 ? 'active' : ''} ${step.value >= 6 ? 'complete' : ''}`}>
          <div class="node-icon">🖥️</div>
          <div class="node-label">BROWSER</div>
          <div class="node-content">
            {step.value === 0 && <span class="dim">waiting...</span>}
            {step.value === 1 && <span class="request">GET /page →</span>}
            {step.value >= 2 && step.value < 6 && <span class="waiting">⏳ waiting...</span>}
            {step.value >= 6 && (
              <div class="rendered">
                <div class="mini-page">
                  <div class="mini-header"></div>
                  <div class="mini-content"></div>
                  <div class="mini-content short"></div>
                </div>
                <span class="success">✓ rendered</span>
              </div>
            )}
          </div>
        </div>

        {/* Connection Lines */}
        <div class="connection">
          <div class={`line request-line ${step.value >= 1 ? 'active' : ''}`}>
            <span class="packet request-packet">→ REQ</span>
          </div>
          <div class={`line response-line ${step.value >= 5 ? 'active' : ''}`}>
            <span class="packet response-packet">← HTML</span>
          </div>
        </div>

        {/* Server */}
        <div class={`node server ${step.value >= 2 ? 'active' : ''} ${step.value >= 5 ? 'complete' : ''}`}>
          <div class="node-icon">⚙️</div>
          <div class="node-label">ASTRO SERVER</div>
          <div class="node-content server-content">
            {step.value < 2 && <span class="dim">idle</span>}
            {step.value >= 2 && (
              <div class="server-process">
                <div class={`process-item static ${step.value >= 2 ? 'loaded' : ''}`}>
                  <span class="proc-icon">📄</span>
                  <span class="proc-label">static.astro</span>
                  {step.value >= 2 && <span class="check">✓</span>}
                </div>
                <div class={`process-item dynamic ${step.value >= 3 ? 'loaded' : ''}`}>
                  <span class="proc-icon">⚡</span>
                  <span class="proc-label">fetch(api)</span>
                  {step.value >= 3 && <span class="check">✓</span>}
                </div>
                <div class={`process-item compile ${step.value >= 4 ? 'loaded' : ''}`}>
                  <span class="proc-icon">🔧</span>
                  <span class="proc-label">compile()</span>
                  {step.value >= 4 && <span class="check">✓</span>}
                </div>
                <div class={`process-item output ${step.value >= 5 ? 'loaded' : ''}`}>
                  <span class="proc-icon">📤</span>
                  <span class="proc-label">send(html)</span>
                  {step.value >= 5 && <span class="check">✓</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Data Sources */}
        <div class="data-sources">
          <div class={`source static-source ${step.value >= 2 ? 'active' : ''}`}>
            <div class="source-label">STATIC</div>
            <pre class="source-code">{`<html>
  <h1>Title</h1>
  <slot/>
</html>`}</pre>
          </div>
          <div class={`source dynamic-source ${step.value >= 3 ? 'active' : ''}`}>
            <div class="source-label">DYNAMIC</div>
            <pre class="source-code">{`{
  posts: [...],
  user: {...}
}`}</pre>
          </div>
        </div>
      </div>

      <div class="animation-footer">
        <div class="step-indicators">
          {steps.slice(1).map((s, idx) => (
            <div 
              key={s.id} 
              class={`step-dot ${step.value > idx ? 'done' : ''} ${step.value === idx + 1 ? 'current' : ''}`}
            />
          ))}
        </div>
        <div class="output-info">
          {step.value >= 6 && (
            <span class="final-output">
              output: <span class="highlight">100% HTML</span> | js: <span class="highlight">0kb</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

