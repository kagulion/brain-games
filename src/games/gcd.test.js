import { generateRound, description } from './gcd.js'

describe('gcd game', () => {
  test('должен экспортировать описание игры', () => {
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  test('generateRound должна возвращать массив из двух элементов', () => {
    const result = generateRound()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  test('generateRound должна возвращать вопрос с двумя числами', () => {
    const [question] = generateRound()

    expect(typeof question).toBe('string')
    const numbers = question.split(' ')
    expect(numbers.length).toBe(2)
    expect(Number.isInteger(Number(numbers[0]))).toBe(true)
    expect(Number.isInteger(Number(numbers[1]))).toBe(true)
  })

  test('generateRound должна возвращать правильный НОД для известных пар', () => {
    // Тестируем конкретные случаи через мокирование
    const testCases = [
      { a: 12, b: 8, expected: 4 },
      { a: 15, b: 25, expected: 5 },
      { a: 17, b: 17, expected: 17 },
      { a: 7, b: 13, expected: 1 },
      { a: 48, b: 18, expected: 6 },
    ]

    testCases.forEach(({ a, b, expected }) => {
      // Мокируем getRandomNumber из utils
      const originalRandom = Math.random
      let callCount = 0
      Math.random = jest.fn(() => {
        callCount += 1
        // Преобразуем желаемое число в значение random
        // Для числа n при min=1, max=50: random = (n-1) / 49
        if (callCount === 1) {
          return (a - 1) / 49
        }
        if (callCount === 2) {
          return (b - 1) / 49
        }
        return 0.5
      })

      const [, answer] = generateRound()
      expect(Number(answer)).toBe(expected)

      Math.random = originalRandom
    })
  })

  test('generateRound должна возвращать НОД >= 1', () => {
    for (let i = 0; i < 20; i += 1) {
      const [, answer] = generateRound()
      const gcd = Number(answer)

      expect(gcd).toBeGreaterThanOrEqual(1)
      expect(Number.isInteger(gcd)).toBe(true)
    }
  })

  test('generateRound должна генерировать числа в диапазоне 1-50', () => {
    for (let i = 0; i < 30; i += 1) {
      const [question] = generateRound()
      const numbers = question.split(' ').map(Number)

      numbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(1)
        expect(num).toBeLessThanOrEqual(50)
      })
    }
  })

  test('НОД должен делиться без остатка на оба числа', () => {
    for (let i = 0; i < 20; i += 1) {
      const [question, answer] = generateRound()
      const [a, b] = question.split(' ').map(Number)
      const gcd = Number(answer)

      expect(a % gcd).toBe(0)
      expect(b % gcd).toBe(0)
    }
  })
})

