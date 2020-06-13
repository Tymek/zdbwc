import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
// import { User } from '../db/schema'
// import { errorHandler } from '../db/errors'

passport.use(
  new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    console.log('\n', 'login', username, password, '\n')

    done(null, {})

    // User
    //   .query()
    //   .where('username', username)
    //   .first()
    //   .then(function (user) {
    //     if (!user) { return done('Unknown user') }
    //     user.verifyPassword(password, function (err, passwordCorrect) {
    //       if (err) { return done(err) }
    //       if (!passwordCorrect) { return done('Invalid password') }
    //       return done(null, user)
    //     })
    //   }).catch(function (err) {
    //     done(err)
    //   })
  }
))

passport.use(new BearerStrategy(
  function(token, done) {

    console.log('\n', 'token', token, '\n')

    done(null, {})

    // User
    //   .query()
    //   .where('token', token)
    //   .first()
    //   .then((user) => {
    //     if (!user) { 
    //       return done('Invalid Token')
    //     }

    //     return done(null, user)
    //   }).catch(function (err) {
    //     done(err)
    //   })
  }
))

export default passport
