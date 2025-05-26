/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
  // 👉 Adicione mais variáveis se tiver
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
