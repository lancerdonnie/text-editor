let BASE_URL: string;

if (import.meta.env.MODE === 'development') {
  BASE_URL = 'ws://localhost:8080';
} else {
  BASE_URL = import.meta.env.VITE_BASE_URL;
}

export { BASE_URL };
