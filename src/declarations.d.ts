// src/declarations.d.ts
import 'svelte';

declare module 'svelte' {
  interface HTMLProps<T> extends HTMLAttributes<T> {
    tooltipdescription?: string;
    tooltippostion?: string;
    'app-col-xs'?: string;
    'app-px-xs'?: string;
    'app-pr-xs'?: string;
  }
}
