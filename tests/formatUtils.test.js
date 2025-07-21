import { describe, it, expect } from 'vitest'
import { formatBytes, formatDate, formatMimeType } from '../src/utils/formatting/formatUtils.js'

describe('formatBytes', () => {
  it('formats bytes correctly', () => {
    expect(formatBytes(1024)).toBe('1 KB')
  })
})

describe('formatDate', () => {
  it('formats timestamp', () => {
    expect(formatDate(0)).toBe('01/01/1970, 00:00')
  })
})

describe('formatMimeType', () => {
  it('formats mime type', () => {
    expect(formatMimeType('text/plain')).toBe('Text (plain)')
  })

  it('returns Desconhecido for empty value', () => {
    expect(formatMimeType('')).toBe('Desconhecido')
  })
})
