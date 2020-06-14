import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db from './database'
import { sql } from 'slonik'
// import { Strategy as BearerStrategy } from 'passport-http-bearer'
// import { User } from '../db/schema'
// import { errorHandler } from '../db/errors'

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    console.log(username)
    try {
      const result = await db.maybeOne(sql`
        SELECT *
        FROM public.user
        WHERE username = ${username}
      `)

      if (!result) {
        throw new Error('User not found')
      }

      if (result.password !== password) {
        
      }

      console.log(result)

      return done(null, result)
    } catch (error) {
      return done(process.env.NODE_ENV !== 'production' ? error : 'Unauthorized')
    }
  }
))

export default passport
