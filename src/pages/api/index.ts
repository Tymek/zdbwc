import { NextApiRequest, NextApiResponse } from 'next'
// import bcrypt from 'bcrypt'
import middleware, { Handler } from '../../utils/api/middleware'
// import handler from '../../utils/api/handler'

const route: Handler = async (req, res) => {
  await middleware(req, res)

  res.end(JSON.stringify({ status: 'OK' }))
}

export default route

  // let hash = bcrypt.hashSync('0', 10)
  // bcrypt.compare('somePassword', hash, function(err, res) {
  //   if(res) {
  //    // Passwords match
  //   } else {
  //    // Passwords don't match
  //   } 
  // })