const isProd = typeof window !== 'undefined' && window.location.pathname.startsWith('/recipes');

export const BASE_PATH = isProd ? '/recipes' : '';
export const OLLAMA_BASE_PATH = isProd ? "http://localhost:11434" : "http://homelab.local/ollama";