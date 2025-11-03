import { getRandomNumber } from '../utils.js'

export const description =
  'Вы запустили игру «Калькулятор». Правила: решайте простые математические задачи, правильный ответ — результат выражения.'

export const generateRound = () => {
  const a = getRandomNumber(1, 10)
  const b = getRandomNumber(1, 10)
  const operators = ['+', '-', '*']
  const operator = operators[Math.floor(Math.random() * operators.length)]
  let correctAnswer

  switch (operator) {
    case '+':
      correctAnswer = a + b
      break
    case '-':
      correctAnswer = a - b
      break
    case '*':
      correctAnswer = a * b
      break
    default:
      break
  }

  const question = `${a} ${operator} ${b}`
  return [question, correctAnswer]
}
