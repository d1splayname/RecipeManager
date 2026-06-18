export const BASE_PATH = typeof window !== 'undefined' && window.location.pathname.startsWith('/recipes')
	? '/recipes'
	: '';
