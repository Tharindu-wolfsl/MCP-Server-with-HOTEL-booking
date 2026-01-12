import jwt from 'jsonwebtoken'
import { User } from '@/types'


const SECRET = 'dev-secret'


export function signToken(user: User): string {
return jwt.sign(user, SECRET)
}


export function verifyToken(token: string): User {
return jwt.verify(token, SECRET) as User
}