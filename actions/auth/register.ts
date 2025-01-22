'use server'

import { createUser } from './helpers/createUser'
import userExists from './helpers/userExists'
import { hashPassword } from './helpers/hashPassword'
import { loginHandler } from './helpers/loginHandler'
import { redirect } from 'next/navigation'

/**
@param {string} username - A username string
@param {string} password - A username string
**/
export default async function register(
    username: string,
    password: string
): Promise<void> {
    let redirectToHome = false
    try {
        if (await userExists(username)) {
            throw new Error('User exists')
        }

        const hashedPassword = await hashPassword(password)

        await createUser({ username, password: hashedPassword })

        redirectToHome = (await loginHandler(username, password)) || false
    } catch (error) {
        console.error('Something went wrong while registering: ', error)
        throw error
    } finally {
        if (redirectToHome) {
            redirect('/home')
        }
    }
}
