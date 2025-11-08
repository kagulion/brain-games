import { generateRound, description } from './prime.js'

describe('prime game', () => {
  test('должен экспортировать описание игры', () => {
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  test('generateRound должна возвращать массив из двух элементов', () => {
    const result = generateRound()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  test('generateRound должна возвращать вопрос в виде строки с числом', () => {
    const [question] = generateRound()

    expect(typeof question).toBe('string')
    expect(Number.isInteger(Number(question))).toBe(true)
  })

  test('generateRound должна возвращать правильный ответ для простых чисел', () => {
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

    primeNumbers.forEach((prime) => {
      const originalRandom = Math.random
      Math.random = jest.fn(() => {
        // Преобразуем простое число в значение random
        // Для числа n при min=2, max=100: random = (n-2) / 98
        return (prime - 2) / 98
      })

      const [, answer] = generateRound()
      expect(answer).toBe('да')

      Math.random = originalRandom
    })
  })

  test('generateRound должна возвращать правильный ответ для составных чисел', () => {
    const compositeNumbers = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25]

    compositeNumbers.forEach((composite) => {
      const originalRandom = Math.random
      Math.random = jest.fn(() => {
        // Преобразуем составное число в значение random
        // Для числа n при min=2, max=100: random = (n-2) / 98
        return (composite - 2) / 98
      })

      const [, answer] = generateRound()
      expect(answer).toBe('нет')

      Math.random = originalRandom
    })
  })

  test('generateRound должна возвращать ответ "да" или "нет"', () => {
    const [, answer] = generateRound()

    expect(['да', 'нет']).toContain(answer)
  })

  test('generateRound должна генерировать числа в диапазоне 2-100', () => {
    for (let i = 0; i < 50; i += 1) {
      const [question] = generateRound()
      const number = Number(question)

      expect(number).toBeGreaterThanOrEqual(2)
      expect(number).toBeLessThanOrEqual(100)
    }
  })

  test('generateRound не должна генерировать числа меньше 2', () => {
    for (let i = 0; i < 50; i += 1) {
      const [question] = generateRound()
      const number = Number(question)

      expect(number).toBeGreaterThanOrEqual(2)
    }
  })
})
