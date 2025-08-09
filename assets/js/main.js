document.addEventListener('DOMContentLoaded', function() {

  // --- JavaScript-Driven Typewriter Effect ---
  const typewriterElements = document.querySelectorAll('.typewriter');
  typewriterElements.forEach(function(element) {
    const textToType = element.innerText;
    element.innerHTML = '';
    element.classList.add('typing');
    let i = 0;
    const type = function() {
      if (i < textToType.length) {
        const char = textToType.charAt(i);
        if (char === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += char;
        }
        i++;
        setTimeout(type, 70); // Typing speed
      } else {
        element.classList.remove('typing');
        element.classList.add('finished-typing');
      }
    };
    type();
  });

  // --- Scroll Reveal Logic ---
  const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function(element) {
    revealObserver.observe(element);
  });

});