import readlineSync from 'readline-sync'

const runGame = (generateRound, description) => {
  console.log('Добро пожаловать в «Игры разума»')
  console.log(description)

  const name = readlineSync.question('Как вас зовут? ')
  console.log(`Привет, ${name}!`)

  for (let i = 0; i < 3; i += 1) {
    const [question, correctAnswer] = generateRound()
    console.log(`Вопрос: ${question}`)
    const userAnswer = readlineSync.question('Ваш ответ: ')

    if (userAnswer === correctAnswer) {
      console.log('Правильно!')
    } else {
      console.log(
        `'${userAnswer}' неверно ;(. Правильный ответ: ${correctAnswer}`
      )
      console.log(`Давайте попробуем снова, ${name}!`)
      return
    }
  }

  console.log(`Поздравляем, ${name}!`)
}

export default runGame