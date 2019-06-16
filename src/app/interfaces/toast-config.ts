// Extract from https://ionicframework.com/docs/api/toast to help make ToastService strongly typed.

import { ToastButton } from '@ionic/core';

type DeviceMode = 'ios' | 'md';
type ToastPosition = 'bottom' | 'middle' | 'top';

export interface ToastConfig {
  animated?: boolean;
  buttons?: (string | ToastButton)[];
  closeButtonText?: string;
  color?: string;
  cssClass?: string | string[];
  duration?: number;
  header?: string;
  keyboardClose?: boolean;
  message?: string;
  mode?: DeviceMode;
  position?: ToastPosition;
  showCloseButton?: boolean;
  translucent?: boolean;
  [key: string]: any;
}
