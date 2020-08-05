export interface INotification {
  action?: {
    label: string;
    callback: () => void;
  };
  message?: string;
  title?: string;
}
