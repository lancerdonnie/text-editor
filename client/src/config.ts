let BASE_URL: string;

if (import.meta.env.MODE === 'development') {
  BASE_URL = 'ws://localhost:8080';
} else {
  BASE_URL = import.meta.env.BASE_URL;
}

export { BASE_URL };
