export interface Config {
  type: string;
  host: string;
  port: number;
  version: string;
}

const config: Config = {
  type: 'http',
  host: 'localhost',
  port: 5000,
  version: 'v0',
};

export function getAddr(): string {
  return `${config.type}://${config.host}:${config.port}/${config.version}`;
}

export default config;
