import { component$, useSignal, $ } from '@builder.io/qwik';

export const IslandPageAnimation = component$(() => {
  const interactedIsland = useSignal<string | null>(null);
  const hoveredSection = useSignal<string | null>(null);
  const showDetails = useSignal(false);

  const handleIslandClick = $((islandId: string) => {
    if (interactedIsland.value === islandId) {
      interactedIsland.value = null;
    } else {
      interactedIsland.value = islandId;
    }
  });

  const handleHover = $((sectionId: string | null) => {
    hoveredSection.value = sectionId;
  });

  const toggleDetails = $(() => {
    showDetails.value = !showDetails.value;
  });

  return (
    <div class="island-page-anim">
      {/* Header */}
      <div class="ipa-header">
        <div class="ipa-title">
          <span class="ipa-icon">🏝️</span>
          <span class="ipa-label">PAGE STRUCTURE WITH ISLANDS</span>
        </div>
        <button class="ipa-toggle" onClick$={toggleDetails}>
          {showDetails.value ? '◉ Hide Details' : '○ Show Details'}
        </button>
      </div>

      <div class="ipa-layout">
        {/* Browser Mock */}
        <div class="ipa-browser">
          <div class="browser-chrome">
            <div class="browser-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="browser-url">
              <span class="url-icon">🔒</span>
              <span class="url-text">https://mysite.com/dashboard</span>
            </div>
          </div>
          
          <div class="browser-viewport">
            {/* Navigation - Static */}
            <div 
              class={`page-section static-section ${hoveredSection.value === 'nav' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('nav')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                <div class="nav-mock">
                  <span class="nav-logo">◆ LOGO</span>
                  <div class="nav-links">
                    <span>Home</span>
                    <span>About</span>
                    <span>Products</span>
                    <span>Contact</span>
                  </div>
                </div>
              </div>
              <div class="section-badge static-badge">
                <span class="badge-icon">📄</span>
                <span class="badge-text">STATIC</span>
              </div>
            </div>

            {/* Hero - Dynamic/Personalized */}
            <div 
              class={`page-section dynamic-section ${hoveredSection.value === 'hero' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('hero')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                <div class="hero-mock">
                  <div class="hero-greeting">Welcome back, <span class="user-name">Sarah!</span></div>
                  <div class="hero-subtitle">Here's what's new today</div>
                  <div class="hero-stats">
                    <span class="stat">📊 12 new updates</span>
                    <span class="stat">📬 3 messages</span>
                  </div>
                </div>
              </div>
              <div class="section-badge dynamic-badge">
                <span class="badge-icon">👤</span>
                <span class="badge-text">PERSONALIZED</span>
              </div>
            </div>

            {/* Content Grid - Static */}
            <div 
              class={`page-section static-section ${hoveredSection.value === 'content' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('content')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                <div class="content-grid">
                  <div class="content-card">
                    <div class="card-image"></div>
                    <div class="card-title">Article Title</div>
                    <div class="card-desc">Static content...</div>
                  </div>
                  <div class="content-card">
                    <div class="card-image"></div>
                    <div class="card-title">Another Post</div>
                    <div class="card-desc">More static...</div>
                  </div>
                  <div class="content-card">
                    <div class="card-image"></div>
                    <div class="card-title">Third Item</div>
                    <div class="card-desc">Static HTML...</div>
                  </div>
                </div>
              </div>
              <div class="section-badge static-badge">
                <span class="badge-icon">📄</span>
                <span class="badge-text">STATIC</span>
              </div>
            </div>

            {/* Interactive Island - Contact Form */}
            <div 
              class={`page-section island-section ${interactedIsland.value === 'form' ? 'hydrated' : ''} ${hoveredSection.value === 'form' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('form')}
              onMouseLeave$={() => handleHover(null)}
              onClick$={() => handleIslandClick('form')}
            >
              <div class="section-content">
                <div class="form-mock">
                  <div class="form-title">Contact Us</div>
                  <div class="form-field">
                    <span class="field-label">Name</span>
                    <div class="field-input"></div>
                  </div>
                  <div class="form-field">
                    <span class="field-label">Message</span>
                    <div class="field-textarea"></div>
                  </div>
                  <div class="form-button">
                    {interactedIsland.value === 'form' ? '✓ Send' : 'Send'}
                  </div>
                </div>
              </div>
              <div class="section-badge island-badge">
                <span class="badge-icon">🏝️</span>
                <span class="badge-text">INTERACTIVE</span>
              </div>
              {interactedIsland.value !== 'form' && (
                <div class="island-hint">👆 Click to hydrate</div>
              )}
              {interactedIsland.value === 'form' && (
                <div class="hydrated-indicator">
                  <span class="hydrated-icon">⚡</span>
                  <span class="hydrated-text">JS Loaded (~8kb)</span>
                </div>
              )}
            </div>

            {/* Interactive Island - Image Carousel */}
            <div 
              class={`page-section island-section ${interactedIsland.value === 'carousel' ? 'hydrated' : ''} ${hoveredSection.value === 'carousel' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('carousel')}
              onMouseLeave$={() => handleHover(null)}
              onClick$={() => handleIslandClick('carousel')}
            >
              <div class="section-content">
                <div class="carousel-mock">
                  <div class="carousel-arrow left">‹</div>
                  <div class="carousel-slides">
                    <div class="carousel-slide active"></div>
                    <div class="carousel-slide"></div>
                    <div class="carousel-slide"></div>
                  </div>
                  <div class="carousel-arrow right">›</div>
                  <div class="carousel-dots">
                    <span class="carousel-dot active"></span>
                    <span class="carousel-dot"></span>
                    <span class="carousel-dot"></span>
                  </div>
                </div>
              </div>
              <div class="section-badge island-badge">
                <span class="badge-icon">🏝️</span>
                <span class="badge-text">INTERACTIVE</span>
              </div>
              {interactedIsland.value !== 'carousel' && (
                <div class="island-hint">👆 Click to hydrate</div>
              )}
              {interactedIsland.value === 'carousel' && (
                <div class="hydrated-indicator">
                  <span class="hydrated-icon">⚡</span>
                  <span class="hydrated-text">JS Loaded (~5kb)</span>
                </div>
              )}
            </div>

            {/* Footer - Static */}
            <div 
              class={`page-section static-section ${hoveredSection.value === 'footer' ? 'hovered' : ''}`}
              onMouseEnter$={() => handleHover('footer')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                <div class="footer-mock">
                  <div class="footer-links">
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Sitemap</span>
                  </div>
                  <div class="footer-copyright">© 2024 Company</div>
                </div>
              </div>
              <div class="section-badge static-badge">
                <span class="badge-icon">📄</span>
                <span class="badge-text">STATIC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showDetails.value && (
          <div class="ipa-info-panel">
            <div class="info-section">
              <div class="info-header static-header">
                <span class="info-icon">📄</span>
                <span class="info-title">STATIC CONTENT</span>
              </div>
              <div class="info-content">
                <p>Pure HTML, no JavaScript needed</p>
                <ul>
                  <li>✓ Renders instantly</li>
                  <li>✓ Zero JS bundle</li>
                  <li>✓ CDN cacheable</li>
                  <li>✓ SEO friendly</li>
                </ul>
              </div>
            </div>

            <div class="info-section">
              <div class="info-header dynamic-header">
                <span class="info-icon">👤</span>
                <span class="info-title">DYNAMIC / PERSONALIZED</span>
              </div>
              <div class="info-content">
                <p>Server-rendered at request time</p>
                <ul>
                  <li>✓ User-specific data</li>
                  <li>✓ No client JS needed</li>
                  <li>✓ Data stays on server</li>
                  <li>✓ SEO friendly</li>
                </ul>
              </div>
            </div>

            <div class="info-section">
              <div class="info-header island-header">
                <span class="info-icon">🏝️</span>
                <span class="info-title">INTERACTIVE ISLANDS</span>
              </div>
              <div class="info-content">
                <p>JS loads only on interaction</p>
                <ul>
                  <li>✓ Zero upfront JS cost</li>
                  <li>✓ Hydrates on demand</li>
                  <li>✓ Small bundles (~5-15kb)</li>
                  <li>✓ Independent loading</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* JS Summary */}
      <div class="ipa-summary">
        <div class="summary-item">
          <span class="summary-label">Static HTML:</span>
          <span class="summary-value static-value">6 sections</span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">Islands:</span>
          <span class="summary-value island-value">2 components</span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">JS Loaded:</span>
          <span class={`summary-value ${interactedIsland.value ? 'js-loaded' : 'js-zero'}`}>
            {interactedIsland.value === null && '0kb'}
            {interactedIsland.value === 'form' && '~8kb'}
            {interactedIsland.value === 'carousel' && '~5kb'}
          </span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">Traditional SPA:</span>
          <span class="summary-value spa-value">~2-5MB</span>
        </div>
      </div>

      {/* Key Insight */}
      <div class="ipa-insight">
        <div class="insight-icon">💡</div>
        <div class="insight-text">
          <strong>Key Insight:</strong> JavaScript is only downloaded when users actually interact with an island. 
          The page is fully visible and usable with <span class="highlight">zero JavaScript</span> initially loaded.
        </div>
      </div>
    </div>
  );
});

