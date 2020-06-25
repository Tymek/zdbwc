// import { isEmpty } from 'ramda'
// import middleware, { Handler, runMiddleware } from '../../utils/api/middleware'
// import handleResponse from '../../utils/api/handleResponse'
// import passport from '../../utils/api/passport'

// type Authorization = {
//   username:string | undefined,
//   password:string | undefined,
// }

// const route:Handler = async (req, res) => {
//   await middleware(req, res)

//   const passportLogin = passport.authenticate('local', (error, user, info) => {
//     if (error) {
//       return handleResponse(res, isEmpty(info) ? { error } : { error, info }, 400)
//     }

//     if (!user || isEmpty(user)) {
//       if (isEmpty(info)) {
//         return handleResponse(res, { message: 'Bad request' }, 400)
//       }

//       return handleResponse(res, info, 401)
//     }

//     return handleResponse(res, { ...user, password: undefined }, 200)
//   })

//   return runMiddleware(req, res, passportLogin)
// }

// export default route


// import { Request, Response } from 'express'

// function loginHandler(args: loginArgs): UserInfo {
//   return {
//     id: "<sample value>",
//     username: "<sample value>",
//   }
// }

// // Request Handler
// app.post('/login', async (req: Request, res: Response) => {
//   // get request input
//   const params: loginArgs = req.body.input

//   // run some business logic
//   const result = loginHandler(params)

//   /*
//   // In case of errors:
//   return res.status(400).json({
//     message: "error happened"
//   })
//   */

//   // success
//   return res.json(result)
// })

//                   ************************                            //

// import bcrypt from 'bcrypt'
// import { sql } from 'slonik'

// import db from 'utils/api/database'

// const verifyUser = async (username, password) => {
//   const result = await db.maybeOne(sql`
//     SELECT *
//     FROM public.user
//     WHERE username = ${username}
//   `)

//   if (!result) {
//     throw new Error('Invalid username')
//   }
//   if (!await bcrypt.compare(password, result.password)) {
//     throw new Error('Invalid password')
//   }

//   return result
// }

import middleware, { Handler } from 'utils/api/middleware'
import handleResponse from 'utils/api/handleResponse'
// import handler from '../../utils/api/handler'

const route:Handler = async (req, res) => {
  await middleware(req, res)

  handleResponse(res, { status: 'OK' })
}

export default route
