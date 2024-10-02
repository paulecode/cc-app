import bcrypt from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { doesHashMatchPassword } from './compareHashes'

describe('Integration test for doesHashMatchPassword', () => {
    it('should return true for a matching password and hash', async () => {
        const password = 'mySecretPassword'
        const hash = await bcrypt.hash(password, 10)

        const result = await doesHashMatchPassword(hash, password)
        expect(result).toBe(true)
    })

    it('should return false for a non-matching password and hash', async () => {
        const password = 'mySecretPassword'
        const wrongPassword = 'wrongPassword'
        const hash = await bcrypt.hash(password, 10)

        const result = await doesHashMatchPassword(hash, wrongPassword)
        expect(result).toBe(false)
    })
})
