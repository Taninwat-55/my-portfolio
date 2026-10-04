// Next's App Router runs on its own bundled React canary, which exports
// <ViewTransition>. @types/react only declares it in the canary entry point, so
// this brings those declarations in. Used by the clock's prints and the case
// study hero (enabled by experimental.viewTransition in next.config.ts).
/// <reference types="react/canary" />
