import { createClient } from 'villus';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const client = createClient({ url: API_ENDPOINT });