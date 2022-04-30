declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production'
      STRIPE_API_KEY: string
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      STRIPE_SUCCESS_URL: string
      STRIPE_CANCEL_URL: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      FAUNADB_KEY: string
      JWT_SECRET: string
      PRISMIC_REPOSITORY_NAME: string
      PRISMIC_ACCESS_TOKEN: string
    }
  }
}

export {}
