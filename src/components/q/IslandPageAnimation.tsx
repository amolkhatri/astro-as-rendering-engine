import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';

export const IslandPageAnimation = component$(() => {
  const interactedIsland = useSignal<string | null>(null);
  const hoveredSection = useSignal<string | null>(null);
  const showDetails = useSignal(false);
  const personalizedLoaded = useSignal(false);
  const isLoadingPersonalized = useSignal(true);

  // Simulate server island loading personalized content
  useVisibleTask$(() => {
    // Start loading after a short delay
    const loadTimer = setTimeout(() => {
      isLoadingPersonalized.value = true;
      
      // Simulate server fetching personalized data
      const dataTimer = setTimeout(() => {
        personalizedLoaded.value = true;
        isLoadingPersonalized.value = false;
      }, 1500);
      
      return () => clearTimeout(dataTimer);
    }, 800);
    
    return () => clearTimeout(loadTimer);
  });

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

  const resetDemo = $(() => {
    personalizedLoaded.value = false;
    isLoadingPersonalized.value = true;
    interactedIsland.value = null;
    
    // Restart the loading simulation
    setTimeout(() => {
      personalizedLoaded.value = true;
      isLoadingPersonalized.value = false;
    }, 1500);
  });

  return (
    <div class="island-page-anim">
      {/* Header */}
      <div class="ipa-header">
        <div class="ipa-title">
          <span class="ipa-icon">🏝️</span>
          <span class="ipa-label">PAGE STRUCTURE WITH ISLANDS</span>
        </div>
        <div class="ipa-controls">
          <button class="ipa-toggle" onClick$={resetDemo}>
            ↺ Replay
          </button>
          <button class="ipa-toggle" onClick$={toggleDetails}>
            {showDetails.value ? '◉ Hide Details' : '○ Show Details'}
          </button>
        </div>
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

            {/* Hero - Dynamic/Personalized (Server Island) */}
            <div 
              class={`page-section dynamic-section ${hoveredSection.value === 'hero' ? 'hovered' : ''} ${personalizedLoaded.value ? 'loaded' : ''}`}
              onMouseEnter$={() => handleHover('hero')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                {!personalizedLoaded.value ? (
                  <div class="hero-mock skeleton-container">
                    <div class="skeleton-greeting">
                      <div class="skeleton-line short"></div>
                    </div>
                    <div class="skeleton-subtitle">
                      <div class="skeleton-line medium"></div>
                    </div>
                    <div class="skeleton-stats">
                      <div class="skeleton-stat"></div>
                      <div class="skeleton-stat"></div>
                    </div>
                    <div class="loading-indicator">
                      <span class="loading-spinner"></span>
                      <span class="loading-text">Fetching user data from server...</span>
                    </div>
                  </div>
                ) : (
                  <div class="hero-mock loaded-content">
                    <div class="hero-greeting">Welcome back, <span class="user-name">Sarah!</span></div>
                    <div class="hero-subtitle">Here's what's new today</div>
                    <div class="hero-stats">
                      <span class="stat">📊 12 new updates</span>
                      <span class="stat">📬 3 messages</span>
                    </div>
                    <div class="server-rendered-badge">
                      <span class="server-icon">🖥️</span>
                      <span class="server-text">Server rendered — No client JS!</span>
                    </div>
                  </div>
                )}
              </div>
              <div class="section-badge dynamic-badge">
                <span class="badge-icon">👤</span>
                <span class="badge-text">SERVER ISLAND</span>
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

            {/* Recommendations - Server Island (Personalized) */}
            <div 
              class={`page-section dynamic-section ${hoveredSection.value === 'recs' ? 'hovered' : ''} ${personalizedLoaded.value ? 'loaded' : ''}`}
              onMouseEnter$={() => handleHover('recs')}
              onMouseLeave$={() => handleHover(null)}
            >
              <div class="section-content">
                <div class="recs-title">Recommended for you</div>
                {!personalizedLoaded.value ? (
                  <div class="recs-grid skeleton-container">
                    <div class="rec-card skeleton">
                      <div class="skeleton-image"></div>
                      <div class="skeleton-line short"></div>
                    </div>
                    <div class="rec-card skeleton">
                      <div class="skeleton-image"></div>
                      <div class="skeleton-line short"></div>
                    </div>
                    <div class="rec-card skeleton">
                      <div class="skeleton-image"></div>
                      <div class="skeleton-line short"></div>
                    </div>
                  </div>
                ) : (
                  <div class="recs-grid loaded-content">
                    <div class="rec-card">
                      <div class="rec-image">🎧</div>
                      <div class="rec-title">Podcast: Tech</div>
                    </div>
                    <div class="rec-card">
                      <div class="rec-image">📚</div>
                      <div class="rec-title">Your Reading List</div>
                    </div>
                    <div class="rec-card">
                      <div class="rec-image">⭐</div>
                      <div class="rec-title">Based on History</div>
                    </div>
                  </div>
                )}
              </div>
              <div class="section-badge dynamic-badge">
                <span class="badge-icon">👤</span>
                <span class="badge-text">SERVER ISLAND</span>
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
                <span class="info-title">SERVER ISLANDS</span>
              </div>
              <div class="info-content">
                <p>Server-rendered personalized content</p>
                <ul>
                  <li>✓ Shows skeleton first</li>
                  <li>✓ Server fetches user data</li>
                  <li>✓ Streams HTML to browser</li>
                  <li>✓ No client JS needed!</li>
                  <li>✓ Secure: data on server</li>
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
          <span class="summary-label">Static:</span>
          <span class="summary-value static-value">4 sections</span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">Server Islands:</span>
          <span class={`summary-value ${personalizedLoaded.value ? 'server-loaded' : 'server-loading'}`}>
            {personalizedLoaded.value ? '2 ✓' : '2 loading...'}
          </span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">Interactive:</span>
          <span class="summary-value island-value">2 islands</span>
        </div>
        <div class="summary-divider">|</div>
        <div class="summary-item">
          <span class="summary-label">Client JS:</span>
          <span class={`summary-value ${interactedIsland.value ? 'js-loaded' : 'js-zero'}`}>
            {interactedIsland.value === null && '0kb'}
            {interactedIsland.value === 'form' && '~8kb'}
            {interactedIsland.value === 'carousel' && '~5kb'}
          </span>
        </div>
      </div>

      {/* Key Insight */}
      <div class="ipa-insight">
        <div class="insight-icon">💡</div>
        <div class="insight-text">
          <strong>Key Insight:</strong> Static content renders instantly. 
          <span class="highlight">Server Islands</span> stream personalized content from the server (no client JS!). 
          <span class="highlight">Interactive Islands</span> load JavaScript only when users actually interact.
        </div>
      </div>
    </div>
  );
});

