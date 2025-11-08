import { generateRound, description } from './progression.js'

describe('progression game', () => {
  test('должен экспортировать описание игры', () => {
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  test('generateRound должна возвращать массив из двух элементов', () => {
    const result = generateRound()

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
  })

  test('generateRound должна возвращать вопрос с прогрессией', () => {
    const [question] = generateRound()

    expect(typeof question).toBe('string')
    expect(question).toContain('..')
  })

  test('generateRound должна возвращать правильный ответ для прогрессии', () => {
    // Мокируем для получения известной прогрессии
    const originalRandom = Math.random
    let callCount = 0
    Math.random = jest.fn(() => {
      callCount += 1
      // start = 2, step = 3, length = 6, hiddenIndex = 2
      // Прогрессия: 2, 5, 8, 11, 14, 17
      // Скрытый элемент на индексе 2 = 8
      if (callCount === 1) return 0.1 // start = 2 (min=1, max=10)
      if (callCount === 2) return 0.25 // step = 3 (min=2, max=6)
      if (callCount === 3) return 0.0 // length = 6 (min=6, max=10)
      if (callCount === 4) return 0.4 // hiddenIndex = 2 (min=0, max=5)
      return 0.5
    })

    const [question, answer] = generateRound()
    expect(question).toContain('..')
    expect(Number(answer)).toBe(8)

    Math.random = originalRandom
  })

  test('generateRound должна возвращать прогрессию правильной длины', () => {
    for (let i = 0; i < 20; i += 1) {
      const [question] = generateRound()
      const elements = question.split(' ')

      expect(elements.length).toBeGreaterThanOrEqual(6)
      expect(elements.length).toBeLessThanOrEqual(10)
    }
  })

  test('generateRound должна содержать ровно один скрытый элемент', () => {
    for (let i = 0; i < 20; i += 1) {
      const [question] = generateRound()
      const hiddenCount = (question.match(/\.\./g) || []).length

      expect(hiddenCount).toBe(1)
    }
  })

  test('generateRound должна возвращать числовой ответ в виде строки', () => {
    const [, answer] = generateRound()

    expect(typeof answer).toBe('string')
    expect(Number.isInteger(Number(answer))).toBe(true)
  })

  test('generateRound должна генерировать правильную арифметическую прогрессию', () => {
    for (let i = 0; i < 10; i += 1) {
      const [question, answer] = generateRound()
      const elements = question.split(' ')
      const hiddenIndex = elements.indexOf('..')
      const answerNum = Number(answer)

      // Проверяем элементы до скрытого
      if (hiddenIndex > 0) {
        const prevNum = Number(elements[hiddenIndex - 1])
        const step = answerNum - prevNum

        // Проверяем элементы после скрытого
        if (hiddenIndex < elements.length - 1) {
          const nextNum = Number(elements[hiddenIndex + 1])
          expect(nextNum - answerNum).toBe(step)
        }
      }
    }
  })

  test('generateRound должна генерировать прогрессии с шагом от 2 до 6', () => {
    // Проверяем через мокирование конкретных значений
    // Формула для получения числа n: Math.floor(Math.random() * (max - min + 1)) + min
    // Для получения точно n: Math.random() = (n - min + 0.5) / (max - min + 1)
    const testCases = [
      { start: 1, step: 2, length: 6, hiddenIndex: 3 },
      { start: 5, step: 3, length: 7, hiddenIndex: 2 },
      { start: 3, step: 6, length: 8, hiddenIndex: 4 },
    ]

    testCases.forEach(({ start, step, length, hiddenIndex }) => {
      const originalRandom = Math.random
      let callCount = 0
      Math.random = jest.fn(() => {
        callCount += 1
        // start (1-10): (start - 1 + 0.5) / (10 - 1 + 1) = (start - 0.5) / 10
        if (callCount === 1) return (start - 0.5) / 10
        // step (2-6): (step - 2 + 0.5) / (6 - 2 + 1) = (step - 1.5) / 5
        if (callCount === 2) return (step - 1.5) / 5
        // length (6-10): (length - 6 + 0.5) / (10 - 6 + 1) = (length - 5.5) / 5
        if (callCount === 3) return (length - 5.5) / 5
        // hiddenIndex (0 to length-1): (hiddenIndex + 0.5) / length
        if (callCount === 4) return (hiddenIndex + 0.5) / length
        return 0.5
      })

      const [question] = generateRound()
      const elements = question.split(' ')

      // Проверяем, что прогрессия имеет правильную длину
      expect(elements.length).toBe(length)

      // Восстанавливаем прогрессию для проверки шага
      const expectedProgression = []
      for (let i = 0; i < length; i += 1) {
        expectedProgression.push(start + i * step)
      }

      // Проверяем элементы до и после скрытого
      if (hiddenIndex > 0) {
        const beforeHidden = Number(elements[hiddenIndex - 1])
        expect(beforeHidden).toBe(expectedProgression[hiddenIndex - 1])
      }
      if (hiddenIndex < length - 1) {
        const afterHidden = Number(elements[hiddenIndex + 1])
        expect(afterHidden).toBe(expectedProgression[hiddenIndex + 1])
        if (hiddenIndex > 0) {
          const stepBefore = afterHidden - Number(elements[hiddenIndex - 1])
          expect(stepBefore).toBe(step * 2) // шаг между элементами через скрытый
        }
      }

      Math.random = originalRandom
    })
  })
})

