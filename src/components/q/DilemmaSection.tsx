import { component$ } from '@builder.io/qwik';

export const DilemmaSection = component$(() => {
  return (
    <div class="dilemma-section">
      <div class="dilemma-title">❌ THE DILEMMA</div>
      <div class="dilemma-content">
        <div class="lost-feature">
          <span class="lost-icon">👤</span>
          <span class="lost-text">Personalization</span>
          <span class="lost-status">❌ LOST</span>
        </div>
        <div class="lost-feature">
          <span class="lost-icon">⚡</span>
          <span class="lost-text">Dynamic Content</span>
          <span class="lost-status">❌ LOST</span>
        </div>
        <div class="lost-feature">
          <span class="lost-icon">🔄</span>
          <span class="lost-text">Real-time Data</span>
          <span class="lost-status">❌ LOST</span>
        </div>
      </div>
    </div>
  );
});

