export function getNetworkMbps(): number {
  if (typeof window === undefined || !window.performance || !window.performance.getEntriesByType) return 0
  const mbpsSamples = window.performance
    .getEntriesByType('resource')
    .filter((r) => (r as PerformanceResourceTiming).transferSize && r.duration)
    .map(
      (r) =>
        ((r as PerformanceResourceTiming).transferSize * 8) /
        (((r as PerformanceResourceTiming).responseEnd - (r as PerformanceResourceTiming).responseStart) / 1000) /
        1000000,
    )

  return Math.round(mbpsSamples.reduce((a, b) => a + b) / mbpsSamples.length)
}
