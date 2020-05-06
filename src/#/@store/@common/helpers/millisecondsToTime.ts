interface TimeUnits {
  hours: number;
  minutes: number;
  seconds: number;
}

export function millisecondsToTime(ms: number): TimeUnits {
  let seconds = Math.round(ms / 1000);
  let minutes = Math.round(seconds / 60);
  seconds = seconds % 60;
  const hours = Math.round(minutes / 60);
  minutes = minutes % 60;

  return { hours, minutes, seconds };
}
