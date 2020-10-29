import { format } from 'date-fns';

export function formatRelative(date: string | Date): string {
  return format(new Date(date), 'yy/MM/dd - HH:mm');
}
