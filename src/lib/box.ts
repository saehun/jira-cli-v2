import * as boxen from 'boxen';

export const box = (message: string): string => {
  return boxen(message, { padding: 1, align: 'center', margin: 1 });
};

export const leftbox = (message: string): string => {
  return boxen(message, { padding: 1, align: 'left', margin: 1 });
};
