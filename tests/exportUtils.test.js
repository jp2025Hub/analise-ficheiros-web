import { describe, it, expect, vi } from 'vitest'
import { exportAsBlob } from '../src/utils/export/exportUtils.js'

describe('exportAsBlob', () => {
  it('creates and downloads a blob', () => {
    const createObjectURL = vi.fn(() => 'blob:url')
    const revokeObjectURL = vi.fn()
    global.URL.createObjectURL = createObjectURL
    global.URL.revokeObjectURL = revokeObjectURL

    const click = vi.fn()
    global.document.createElement = () => ({ click, set href(v) { this._href = v }, get href() { return this._href }, download: '' })

    exportAsBlob('content', 'file.txt', 'text/plain')

    expect(createObjectURL).toHaveBeenCalled()
    expect(click).toHaveBeenCalled()
    expect(revokeObjectURL).toHaveBeenCalled()
  })
})
