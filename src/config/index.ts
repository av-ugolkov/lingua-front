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

export function getAddr(): string {
  return `${config.type}://${config.host}:${config.port}`;
}

export default config;
