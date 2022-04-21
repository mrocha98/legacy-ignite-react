import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import { FaunaDBService } from '../../../services/faunadb.service'

const faunaDBService = new FaunaDBService()

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn(user) {
      const email = user.email || ''
      try {
        await faunaDBService.createUserIfNotExists(email)
        return true
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
        return false
      }
    },
  },
})
