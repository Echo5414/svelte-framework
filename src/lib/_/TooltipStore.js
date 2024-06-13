import { writable } from 'svelte/store';

export const tooltip = writable({
  visible: false,
  content: '',
  position: 'top',
  x: 0,
  y: 0
});
