// const isProd = typeof window !== 'undefined' && window.location.pathname.startsWith('/recipes');
let isProd = true;
let useSubpath = false;

if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/recipes")) {
        useSubpath = true;
    }

    if (window.location.hostname.startsWith("localhost")) {
        isProd = false;
    }
}

export const BASE_PATH = useSubpath ? '/recipes' : '';
// export const BASE_PATH = "/recipes";

export const OLLAMA_BASE_PATH = isProd ? "http://localhost:11434" : "http://ollama.homelab.internal";