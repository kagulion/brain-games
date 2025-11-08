import { generateRound, description } from './calc.js'

describe('calc game', () => {
  test('должен экспортировать описание игры', () => {
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  test('generateRound должна возвращать массив из двух элементов', () => {
    const result = generateRound()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  test('generateRound должна возвращать вопрос с операцией', () => {
    const [question] = generateRound()

    expect(typeof question).toBe('string')
    expect(question).toMatch(/^\d+ [+\-*] \d+$/)
  })

  test('generateRound должна возвращать правильный ответ для сложения', () => {
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // Первый вызов - для числа a (вернет 0.0, что даст 1)
      if (callCount === 1) return 0.0
      // Второй вызов - для числа b (вернет 0.0, что даст 1)
      if (callCount === 2) return 0.0
      // Третий вызов - для оператора (вернет 0.0, что даст индекс 0 = '+')
      if (callCount === 3) return 0.0
      return 0.5
    })

    const [question, answer] = generateRound()
    expect(question).toContain('+')
    expect(Number(answer)).toBe(2) // 1 + 1 = 2

    Math.random = originalRandom
  })

  test('generateRound должна возвращать правильный ответ для вычитания', () => {
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // a = 5, b = 2
      if (callCount === 1) return 0.4 // даст 5
      if (callCount === 2) return 0.1 // даст 2
      // оператор '-' (индекс 1)
      if (callCount === 3) return 0.34 // даст индекс 1
      return 0.5
    })

    const [question, answer] = generateRound()
    expect(question).toContain('-')
    expect(Number(answer)).toBe(3) // 5 - 2 = 3

    Math.random = originalRandom
  })

  test('generateRound должна возвращать правильный ответ для умножения', () => {
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // a = 3, b = 4
      if (callCount === 1) return 0.2 // даст 3
      if (callCount === 2) return 0.3 // даст 4
      // оператор '*' (индекс 2)
      if (callCount === 3) return 0.67 // даст индекс 2
      return 0.5
    })

    const [question, answer] = generateRound()
    expect(question).toContain('*')
    expect(Number(answer)).toBe(12) // 3 * 4 = 12

    Math.random = originalRandom
  })

  test('generateRound должна использовать только допустимые операторы', () => {
    const operators = ['+', '-', '*']
    for (let i = 0; i < 30; i += 1) {
      const [question] = generateRound()
      const operator = question.match(/[+\-*]/)[0]
      expect(operators).toContain(operator)
    }
  })

  test('generateRound должна возвращать числовой ответ в виде строки', () => {
    const [, answer] = generateRound()
    expect(typeof answer).toBe('string')
    expect(Number.isInteger(Number(answer))).toBe(true)
  })

  test('generateRound должна генерировать числа в диапазоне 1-10', () => {
    for (let i = 0; i < 30; i += 1) {
      const [question] = generateRound()
      const numbers = question.match(/\d+/g)
      const a = Number(numbers[0])
      const b = Number(numbers[1])

      expect(a).toBeGreaterThanOrEqual(1)
      expect(a).toBeLessThanOrEqual(10)
      expect(b).toBeGreaterThanOrEqual(1)
      expect(b).toBeLessThanOrEqual(10)
    }
  })
})

