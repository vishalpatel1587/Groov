import React from 'react';
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack';

import { Toaster } from './Toaster';
import { ConfirmActionToaster } from './ConfirmActionToaster';

let snackbarRef: WithSnackbarProps;

export const ToasterConfig: React.FC = () => {
  snackbarRef = useSnackbar();
  return null;
};

export type ConfirmActionProps = {
  onConfirm: () => Promise<void>;
};

const autoHideDuration = 5000;

export const ToasterUtils = {
  success(msg: string) {
    this.toast(msg, 'success');
  },
  warning(msg: string) {
    this.toast(msg, 'warning');
  },
  info(msg: string) {
    this.toast(msg, 'info');
  },
  error(msg: string) {
    this.toast(msg || 'Contact Administrator', 'error');
  },
  toast(msg: string, variant: VariantType = 'default', title?: string) {
    snackbarRef.closeSnackbar();
    snackbarRef.enqueueSnackbar(msg, {
      variant,
      autoHideDuration,
      content: (key, message) => (
        <Toaster id={key} message={message} variant={variant} title={title} />
      )
    });
  },
  close() {
    snackbarRef.closeSnackbar();
  },
  confirm({ onConfirm }: ConfirmActionProps) {
    snackbarRef.closeSnackbar();
    snackbarRef.enqueueSnackbar('', {
      autoHideDuration,
      content: (key, _) => (
        <ConfirmActionToaster
          id={key}
          variant={'confirm'}
          onConfirm={onConfirm}
        />
      )
    });
  }
};
