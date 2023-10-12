'use server'

import {auth} from 'auth'

export async function SendingOutInvitations() {
  const session = await auth()
  return {message: session?.user?.name}
}
