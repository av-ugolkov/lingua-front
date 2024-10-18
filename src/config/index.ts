export interface Config {
  type: string;
  host: string;
  port: number;
}

let config: Config;
if (import.meta.env.DEV) {
  config = {
    type: 'http',
    host: 'localhost',
    port: 5000,
  };
} else {
  config = {
    type: 'https',
    host: 'linguaevo.twc1.net',
    port: 5000,
  };
}

export function getFullAddr(endpoint: string): string {
  return `${config.type}://${config.host}:${config.port}${endpoint}`;
}

export default config;
