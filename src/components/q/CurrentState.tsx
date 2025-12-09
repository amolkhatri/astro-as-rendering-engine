/** @jsxImportSource @builder.io/qwik */

import { component$, useSignal, $ } from '@builder.io/qwik';
import currentStateImage from '../../assets/current-state-cwv.png';
import attachedImage from '../../assets/Attached_image.png';

export const CurrentState = component$(() => {
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
    <div class="current-state-container">
      {/* Current State Images */}
      <div class="cwv-current-state">
        {/* <span class="cwv-current-state-label">Current State of the Metrics</span> */}
        <div class="cwv-images">
          <div class="cwv-image-card" onClick$={() => openModal(currentStateImage.src)}>
            <img src={currentStateImage.src} alt="Current CWV State" />
            <span class="image-label">📈 Current State</span>
          </div>
          <div class="cwv-image-card" onClick$={() => openModal(attachedImage.src)}>
            <img src={attachedImage.src} alt="Performance Dashboard" />
            <span class="image-label">📊 Dashboard</span>
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

export default CurrentState;
