export function calculateDecay(
  createdAt: Date | string | number,
  deadline: Date | string | number,
) {
  const start = new Date(createdAt);
  const end = new Date(deadline);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 0;
  }

  const totalDuration = end.getTime() - start.getTime();
  const timeElasped = now.getTime() - start.getTime();

  if (timeElasped >= totalDuration) return 100;

  if (timeElasped <= 0) return 0;

  const decayPercentage = (timeElasped / totalDuration) * 100;

  return Math.round(decayPercentage);
}
