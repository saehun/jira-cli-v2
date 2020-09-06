import { formatRelative as format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatRelative(date: string | Date): string {
  return format(new Date(date), new Date(), {
    locale: ko,
  });
}
