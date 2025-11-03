const generateRound = () => {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  const operators = ['+', '-', '*']
  const operator = operators[Math.floor(Math.random() * operators.length)]
  const question = `${a} ${operator} ${b}`
  const correctAnswer = String(eval(question))

  return [question, correctAnswer]
}

// export default () => runGame(generateRound, 'Сколько будет?')