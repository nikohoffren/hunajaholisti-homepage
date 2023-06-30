interface ImportMetaEnv {
  VITE_STRIPE_PUBLISHABLE_KEY: string;
  VITE_STRIPE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
