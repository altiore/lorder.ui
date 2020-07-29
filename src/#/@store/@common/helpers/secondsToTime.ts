interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function secondsToTime(seconds: number, hoursPerDay: number = 24): TimeUnits {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  const days = Math.floor(hours / hoursPerDay);
  hours = hours % hoursPerDay;

  return { days, hours, minutes, seconds };
}
