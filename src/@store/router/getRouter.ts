import { routes } from './routes'

export default function (history) {
  return {
    action: history.action,
    location: history.location,
    routes,
  };
}