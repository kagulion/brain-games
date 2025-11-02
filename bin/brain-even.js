#!/usr/bin/env node
import runGame from '../src/index.js'

const description = 'Вы запустили игру «Чет-нечет». Правила: отвечайте «да», если число четное, в противном случае отвечайте «нет».'

const generateRound = () => {
  const number = Math.floor(Math.random() * 100)
  const question = number
  const correctAnswer = number % 2 === 0 ? 'да' : 'нет'

  return [question, correctAnswer]
}

runGame(generateRound, description)