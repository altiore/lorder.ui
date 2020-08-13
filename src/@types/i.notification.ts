export interface INotification {
  action?: {
    label: string;
    callback: () => void;
  };
  message?: string | JSX.Element;
  title?: string;
}
