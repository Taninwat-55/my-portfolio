// Next's App Router runs on its own bundled React canary, which exports
// <ViewTransition>. @types/react only declares it in the canary entry point, so
// this brings those declarations in. Used to fly a project's title into its
// case page (app/world/caseTitle.ts; experimental.viewTransition in
// next.config.ts).
/// <reference types="react/canary" />
