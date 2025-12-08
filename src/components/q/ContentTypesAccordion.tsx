import { component$, useSignal, $ } from '@builder.io/qwik';

export const ContentTypesAccordion = component$(() => {
  const openItems = useSignal<Set<string>>(new Set());
  const hydratedIslands = useSignal<Set<string>>(new Set());
  const formName = useSignal('');
  const formMessage = useSignal('');
  const formSubmitted = useSignal(false);
  const carouselIndex = useSignal(0);

  const toggleItem = $((id: string) => {
    const newOpenItems = new Set(openItems.value);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    openItems.value = newOpenItems;
  });

  const hydrateIsland = $((id: string) => {
    if (!hydratedIslands.value.has(id)) {
      const newHydrated = new Set(hydratedIslands.value);
      newHydrated.add(id);
      hydratedIslands.value = newHydrated;
    }
  });

  const submitForm = $(() => {
    if (formName.value && formMessage.value) {
      formSubmitted.value = true;
      setTimeout(() => {
        formSubmitted.value = false;
        formName.value = '';
        formMessage.value = '';
      }, 2000);
    }
  });

  const nextSlide = $(() => {
    carouselIndex.value = (carouselIndex.value + 1) % 3;
  });

  const prevSlide = $(() => {
    carouselIndex.value = (carouselIndex.value - 1 + 3) % 3;
  });

  const goToSlide = $((idx: number) => {
    carouselIndex.value = idx;
  });

  const resetDemo = $(() => {
    hydratedIslands.value = new Set();
    formName.value = '';
    formMessage.value = '';
    formSubmitted.value = false;
    carouselIndex.value = 0;
  });

  return (
    <div class="content-types-accordion">
      <div class="accordion-label">// Content Types Examples</div>
      <div class="accordion-items">
        
        {/* Static Content */}
        <div class={`accordion-item ${openItems.value.has('static') ? 'open' : ''}`}>
          <button
            class="accordion-header"
            onClick$={() => toggleItem('static')}
            aria-expanded={openItems.value.has('static')}
          >
            <span class="accordion-icon">📄</span>
            <span class="accordion-title">Static Content</span>
            <span class="accordion-description">Renders INSTANTLY — pure HTML, JavaScript: ZERO</span>
            <span class="accordion-arrow">{openItems.value.has('static') ? '▼' : '▶'}</span>
          </button>
          {openItems.value.has('static') && (
            <div class="accordion-content">
              <div class="accordion-visual">
                {/* Navigation Mock */}
                <div class="visual-section static-visual">
                  <div class="visual-badge">
                    <span>📄</span> STATIC
                  </div>
                  <div class="nav-mock-accordion">
                    <span class="nav-logo-accordion">◆ LOGO</span>
                    <div class="nav-links-accordion">
                      <span>Home</span>
                      <span>About</span>
                      <span>Products</span>
                      <span>Contact</span>
                    </div>
                  </div>
                </div>

                {/* Content Grid Mock */}
                <div class="visual-section static-visual">
                  <div class="visual-badge">
                    <span>📄</span> STATIC
                  </div>
                  <div class="content-grid-accordion">
                    <div class="content-card-accordion">
                      <div class="card-image-accordion"></div>
                      <div class="card-title-accordion">Article Title</div>
                      <div class="card-desc-accordion">Static content...</div>
                    </div>
                    <div class="content-card-accordion">
                      <div class="card-image-accordion"></div>
                      <div class="card-title-accordion">Another Post</div>
                      <div class="card-desc-accordion">More static...</div>
                    </div>
                    <div class="content-card-accordion">
                      <div class="card-image-accordion"></div>
                      <div class="card-title-accordion">Third Item</div>
                      <div class="card-desc-accordion">Static HTML...</div>
                    </div>
                  </div>
                </div>

                {/* Footer Mock */}
                <div class="visual-section static-visual">
                  <div class="visual-badge">
                    <span>📄</span> STATIC
                  </div>
                  <div class="footer-mock-accordion">
                    <div class="footer-links-accordion">
                      <span>Privacy</span>
                      <span>Terms</span>
                      <span>Sitemap</span>
                    </div>
                    <div class="footer-copyright-accordion">© 2024 Company</div>
                  </div>
                </div>
              </div>
              <div class="accordion-info">
                <p>Headers, footers, navigation, articles — renders instantly with zero JavaScript.</p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Content */}
        <div class={`accordion-item ${openItems.value.has('dynamic') ? 'open' : ''}`}>
          <button
            class="accordion-header"
            onClick$={() => toggleItem('dynamic')}
            aria-expanded={openItems.value.has('dynamic')}
          >
            <span class="accordion-icon">🔄</span>
            <span class="accordion-title">Dynamic Content</span>
            <span class="accordion-description">Server streams content — no client JS</span>
            <span class="accordion-arrow">{openItems.value.has('dynamic') ? '▼' : '▶'}</span>
          </button>
          {openItems.value.has('dynamic') && (
            <div class="accordion-content">
              <div class="accordion-visual">
                {/* Dynamic Content Grid */}
                <div class="visual-section dynamic-visual">
                  <div class="visual-badge dynamic-badge-accordion">
                    <span>🔄</span> DYNAMIC
                  </div>
                  <div class="dynamic-content-accordion">
                    <div class="dynamic-title-accordion">Latest Products</div>
                    <div class="dynamic-grid-accordion">
                      <div class="dynamic-item-accordion">
                        <div class="dynamic-image-accordion">📦</div>
                        <div class="dynamic-name-accordion">Product A</div>
                        <div class="dynamic-price-accordion">$99.00</div>
                      </div>
                      <div class="dynamic-item-accordion">
                        <div class="dynamic-image-accordion">📦</div>
                        <div class="dynamic-name-accordion">Product B</div>
                        <div class="dynamic-price-accordion">$149.00</div>
                      </div>
                      <div class="dynamic-item-accordion">
                        <div class="dynamic-image-accordion">📦</div>
                        <div class="dynamic-name-accordion">Product C</div>
                        <div class="dynamic-price-accordion">$79.00</div>
                      </div>
                    </div>
                    <div class="server-badge-accordion">
                      <span>🖥️</span> Server rendered from database — No client JS!
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-info">
                <p>Product listings, news articles, search results — server fetches and renders at request time.</p>
              </div>
            </div>
          )}
        </div>

        {/* Personalized Content */}
        <div class={`accordion-item ${openItems.value.has('personal') ? 'open' : ''}`}>
          <button
            class="accordion-header"
            onClick$={() => toggleItem('personal')}
            aria-expanded={openItems.value.has('personal')}
          >
            <span class="accordion-icon">👤</span>
            <span class="accordion-title">Personalized Content</span>
            <span class="accordion-description">Server Islands — personalized without client JS</span>
            <span class="accordion-arrow">{openItems.value.has('personal') ? '▼' : '▶'}</span>
          </button>
          {openItems.value.has('personal') && (
            <div class="accordion-content">
              <div class="accordion-visual">
                {/* Hero Personalized Mock */}
                <div class="visual-section personal-visual">
                  <div class="visual-badge personal-badge-accordion">
                    <span>👤</span> SERVER ISLAND
                  </div>
                  <div class="hero-mock-accordion">
                    <div class="hero-greeting-accordion">Welcome back, <span class="user-name-accordion">Sarah!</span></div>
                    <div class="hero-subtitle-accordion">Here's what's new today</div>
                    <div class="hero-stats-accordion">
                      <span class="stat-accordion">📊 12 new updates</span>
                      <span class="stat-accordion">📬 3 messages</span>
                    </div>
                    <div class="server-badge-accordion personal">
                      <span>🖥️</span> Server rendered — No client JS!
                    </div>
                  </div>
                </div>

                {/* Recommendations Mock */}
                <div class="visual-section personal-visual">
                  <div class="visual-badge personal-badge-accordion">
                    <span>👤</span> SERVER ISLAND
                  </div>
                  <div class="recs-mock-accordion">
                    <div class="recs-title-accordion">Recommended for you</div>
                    <div class="recs-grid-accordion">
                      <div class="rec-card-accordion">
                        <div class="rec-image-accordion">🎧</div>
                        <div class="rec-title-item-accordion">Podcast: Tech</div>
                      </div>
                      <div class="rec-card-accordion">
                        <div class="rec-image-accordion">📚</div>
                        <div class="rec-title-item-accordion">Your Reading List</div>
                      </div>
                      <div class="rec-card-accordion">
                        <div class="rec-image-accordion">⭐</div>
                        <div class="rec-title-item-accordion">Based on History</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-info">
                <p>User greetings, personalized recommendations — server streams HTML with skeleton loading.</p>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Content */}
        <div class={`accordion-item ${openItems.value.has('interactive') ? 'open' : ''}`}>
          <button
            class="accordion-header"
            onClick$={() => toggleItem('interactive')}
            aria-expanded={openItems.value.has('interactive')}
          >
            <span class="accordion-icon">🏝️</span>
            <span class="accordion-title">Interactive Content</span>
            <span class="accordion-description">JavaScript loads ONLY when user interacts (~5-15kb)</span>
            <span class="accordion-arrow">{openItems.value.has('interactive') ? '▼' : '▶'}</span>
          </button>
          {openItems.value.has('interactive') && (
            <div class="accordion-content">
              <div class="accordion-visual">
                {/* Interactive Form */}
                <div 
                  class={`visual-section interactive-visual ${hydratedIslands.value.has('form') ? 'hydrated' : ''}`}
                  onClick$={() => hydrateIsland('form')}
                >
                  <div class="visual-badge interactive-badge-accordion">
                    <span>🏝️</span> INTERACTIVE
                  </div>
                  <div class="form-mock-accordion">
                    <div class="form-title-accordion">Contact Us</div>
                    {!hydratedIslands.value.has('form') ? (
                      <>
                        <div class="form-field-accordion">
                          <span class="field-label-accordion">Name</span>
                          <div class="field-input-accordion"></div>
                        </div>
                        <div class="form-field-accordion">
                          <span class="field-label-accordion">Message</span>
                          <div class="field-textarea-accordion"></div>
                        </div>
                        <div class="form-button-accordion">Send</div>
                      </>
                    ) : (
                      <>
                        <div class="form-field-accordion">
                          <span class="field-label-accordion">Name</span>
                          <input 
                            type="text" 
                            class="field-input-real"
                            placeholder="Enter your name..."
                            value={formName.value}
                            onInput$={(e) => formName.value = (e.target as HTMLInputElement).value}
                          />
                        </div>
                        <div class="form-field-accordion">
                          <span class="field-label-accordion">Message</span>
                          <textarea 
                            class="field-textarea-real"
                            placeholder="Type your message..."
                            value={formMessage.value}
                            onInput$={(e) => formMessage.value = (e.target as HTMLTextAreaElement).value}
                          ></textarea>
                        </div>
                        <button 
                          class={`form-button-real ${formSubmitted.value ? 'submitted' : ''}`}
                          onClick$={submitForm}
                          disabled={formSubmitted.value}
                        >
                          {formSubmitted.value ? '✓ Sent!' : 'Send'}
                        </button>
                      </>
                    )}
                  </div>
                  {!hydratedIslands.value.has('form') ? (
                    <div class="hydration-hint-accordion">
                      <span>👆</span> Click to hydrate — JS loads on-demand (~8kb)
                    </div>
                  ) : (
                    <div class="hydrated-indicator-accordion">
                      <span>⚡</span> Hydrated! JS Loaded (~8kb) — Form is now interactive
                    </div>
                  )}
                </div>

                {/* Interactive Carousel */}
                <div 
                  class={`visual-section interactive-visual ${hydratedIslands.value.has('carousel') ? 'hydrated' : ''}`}
                  onClick$={() => hydrateIsland('carousel')}
                >
                  <div class="visual-badge interactive-badge-accordion">
                    <span>🏝️</span> INTERACTIVE
                  </div>
                  <div class="carousel-mock-accordion">
                    <button 
                      class={`carousel-arrow-accordion ${hydratedIslands.value.has('carousel') ? 'active' : ''}`}
                      onClick$={(e) => {
                        e.stopPropagation();
                        if (hydratedIslands.value.has('carousel')) prevSlide();
                      }}
                      disabled={!hydratedIslands.value.has('carousel')}
                    >
                      ‹
                    </button>
                    <div class="carousel-slides-accordion">
                      <div class={`carousel-slide-accordion ${carouselIndex.value === 0 ? 'active' : ''}`}>
                        {hydratedIslands.value.has('carousel') && <span class="slide-label">Slide 1</span>}
                      </div>
                      <div class={`carousel-slide-accordion ${carouselIndex.value === 1 ? 'active' : ''}`}>
                        {hydratedIslands.value.has('carousel') && <span class="slide-label">Slide 2</span>}
                      </div>
                      <div class={`carousel-slide-accordion ${carouselIndex.value === 2 ? 'active' : ''}`}>
                        {hydratedIslands.value.has('carousel') && <span class="slide-label">Slide 3</span>}
                      </div>
                    </div>
                    <button 
                      class={`carousel-arrow-accordion ${hydratedIslands.value.has('carousel') ? 'active' : ''}`}
                      onClick$={(e) => {
                        e.stopPropagation();
                        if (hydratedIslands.value.has('carousel')) nextSlide();
                      }}
                      disabled={!hydratedIslands.value.has('carousel')}
                    >
                      ›
                    </button>
                  </div>
                  <div class="carousel-dots-accordion">
                    {[0, 1, 2].map((idx) => (
                      <button 
                        key={idx}
                        class={`carousel-dot-accordion ${carouselIndex.value === idx ? 'active' : ''}`}
                        onClick$={(e) => {
                          e.stopPropagation();
                          if (hydratedIslands.value.has('carousel')) goToSlide(idx);
                        }}
                        disabled={!hydratedIslands.value.has('carousel')}
                      />
                    ))}
                  </div>
                  {!hydratedIslands.value.has('carousel') ? (
                    <div class="hydration-hint-accordion">
                      <span>👆</span> Click to hydrate — JS loads on-demand (~5kb)
                    </div>
                  ) : (
                    <div class="hydrated-indicator-accordion">
                      <span>⚡</span> Hydrated! JS Loaded (~5kb) — Use arrows or dots to navigate
                    </div>
                  )}
                </div>

                {/* Reset Button */}
                {(hydratedIslands.value.has('form') || hydratedIslands.value.has('carousel')) && (
                  <button class="reset-demo-btn" onClick$={resetDemo}>
                    ↺ Reset Demo
                  </button>
                )}
              </div>
              <div class="accordion-info">
                <p>Forms, carousels, modals — renders as HTML initially, JavaScript loads only when user interacts. <strong>Try clicking the components above!</strong></p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
});
