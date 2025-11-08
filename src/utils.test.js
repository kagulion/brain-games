import { getRandomNumber } from './utils.js'

describe('getRandomNumber', () => {
  test('должна возвращать число в указанном диапазоне', () => {
    const min = 1
    const max = 10
    const result = getRandomNumber(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  test('должна возвращать число при min === max', () => {
    const value = 5
    const result = getRandomNumber(value, value)

    expect(result).toBe(value)
  })

  test('должна возвращать разные числа при многократных вызовах', () => {
    const results = new Set()
    for (let i = 0; i < 100; i += 1) {
      results.add(getRandomNumber(1, 100))
    }

    // При большом диапазоне должна быть разнообразие значений
    expect(results.size).toBeGreaterThan(1)
  })

  test('должна работать с отрицательными числами', () => {
    const min = -10
    const max = -1
    const result = getRandomNumber(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  test('должна работать с большими диапазонами', () => {
    const min = 1
    const max = 1000
    const result = getRandomNumber(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })
})

