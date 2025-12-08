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
    images?: { src: string; caption: string }[];
  };
}

const topics: Topic[] = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: '🚀',
    content: {
      heading: 'Astro: The Web Framework for Content-Driven Websites',
      description:
        'Astro is a modern web framework designed for building fast, content-focused websites. It delivers exceptional performance by shipping zero JavaScript by default and using a unique "Islands Architecture" to load interactive components only when needed.',
      features: [
        'Ships zero JavaScript by default for lightning-fast page loads',
        'Islands Architecture enables selective component hydration',
        'Framework agnostic — works with React, Vue, Svelte, and more',
        'Flexible deployment: Static, Server-Side, or Edge rendering',
        'Built-in optimization for images, fonts, and assets',
      ],
    },
  },
  {
    id: 'islands',
    title: 'Islands Architecture',
    icon: '🏝️',
    content: {
      heading: 'Islands Architecture: Smarter Hydration for Better Performance',
      description:
        'Islands Architecture is a revolutionary web pattern pioneered by Astro. Instead of loading JavaScript for the entire page, only the interactive "islands" receive JavaScript while the rest remains as fast, static HTML.',
      features: [
        'Static HTML with targeted interactive components',
        'Each island loads independently — no blocking',
        'Dramatically smaller JavaScript bundles',
        'Ideal for content-heavy sites with selective interactivity',
        'Excellent Core Web Vitals: Fast LCP, Instant FID, Zero CLS',
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
    title: 'Astro Components',
    icon: '🧩',
    content: {
      heading: 'Astro Components: HTML-First Development',
      description:
        'Astro components (.astro files) put HTML first with a powerful templating syntax. They run at build time and produce zero JavaScript output by default, resulting in faster websites.',
      features: [
        'HTML-first syntax that feels familiar and intuitive',
        'Server-side rendering by default for optimal performance',
        'Clean component interface with props and slots',
        'Built-in scoped CSS — no style conflicts',
        'Import components from any framework seamlessly',
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
    title: 'Qwik Integration',
    icon: '⚡',
    content: {
      heading: 'Qwik + Astro: Instant Interactivity at Scale',
      description:
        'Qwik is a resumable framework that delivers instant interactivity with near-zero JavaScript overhead. Combined with Astro, you get the perfect blend of content-focused static pages with blazing-fast interactive islands.',
      features: [
        'Resumable execution — no hydration performance penalty',
        'Event handlers load on-demand, not upfront',
        'Fine-grained reactivity through signals',
        'Serializable state for instant page resume',
        'Progressive JavaScript loading as needed',
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
    title: 'File-Based Routing',
    icon: '📁',
    content: {
      heading: 'Intuitive File-Based Routing',
      description:
        'Astro uses a file-based routing system where your folder structure in src/pages automatically becomes your URL structure. Simple, intuitive, and zero configuration required.',
      features: [
        'Routes automatically generated from file structure',
        'Dynamic routes with URL parameters',
        'Nested layouts for consistent page structure',
        'API endpoints with TypeScript support',
        'Catch-all routes for flexible URL handling',
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
    title: 'Performance',
    icon: '📊',
    content: {
      heading: 'Built for Performance from Day One',
      description:
        'Astro was designed from the ground up for exceptional performance. With zero JavaScript by default, automatic optimizations, and smart loading strategies, your websites are fast without any extra work.',
      features: [
        'Achieves 100 Lighthouse performance score out of the box',
        'Automatic image optimization with modern formats',
        'CSS bundling and minification included',
        'Intelligent prefetching for instant navigation',
        'Native View Transitions API support for smooth UX',
      ],
    },
  },
  {
    id: 'studies',
    title: 'Performance Studies',
    icon: '📈',
    content: {
      heading: 'Real-World Performance Metrics',
      description: 'Benchmarks and studies showing how Astro outperforms traditional frameworks in key metrics like Core Web Vitals, Bundle Size, and Time to Interactive.',
      features: [
        'Consistently higher Core Web Vitals scores',
        'Significantly reduced JavaScript bundle sizes',
        'Faster Time to Interactive (TTI)',
        'Better SEO performance',
      ],
      images: [
        { src: 'https://placehold.co/600x400/111827/f59e0b?text=Core+Web+Vitals', caption: 'Core Web Vitals Benchmark' },
        { src: 'https://placehold.co/600x400/111827/f59e0b?text=JS+Bundle+Size', caption: 'JavaScript Bundle Size Comparison' },
        { src: 'https://placehold.co/600x400/111827/f59e0b?text=Time+to+Interactive', caption: 'Time to Interactive (TTI) Metrics' },
        { src: 'https://placehold.co/600x400/111827/f59e0b?text=Lighthouse+Scores', caption: 'Real-world Lighthouse Scores' },
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
          <span class="logo">✦</span>
          <h1>Astro Framework</h1>
          <span class="subtitle">Product Overview</span>
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
              <span class="topic-arrow">→</span>
            </button>
          ))}
        </nav>
        <div class="sidebar-footer">
          <span class="made-with">Built with Astro 5.x & Qwik</span>
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

          {currentTopic.content.images && (
            <div class="studies-grid">
              {currentTopic.content.images.map((img, idx) => (
                <div key={idx} class="study-card">
                  <img src={img.src} alt={img.caption} width={600} height={400} />
                  <p>{img.caption}</p>
                </div>
              ))}
            </div>
          )}

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
            <kbd>Click</kbd> to navigate between topics
          </div>
        </footer>
      </main>
    </div>
  );
});

