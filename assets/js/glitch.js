/**
 * glitch.js
 *
 * This script provides the logic for the site-wide text glitch effect.
 * It periodically applies a CSS class to elements with the '.glitch' class,
 * which triggers a short, burst-style animation defined in the CSS.
 */

/**
 * Finds all elements with the '.glitch' class and applies the burst animation class
 * at a regular interval.
 *
 * @param {number} [interval=4000] - The time in milliseconds between each glitch burst.
 */
function startGlitchBursts(interval = 4000) {
  // Find all elements that are intended to have the glitch effect.
  const glitchElements = document.querySelectorAll('.glitch');

  // If no glitchable elements are found on the page, do nothing.
  if (glitchElements.length === 0) {
    return;
  }

  // Set up a recurring timer to trigger the glitch effect.
  setInterval(() => {
    glitchElements.forEach(el => {
      // Add the class that triggers the CSS animation.
      el.classList.add('glitch-burst');

      // Set a timer to remove the class after the animation completes.
      // The duration should be slightly longer than the CSS animation duration.
      // CSS animation is 0.4s, so 500ms is a safe value.
      setTimeout(() => {
        el.classList.remove('glitch-burst');
      }, 500);
    });
  }, interval);
}

/**
 * Wait for the DOM to be fully loaded before initializing the script.
 * This ensures that all '.glitch' elements are available to be found by the querySelectorAll.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Start the glitch effect with the default interval.
  startGlitchBursts();
});
