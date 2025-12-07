import { component$, useSignal, useStore, $ } from '@builder.io/qwik';

interface Topic {
  id: string;
  title: string;
  icon: string;
  content: {
    heading: string;
    description: string;
    features: string[];
    codeExample?: string;
  };
}

const topics: Topic[] = [
  {
    id: 'intro',
    title: 'init --framework',
    icon: '>_',
    content: {
      heading: 'ASTRO.INIT // The Web Framework for Content',
      description:
        'Astro is an all-in-one web framework for building fast, content-focused websites. It ships zero JavaScript by default and uses a unique "Islands Architecture" to hydrate interactive components only when needed.',
      features: [
        'ship_js: false // Zero JavaScript by default',
        'hydration: "selective" // Component Islands architecture',
        'frameworks: ["react", "vue", "svelte", "qwik", "vanilla"]',
        'deploy: ["edge", "ssg", "ssr"] // Deploy anywhere',
        'optimize: { images: true, fonts: true, assets: true }',
      ],
    },
  },
  {
    id: 'islands',
    title: 'architecture.islands',
    icon: '◊',
    content: {
      heading: 'ISLANDS.ARCH // Partial Hydration Pattern',
      description:
        'Islands Architecture is a web architecture pattern that Astro pioneered. Instead of hydrating the entire page with JavaScript, only the interactive "islands" get hydrated while the rest remains as static HTML.',
      features: [
        'render: "static" + interactive_islands[]',
        'hydration: "independent" // Each island self-contained',
        'bundle_size: "minimal" // Dramatically reduced payload',
        'use_case: "content-heavy + selective interactivity"',
        'metrics: { LCP: "fast", FID: "instant", CLS: 0 }',
      ],
      codeExample: `---
// Static Astro component
import InteractiveCounter from './Counter.tsx';
---

<div>
  <h1>Static content - no JS!</h1>
  
  <!-- Only this component ships JavaScript -->
  <InteractiveCounter client:visible />
</div>`,
    },
  },
  {
    id: 'components',
    title: '.astro components',
    icon: '{ }',
    content: {
      heading: 'COMPONENTS.ASTRO // HTML-First Architecture',
      description:
        'Astro components (.astro files) are HTML-first components with a powerful templating syntax. They run at build time and produce zero JavaScript output by default.',
      features: [
        'syntax: "html-first" + frontmatter_logic',
        'render: "server-side" // SSR by default',
        'interface: { props, slots, expressions }',
        'styles: "scoped" // Built-in CSS isolation',
        'import: any_framework_component // Universal',
      ],
      codeExample: `---
// Frontmatter - runs at build time
const { title, items } = Astro.props;
const date = new Date().toLocaleDateString();
---

<article class="card">
  <h2>{title}</h2>
  <p>Published: {date}</p>
  <ul>
    {items.map((item) => <li>{item}</li>)}
  </ul>
</article>

<style>
  .card {
    padding: 1.5rem;
    border-radius: 8px;
  }
</style>`,
    },
  },
  {
    id: 'qwik',
    title: '@qwikdev/astro',
    icon: '⚡',
    content: {
      heading: 'QWIK.INTEGRATE // Resumable Framework',
      description:
        'Qwik is a resumable framework that brings instant interactivity with near-zero JavaScript. Combined with Astro, you get the best of both worlds: content-focused static pages with blazing-fast interactive islands.',
      features: [
        'mode: "resumable" // No hydration overhead',
        'handlers: "lazy-loaded" // On-demand JS',
        'reactivity: "signals" // Fine-grained updates',
        'state: "serializable" // Instant resume',
        'loading: "progressive" // Ship JS incrementally',
      ],
      codeExample: `import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <button onClick$={() => count.value++}>
      Count: {count.value}
    </button>
  );
});

// In Astro:
// <Counter client:visible />`,
    },
  },
  {
    id: 'routing',
    title: 'src/pages/**/*',
    icon: '/',
    content: {
      heading: 'ROUTER.FILE_SYSTEM // Convention over Config',
      description:
        'Astro uses a file-based routing system where the file structure in your src/pages directory determines your routes. Simple, intuitive, and powerful.',
      features: [
        'routes: auto_generate(file_structure)',
        'dynamic: "[param].astro" // URL parameters',
        'layouts: "_layout.astro" // Nested templates',
        'api: "*.ts" | "*.js" // REST endpoints',
        'catch_all: "[...slug].astro" // Wildcard routes',
      ],
      codeExample: `src/pages/
├── index.astro          → /
├── about.astro          → /about
├── blog/
│   ├── index.astro      → /blog
│   └── [slug].astro     → /blog/:slug
├── docs/
│   └── [...path].astro  → /docs/*
└── api/
    └── posts.ts         → /api/posts`,
    },
  },
  {
    id: 'performance',
    title: 'benchmark --perf',
    icon: '◉',
    content: {
      heading: 'PERF.OPTIMIZE // Built for Speed',
      description:
        'Astro was designed from the ground up for performance. With zero JS by default, automatic optimizations, and smart loading strategies, your sites are fast out of the box.',
      features: [
        'lighthouse: { performance: 100, accessibility: 100 }',
        'images: astro:assets // Auto-optimization',
        'css: { bundle: true, minify: true }',
        'navigation: "prefetch" // Instant page loads',
        'transitions: ViewTransitionsAPI // Native support',
      ],
    },
  },
];

export const Presentation = component$(() => {
  const selectedTopic = useSignal<string>('intro');
  const isAnimating = useSignal(false);

  const selectTopic = $((id: string) => {
    if (id !== selectedTopic.value) {
      isAnimating.value = true;
      setTimeout(() => {
        selectedTopic.value = id;
        isAnimating.value = false;
      }, 150);
    }
  });

  const currentTopic = topics.find((t) => t.id === selectedTopic.value) || topics[0];

  return (
    <div class="presentation">
      {/* Sidebar */}
      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="logo">▶</span>
          <h1>ASTRO</h1>
          <span class="subtitle">presentation.exe</span>
        </div>
        <nav class="topics-nav">
          {topics.map((topic) => (
            <button
              key={topic.id}
              class={`topic-btn ${selectedTopic.value === topic.id ? 'active' : ''}`}
              onClick$={() => selectTopic(topic.id)}
            >
              <span class="topic-icon">{topic.icon}</span>
              <span class="topic-title">{topic.title}</span>
              <span class="topic-arrow">_</span>
            </button>
          ))}
        </nav>
        <div class="sidebar-footer">
          <span class="made-with">astro@5.16 + qwik@1.x</span>
        </div>
      </aside>

      {/* Content Area */}
      <main class={`content ${isAnimating.value ? 'fade-out' : 'fade-in'}`}>
        <article class="slide">
          <header class="slide-header">
            <span class="slide-icon">{currentTopic.icon}</span>
            <h2 class="slide-title">{currentTopic.content.heading}</h2>
          </header>

          <p class="slide-description">{currentTopic.content.description}</p>

          <div class="features-grid">
            {currentTopic.content.features.map((feature, idx) => (
              <div key={idx} class="feature-card" style={`--delay: ${idx * 0.05}s`}>
                <span class="feature-number">{String(idx).padStart(2, '0')}</span>
                <p class="feature-text">{feature}</p>
              </div>
            ))}
          </div>

          {currentTopic.content.codeExample && (
            <div class="code-block">
              <div class="code-header">
                <span class="code-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span class="code-label">source.example</span>
              </div>
              <pre>
                <code>{currentTopic.content.codeExample}</code>
              </pre>
            </div>
          )}
        </article>

        <footer class="content-footer">
          <div class="pagination">
            {topics.map((topic, idx) => (
              <button
                key={topic.id}
                class={`page-dot ${selectedTopic.value === topic.id ? 'active' : ''}`}
                onClick$={() => selectTopic(topic.id)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div class="nav-hint">
            <kbd>select</kbd> module to execute
          </div>
        </footer>
      </main>
    </div>
  );
});

