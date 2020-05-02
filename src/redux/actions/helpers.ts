import { v1 as uuidv1 } from 'uuid';

export function parseDate(d: Date): string {
  return d.toISOString()
}

export function getUid() {
  return uuidv1();
}