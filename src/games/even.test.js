import { generateRound, description } from './even.js'

describe('even game', () => {
  test('должен экспортировать описание игры', () => {
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  test('generateRound должна возвращать массив из двух элементов', () => {
    const result = generateRound()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  test('generateRound должна возвращать вопрос в виде строки', () => {
    const [question] = generateRound()

    expect(typeof question).toBe('string')
    expect(Number.isInteger(Number(question))).toBe(true)
  })

  test('generateRound должна возвращать правильный ответ для четных чисел', () => {
    // Мокируем Math.random для получения четного числа
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // Возвращаем значение, которое даст четное число после применения формулы
      // Для получения числа 2 (четное) при min=1, max=100: random должен быть около 0.01
      if (callCount === 1) {
        return 0.01 // даст число 2 (четное)
      }
      return 0.5
    })

    const [, answer] = generateRound()
    expect(answer).toBe('да')

    Math.random = originalRandom
  })

  test('generateRound должна возвращать правильный ответ для нечетных чисел', () => {
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // Для получения числа 1 (нечетное) при min=1, max=100: random должен быть около 0.0
      if (callCount === 1) {
        return 0.0 // даст число 1 (нечетное)
      }
      return 0.5
    })

    const [, answer] = generateRound()
    expect(answer).toBe('нет')

    Math.random = originalRandom
  })

  test('generateRound должна возвращать числа в диапазоне 1-100', () => {
    for (let i = 0; i < 50; i += 1) {
      const [question] = generateRound()
      const number = Number(question)

      expect(number).toBeGreaterThanOrEqual(1)
      expect(number).toBeLessThanOrEqual(100)
    }
  })

  test('generateRound должна возвращать ответ "да" или "нет"', () => {
    const [, answer] = generateRound()

    expect(['да', 'нет']).toContain(answer)
  })
})

