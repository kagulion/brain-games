import { getRandomNumber } from '../utils.js'

export const description =
  'Вы запустили игру «Прогрессия». Правила: найдите пропущенное число в арифметической прогрессии.'

const generateProgression = (start, step, length) => {
  const progression = []
  for (let i = 0; i < length; i += 1) {
    progression.push(start + i * step)
  }
  return progression
}

export const generateRound = () => {
  const start = getRandomNumber(1, 10) // начальное число
  const step = getRandomNumber(2, 6) // шаг прогрессии
  const length = getRandomNumber(6, 10) // длина (6–10 элементов)

  const progression = generateProgression(start, step, length)

  const hiddenIndex = getRandomNumber(0, length - 1)
  const correctAnswer = String(progression[hiddenIndex])
  progression[hiddenIndex] = '..'

  const question = progression.join(' ')
  return [question, correctAnswer]
}
