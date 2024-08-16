import { Jwt } from 'hono/utils/jwt'

const genToken = (id: string) => {
  console.log({id})
  return Jwt.sign({ id }, Bun.env.JWT_SECRET || '')
}

export default genToken