import { describe, it, expect } from 'vitest'
import { calculateEntropy, calculateBlockEntropy } from '../src/utils/analysis/entropyUtils.js'

function toBuffer(arr) {
  return new Uint8Array(arr).buffer
}

describe('calculateEntropy', () => {
  it('returns 0 for empty buffer', () => {
    expect(calculateEntropy(toBuffer([]))).toBe('0.0000')
  })

  it('calculates entropy for uniform data', () => {
    expect(calculateEntropy(toBuffer([0, 0, 0, 0]))).toBe('0.0000')
    expect(calculateEntropy(toBuffer([0, 255]))).toBe('1.0000')
  })
})

describe('calculateBlockEntropy', () => {
  it('splits buffer into blocks and calculates entropy', () => {
    const blocks = calculateBlockEntropy(toBuffer([0, 0, 255, 255]), 2)
    expect(blocks).toEqual([0, 0])
  })
})
