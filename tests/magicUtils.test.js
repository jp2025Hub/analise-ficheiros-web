import { describe, it, expect } from 'vitest'
import { getMagicNumber, detectFileTypeByMagic } from '../src/utils/analysis/magicUtils.js'

describe('getMagicNumber', () => {
  it('returns hex string from buffer', () => {
    const buffer = new Uint8Array([0xff, 0xd8, 0xff, 0x00]).buffer
    expect(getMagicNumber(buffer, 3)).toBe('FFD8FF')
  })
})

describe('detectFileTypeByMagic', () => {
  it('detects type from known signature', () => {
    expect(detectFileTypeByMagic('89504E47')).toBe('PNG')
  })

  it('detects ASCII text', () => {
    const buf = new TextEncoder().encode('hello world').buffer
    expect(detectFileTypeByMagic('00', buf)).toBe('Texto ASCII')
  })

  it('detects from file extension', () => {
    expect(detectFileTypeByMagic('00', null, { name: 'script.py' })).toBe('Python Script')
  })
})
