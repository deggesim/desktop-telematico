/// <reference types="vite/client" />

/** Import di asset del design kit vendorizzato. */
declare module "*.svg" {
  const src: string;
  export default src;
}
