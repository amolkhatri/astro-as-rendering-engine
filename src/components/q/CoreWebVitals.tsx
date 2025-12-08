/** @jsxImportSource @builder.io/qwik */

import { component$, useSignal, $ } from '@builder.io/qwik';
import currentStateImage from '../../assets/current-state-cwv.png';
import attachedImage from '../../assets/Attached_image.png';

export const CoreWebVitals = component$(() => {
  const isModalOpen = useSignal(false);
  const modalSrc = useSignal<string | null>(null);

  const openModal = $((src: string) => {
    modalSrc.value = src;
    isModalOpen.value = true;
  });

  const closeModal = $(() => {
    isModalOpen.value = false;
    modalSrc.value = null;
  });

  const stopPropagation = $((ev: Event) => {
    ev.stopPropagation();
  });

  return (
    <div class="cwv-simple">
      <div class="metrics-row">
        {/* LCP Box */}
        <div class="metric-box" style={{ borderLeftColor: '#10b981' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#10b981' }}>LCP</span>
            <span class="metric-fullname">Largest Contentful Paint</span>
          </div>
          
          <p class="metric-explanation">
            Time until the largest visible content (image, video, or text block) is fully rendered on screen.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">Server Response Time</span>
              <span class="impact-tag">JavaScript Execution</span>
            </div>
          </div>
        </div>

        {/* INP Box */}
        <div class="metric-box" style={{ borderLeftColor: '#f59e0b' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#f59e0b' }}>INP</span>
            <span class="metric-fullname">Interaction to Next Paint</span>
          </div>
          
          <p class="metric-explanation">
            How quickly the page responds to user interactions like clicks, taps, and keyboard input.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">JavaScript Execution</span>
              <span class="impact-tag">Server Response Time</span>
            </div>
          </div>
        </div>

        {/* CLS Box */}
        <div class="metric-box" style={{ borderLeftColor: '#8b5cf6' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#8b5cf6' }}>CLS</span>
            <span class="metric-fullname">Cumulative Layout Shift</span>
          </div>
          
          <p class="metric-explanation">
            How much content unexpectedly shifts during page load (e.g., buttons moving as images load).
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">JavaScript Execution</span>
              <span class="impact-tag">Server Response Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics Section */}
      <div class="additional-metrics-section">
        <h3 class="additional-metrics-label">Additional Important Performance Metrics</h3>
        <div class="metrics-row additional-metrics">
        {/* TTFB Box */}
        <div class="metric-box" style={{ borderLeftColor: '#ec4899' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#ec4899' }}>TTFB</span>
            <span class="metric-fullname">Time to First Byte</span>
          </div>
          
          <p class="metric-explanation">
            Time from request start until the first byte of response arrives from the server.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">Server Response Time</span>
              <span class="impact-tag">JavaScript Execution</span>
            </div>
          </div>
        </div>

        {/* FCP Box */}
        <div class="metric-box" style={{ borderLeftColor: '#06b6d4' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#06b6d4' }}>FCP</span>
            <span class="metric-fullname">First Contentful Paint</span>
          </div>
          
          <p class="metric-explanation">
            Time until the first piece of content (text, image, or canvas) is rendered on screen.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">Server Response Time</span>
              <span class="impact-tag">JavaScript Execution</span>
            </div>
          </div>
        </div>

        {/* Speed Index Box */}
        <div class="metric-box" style={{ borderLeftColor: '#f97316' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#f97316' }}>Speed Index</span>
            <span class="metric-fullname">Speed Index</span>
          </div>
          
          <p class="metric-explanation">
            Measures how quickly content is visually displayed during page load.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">Server Response Time</span>
              <span class="impact-tag">JavaScript Execution</span>
            </div>
          </div>
        </div>

        {/* TBT Box */}
        <div class="metric-box" style={{ borderLeftColor: '#ef4444' }}>
          <div class="metric-box-header">
            <span class="metric-name" style={{ color: '#ef4444' }}>TBT</span>
            <span class="metric-fullname">Total Blocking Time</span>
          </div>
          
          <p class="metric-explanation">
            Sum of all time periods where the main thread was blocked for more than 50ms during page load.
          </p>

          <div class="metric-impacts">
            <span class="impacts-label">Impacted by:</span>
            <div class="impact-tags">
              <span class="impact-tag">JavaScript Execution</span>
              <span class="impact-tag">Server Response Time</span>
            </div>
          </div>

        </div>
      </div>
      </div>

      {/* Current Performance Metrics State Section */}
      <div class="current-state-section">
        <h3 class="current-state-title">Current Performance Metrics State</h3>
        
        <div class="current-state-images-container">
          {/* Current State Image */}
          <div class="current-state-image-section">
            <button class="image-zoom-button" onClick$={() => openModal(currentStateImage.src)}>
              <img
                src={currentStateImage.src}
                alt="Current State of Core Web Vitals Performance Metrics"
                class="current-state-image"
              />
              <span class="zoom-hint">Click to zoom</span>
            </button>
          </div>

          {/* Attached Image */}
          <div class="current-state-image-section">
            <button class="image-zoom-button" onClick$={() => openModal(attachedImage.src)}>
              <img
                src={attachedImage.src}
                alt="Performance Metrics Dashboard"
                class="current-state-image"
              />
              <span class="zoom-hint">Click to zoom</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen.value && modalSrc.value && (
        <div class="image-modal-backdrop" onClick$={closeModal}>
          <div class="image-modal" onClick$={stopPropagation}>
            <button class="image-modal-close" onClick$={closeModal}>✕</button>
            <img src={modalSrc.value} alt="Zoomed performance metric" />
          </div>
        </div>
      )}
    </div>
  );
});

export default CoreWebVitals;
