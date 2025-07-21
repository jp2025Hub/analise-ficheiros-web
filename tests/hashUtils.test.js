import { describe, it, expect } from 'vitest'
import { generateHash } from '../src/utils/analysis/hashUtils.js'

function strToBuffer(str) {
  return new TextEncoder().encode(str).buffer
}

describe('generateHash', () => {
  it('generates SHA-256 hash correctly', async () => {
    const hash = await generateHash(strToBuffer('test'), 'SHA-256')
    expect(hash).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')
  })

  it('handles empty buffer', async () => {
    const hash = await generateHash(null)
    expect(hash).toBe('')
  })
})
