export interface Index {
  type: string
  host: string
  port: number
}

const config: Index = import.meta.env.DEV
  ? {
      type: 'http',
      host: 'localhost',
      port: 5000
    }
  : {
      type: 'https',
      host: 'linguaevo.twc1.net',
      port: 5000
    }

export function getAddr(): string {
  return `${config.type}://${config.host}:${config.port}`
}

export default config
