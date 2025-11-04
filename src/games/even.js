import { getRandomNumber } from '../utils.js'

export const description =
  'Вы запустили игру «Чет-нечет». Правила: отвечайте «да», если число четное, в противном случае отвечайте «нет».'

export const generateRound = () => {
  const number = getRandomNumber(1, 100)
  const correctAnswer = number % 2 === 0 ? 'да' : 'нет'

  return [String(number), correctAnswer]
}
