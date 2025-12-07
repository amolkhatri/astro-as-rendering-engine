import { component$, useSignal, $ } from '@builder.io/qwik';

export const Counter = component$(() => {
  const count = useSignal(0);

  return (
    <div class="interactive-demo counter-demo">
      <div class="demo-label">// Interactive Qwik Counter</div>
      <div class="demo-content">
        <button class="demo-btn" onClick$={() => count.value--}>
          --
        </button>
        <span class="demo-value">count = {count.value}</span>
        <button class="demo-btn" onClick$={() => count.value++}>
          ++
        </button>
      </div>
    </div>
  );
});

export const ToggleTheme = component$(() => {
  const isDark = useSignal(true);

  return (
    <div class="interactive-demo toggle-demo">
      <div class="demo-label">// Theme Toggle Component</div>
      <div class="demo-content">
        <button 
          class={`demo-toggle ${isDark.value ? 'dark' : 'light'}`}
          onClick$={() => isDark.value = !isDark.value}
        >
          <span class="toggle-icon">{isDark.value ? '🌙' : '☀️'}</span>
          <span class="toggle-text">theme: "{isDark.value ? 'dark' : 'light'}"</span>
        </button>
      </div>
    </div>
  );
});

export const TypeWriter = component$(() => {
  const text = useSignal('');
  const fullText = 'Hello, World!';
  const isTyping = useSignal(false);

  const startTyping = $(() => {
    if (isTyping.value) return;
    isTyping.value = true;
    text.value = '';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        text.value = fullText.slice(0, i + 1);
        i++;
      } else {
        clearInterval(interval);
        isTyping.value = false;
      }
    }, 100);
  });

  return (
    <div class="interactive-demo typewriter-demo">
      <div class="demo-label">// Typewriter Effect</div>
      <div class="demo-content">
        <code class="typewriter-output">
          &gt; {text.value}<span class="cursor">█</span>
        </code>
        <button class="demo-btn" onClick$={startTyping} disabled={isTyping.value}>
          {isTyping.value ? 'typing...' : 'run()'}
        </button>
      </div>
    </div>
  );
});

export const SignalDemo = component$(() => {
  const name = useSignal('developer');
  
  return (
    <div class="interactive-demo signal-demo">
      <div class="demo-label">// Qwik Signals - Fine-grained Reactivity</div>
      <div class="demo-content">
        <div class="signal-input">
          <span>const name = useSignal("</span>
          <input 
            type="text" 
            value={name.value}
            onInput$={(e) => name.value = (e.target as HTMLInputElement).value}
            placeholder="type here..."
          />
          <span>");</span>
        </div>
        <div class="signal-output">
          <span class="output-label">output:</span> Hello, <span class="highlight">{name.value}</span>!
        </div>
      </div>
    </div>
  );
});

