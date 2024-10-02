import { describe, it, expect, vi } from 'vitest'
import bcrypt from 'bcryptjs'
import { hashPassword } from './hashPassword'

describe('hashPassword', () => {
    it('should return a hashed password', async () => {
        const mockPassword = 'securePassword123'

        const hashedPassword = await hashPassword(mockPassword)

        expect(mockPassword).not.toEqual(hashedPassword)
    })

    it('should hash the same string in two different hashes', async () => {
        const mockPassword = 'securePassword123'

        const hashedPassword = await hashPassword(mockPassword)
        const hashedPassword2 = await hashPassword(mockPassword)

        expect(hashedPassword).not.toEqual(hashedPassword2)
    })
})
