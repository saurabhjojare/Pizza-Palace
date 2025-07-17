export const scrollToTopSlow = () => {
  const duration = 1000;
  const start = window.scrollY;
  const startTime = performance.now();

  const scrollStep = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));

    window.scrollTo(0, start * (1 - easeInOut));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};
