const defaultCoreCount = 4;
const maxCoreCount = 16;

export function getCpuStatus(segmentCount: number) {
  const cores = navigator.hardwareConcurrency ?? defaultCoreCount;
  const litSegments = Math.min(
    Math.round((cores / maxCoreCount) * segmentCount),
    segmentCount,
  );

  return {
    cores,
    litSegments,
  };
}
