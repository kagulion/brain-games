import readlineSync from 'readline-sync'
import colors from 'yoctocolors'

export const runGame = (generateRound, description) => {
  console.log(colors.yellow('Добро пожаловать в «Игры разума»'))
  console.log(description)

  const name = readlineSync.question('Как вас зовут? ')
  console.log(`Привет, ${name}!`)

  for (let i = 0; i < 3; i += 1) {
    const [question, correctAnswer] = generateRound()
    console.log(`Вопрос: ${question}`)
    const userAnswer = readlineSync.question('Ваш ответ: ')

    if (userAnswer === correctAnswer) {
      console.log(colors.greenBright('Правильно!'))
    } else {
      console.log(
        colors.redBright(`Неверно ;(. Правильный ответ: ${correctAnswer}`)
      )
      console.log(
        colors.yellow(
          `Давайте попробуем снова, ${name}! Введите команду заново.`
        )
      )
      return
    }
  }

  console.log(colors.bgGreenBright(`Поздравляем, ${name}!`))
}
