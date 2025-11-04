import { getRandomNumber } from '../utils.js'

export const description =
  'Вы запустили игру «Простое число». Правила: игроку показывается число, нужно ответить "да", если оно простое, и "нет" — если нет.'

const isPrime = (num) => {
  if (num < 2) return false
  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) return false
  }
  return true
}

export const generateRound = () => {
  const number = getRandomNumber(2, 100)
  const question = String(number)
  const correctAnswer = isPrime(number) ? 'да' : 'нет'
  return [question, correctAnswer]
}
