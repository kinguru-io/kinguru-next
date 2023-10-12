'use server'

import Image from 'next/image'
import {auth} from 'auth'
import {DropdownButton} from 'lib/components'

export async function UserSpace() {
  const session = await auth()
  return (
    <div>
      {session ? (
        <DropdownButton>
          <Image
            alt={session.user?.name || 'Username'}
            className="rounded-full"
            height={36}
            src={session.user?.image || '123'}
            width={36}
          />
        </DropdownButton>
      ) : (
        <div />
      )}
    </div>
  )
}
