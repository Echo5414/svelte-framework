// src/declarations.d.ts
import 'svelte';

declare module 'svelte' {
  interface HTMLProps<T> extends HTMLAttributes<T> {
    'app-col-xs'?: string;
    'app-px-xs'?: string;
    'app-pr-xs'?: string;
    tooltipdescription?: string;
    tooltippostion?: string;
  }
}
