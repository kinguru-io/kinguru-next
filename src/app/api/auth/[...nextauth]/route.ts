import NextAuth from 'next-auth'
import {options} from 'auth'

const handlers = NextAuth(options)
export {handlers as GET, handlers as POST}
