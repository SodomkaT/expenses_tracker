export interface Alert {
  message: string;
  status: 'basic' | 'primary' | 'success' | 'info' |'danger' | 'warning' | 'control';
  dismissible: boolean;
}
