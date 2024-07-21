export interface Config {
  type: string;
  host: string;
  port: number;
}

const config: Config = {
  type: 'http',
  host: 'localhost',
  port: 5000,
};

export function getAddr(): string {
  return `${config.type}://${config.host}:${config.port}`;
}

export default config;
