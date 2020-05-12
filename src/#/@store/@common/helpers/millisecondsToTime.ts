interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function millisecondsToTime(ms: number, hoursPerDay: number): TimeUnits {
  let seconds = Math.round(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  const days = Math.floor(hours / hoursPerDay);
  hours = hours % hoursPerDay;

  return { days, hours, minutes, seconds };
}
