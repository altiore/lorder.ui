export default function(history) {
  return {
    action: history.action,
    location: history.location,
    prevLocation: history.location,
    routes: [],
  };
}
