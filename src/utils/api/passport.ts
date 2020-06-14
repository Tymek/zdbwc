import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
// import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { sql } from 'slonik'
import db from './database'
// import { Strategy as BearerStrategy } from 'passport-http-bearer'
// import { User } from '../db/schema'
// import { errorHandler } from '../db/errors'

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user))
})

passport.deserializeUser((user, done) => {
  try {
    done(null, JSON.parse(user))
  } catch (error) {
    done(error)
  }
})

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const result = await db.maybeOne(sql`
        SELECT *
        FROM public.user
        WHERE username = ${username}
      `)

      if (!result || !await bcrypt.compare(password, result.password)) {
        done('Unauthorized')
      }

      return done(null, result)
    } catch (error) {
      return done(process.env.NODE_ENV !== 'production' ? error : 'Unauthorized')
    }
  }),
)

// passport.use(new BearerStrategy(
//   ((token, done) => {
//     User
//       .query()
//       .where('token', token)
//       .first()
//       .then(user => {
//         if (!user) { return done('Invalid Token') }
//         return done(null, user)
//       })
//       .catch(error => {
//         done(error)
//       })
//   }),
// ))

export default passport
