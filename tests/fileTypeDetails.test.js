import { describe, it, expect } from 'vitest'
import { getPdfVersion, getPngDimensions, getMp3Info } from '../src/utils/analysis/fileTypeDetails.js'

function strToBuffer(str) {
  return new TextEncoder().encode(str).buffer
}

function createPngBuffer(width, height) {
  const buffer = new ArrayBuffer(24)
  const view = new DataView(buffer)
  view.setUint32(16, width)
  view.setUint32(20, height)
  return buffer
}

describe('getPdfVersion', () => {
  it('extracts version from buffer', () => {
    const buffer = strToBuffer('%PDF-1.7')
    expect(getPdfVersion(buffer)).toBe('PDF 1.7')
  })
})

describe('getPngDimensions', () => {
  it('returns correct dimensions', () => {
    const buffer = createPngBuffer(800, 600)
    expect(getPngDimensions(buffer)).toBe('800 x 600 px')
  })
})

describe('getMp3Info', () => {
  it('reads ID3v1 info', () => {
    const buffer = new Uint8Array(138).fill(32)
    const tag = buffer.subarray(buffer.length - 128)
    tag.set(new TextEncoder().encode('TAG'))
    tag.set(new TextEncoder().encode('Song Title'), 3)
    tag.set(new TextEncoder().encode('Artist Name'), 33)
    const info = getMp3Info(buffer.buffer)
    expect(info).toEqual({ title: 'Song Title', artist: 'Artist Name' })
  })

  it('handles small buffers', () => {
    const info = getMp3Info(new ArrayBuffer(10))
    expect(info).toEqual({ title: 'Desconhecido', artist: 'Desconhecido' })
  })
})
