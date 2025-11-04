import { getRandomNumber } from '../utils.js'

export const description =
  'Вы запустили игру «Наибольший общий делитель (НОД)». Правила: Найдите наибольший общий делитель двух чисел.'

// Алгоритм Евклида
const getGcd = (a, b) => {
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }

  return a
}

export const generateRound = () => {
  const a = getRandomNumber(1, 50)
  const b = getRandomNumber(1, 50)
  const question = `${a} ${b}`
  const correctAnswer = getGcd(a, b)
  return [question, String(correctAnswer)]
}
