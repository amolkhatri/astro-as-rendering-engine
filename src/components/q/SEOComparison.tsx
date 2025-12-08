/** @jsxImportSource @builder.io/qwik */

import { component$, useSignal, $, useStore } from '@builder.io/qwik';

export const SEOComparison = component$(() => {
  const activeView = useSignal<'both' | 'bot' | 'user'>('both');
  const isAnimating = useSignal(false);
  
  const simulateLoad = $(() => {
    isAnimating.value = true;
    setTimeout(() => {
      isAnimating.value = false;
    }, 2000);
  });

  return (
    <div class="seo-comparison">
      <div class="seo-header">
        <div class="seo-title">
          {/* <span class="seo-icon">🔍</span> */}
          {/* <span class="seo-label">SEO: BOT vs USER VIEW</span> */}
        </div>
        <div class="seo-tabs">
          <button 
            class={`seo-tab ${activeView.value === 'both' ? 'active' : ''}`}
            onClick$={() => activeView.value = 'both'}
          >
            Side by Side
          </button>
          <button 
            class={`seo-tab ${activeView.value === 'bot' ? 'active' : ''}`}
            onClick$={() => activeView.value = 'bot'}
          >
            🤖 Bot View
          </button>
          <button 
            class={`seo-tab ${activeView.value === 'user' ? 'active' : ''}`}
            onClick$={() => activeView.value = 'user'}
          >
            👤 User View
          </button>
        </div>
      </div>

      <div class={`seo-content ${activeView.value}`}>
        {/* Bot View - What Search Engines See */}
        {(activeView.value === 'both' || activeView.value === 'bot') && (
          <div class="view-panel bot-panel">
            <div class="panel-header bot-header">
              <span class="panel-icon">🤖</span>
              <span class="panel-title">Googlebot / Search Crawler</span>
              <span class="panel-badge bot-badge">HTML Only</span>
            </div>
            
            <div class="browser-frame">
              <div class="browser-bar">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-url">
                  <span class="url-lock">🔒</span>
                  <span>example.com/products</span>
                </div>
              </div>
              
              <div class="page-view bot-page">
                <div class="page-header-mock">
                  <div class="logo-skeleton"></div>
                  <div class="nav-skeleton">
                    <div class="nav-item-skeleton"></div>
                    <div class="nav-item-skeleton"></div>
                    <div class="nav-item-skeleton"></div>
                  </div>
                </div>
                
                <div class="page-body">
                  <div class="empty-state">
                    <div class="spinner-icon">⏳</div>
                    <code class="raw-html">
                      {'<div id="root"></div>'}
                    </code>
                    <span class="empty-text">Waiting for JavaScript...</span>
                  </div>
                  
                  <div class="no-content-message">
                    <span class="warn-icon">⚠️</span>
                    <span>No indexable content found!</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="view-info bot-info">
              <div class="info-row">
                <span class="info-label">Content:</span>
                <span class="info-value bad">Empty div tag only</span>
              </div>
              <div class="info-row">
                <span class="info-label">SEO Score:</span>
                <span class="info-value bad">❌ Poor</span>
              </div>
              <div class="info-row">
                <span class="info-label">Indexable:</span>
                <span class="info-value bad">0 products</span>
              </div>
            </div>
          </div>
        )}

        {/* User View - What Users See After JS */}
        {(activeView.value === 'both' || activeView.value === 'user') && (
          <div class="view-panel user-panel">
            <div class="panel-header user-header">
              <span class="panel-icon">👤</span>
              <span class="panel-title">Organic User (Browser)</span>
              <span class="panel-badge user-badge">JS Executed</span>
            </div>
            
            <div class="browser-frame">
              <div class="browser-bar">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="browser-url">
                  <span class="url-lock">🔒</span>
                  <span>example.com/products</span>
                </div>
              </div>
              
              <div class="page-view user-page">
                <div class="page-header-mock user-header-mock">
                  <div class="logo-full">🏪 ShopNow</div>
                  <div class="nav-full">
                    <span>Home</span>
                    <span>Products</span>
                    <span>Cart (3)</span>
                  </div>
                </div>
                
                <div class="page-body">
                  <h3 class="page-title">Featured Products</h3>
                  
                  <div class="products-grid">
                    <div class="product-card">
                      <div class="product-image">📱</div>
                      <div class="product-name">iPhone 15 Pro</div>
                      <div class="product-price">$999</div>
                    </div>
                    <div class="product-card">
                      <div class="product-image">💻</div>
                      <div class="product-name">MacBook Air</div>
                      <div class="product-price">$1,299</div>
                    </div>
                    <div class="product-card">
                      <div class="product-image">⌚</div>
                      <div class="product-name">Apple Watch</div>
                      <div class="product-price">$399</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="view-info user-info">
              <div class="info-row">
                <span class="info-label">Content:</span>
                <span class="info-value good">Rich product data</span>
              </div>
              <div class="info-row">
                <span class="info-label">SEO Score:</span>
                <span class="info-value good">✅ Excellent</span>
              </div>
              <div class="info-row">
                <span class="info-label">Indexable:</span>
                <span class="info-value good">3 products</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      {/* <div class="seo-explanation">
        <div class="explanation-title">
          <span class="exp-icon">💡</span>
          <span>The Problem with Client-Side Rendering (SPA)</span>
        </div>
        <div class="explanation-content">
          <div class="explanation-point">
            <span class="point-num">1</span>
            <span class="point-text">
              <strong>Bot receives:</strong> Empty HTML with {`<div id="root"></div>`}
            </span>
          </div>
          <div class="explanation-point">
            <span class="point-num">2</span>
            <span class="point-text">
              <strong>Bot cannot execute JS</strong> (or has limited JS rendering budget)
            </span>
          </div>
          <div class="explanation-point">
            <span class="point-num">3</span>
            <span class="point-text">
              <strong>Result:</strong> Content not indexed → Poor search rankings
            </span>
          </div>
        </div>
        
        <div class="solution-highlight">
          <span class="solution-icon">✨</span>
          <span class="solution-text">
            <strong>Astro's Solution:</strong> Server-Side Rendering sends complete HTML, 
            so both bots AND users see the same content immediately!
          </span>
        </div>
      </div> */}
    </div>
  );
});

export default SEOComparison;

