import readlineSync from 'readline-sync'
import colors from 'yoctocolors'
import { runGame } from './index.js'

// Мокируем зависимости
jest.mock('readline-sync')
jest.mock('yoctocolors', () => ({
  yellow: jest.fn((text) => text),
  greenBright: jest.fn((text) => text),
  redBright: jest.fn((text) => text),
  bgGreenBright: jest.fn((text) => text),
}))

// Мокируем console.log
const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

describe('runGame', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  test('должна приветствовать пользователя и выводить описание', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'

    readlineSync.question.mockReturnValueOnce('Игрок')

    runGame(mockGenerateRound, mockDescription)

    expect(consoleSpy).toHaveBeenCalledWith('Добро пожаловать в «Игры разума»')
    expect(consoleSpy).toHaveBeenCalledWith(mockDescription)
  })

  test('должна запрашивать имя пользователя', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'

    readlineSync.question.mockReturnValueOnce('Игрок')

    runGame(mockGenerateRound, mockDescription)

    expect(readlineSync.question).toHaveBeenCalledWith('Как вас зовут? ')
  })

  test('должна приветствовать пользователя по имени', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'
    const playerName = 'Иван'

    readlineSync.question.mockReturnValueOnce(playerName)

    runGame(mockGenerateRound, mockDescription)

    expect(consoleSpy).toHaveBeenCalledWith(`Привет, ${playerName}!`)
  })

  test('должна играть три раунда при правильных ответах', () => {
    const mockGenerateRound = jest
      .fn()
      .mockReturnValueOnce(['10', 'да'])
      .mockReturnValueOnce(['15', 'нет'])
      .mockReturnValueOnce(['20', 'да'])
    const mockDescription = 'Тестовое описание игры'

    readlineSync.question
      .mockReturnValueOnce('Игрок')
      .mockReturnValueOnce('да')
      .mockReturnValueOnce('нет')
      .mockReturnValueOnce('да')

    runGame(mockGenerateRound, mockDescription)

    expect(mockGenerateRound).toHaveBeenCalledTimes(3)
    expect(consoleSpy).toHaveBeenCalledWith('Вопрос: 10')
    expect(consoleSpy).toHaveBeenCalledWith('Вопрос: 15')
    expect(consoleSpy).toHaveBeenCalledWith('Вопрос: 20')
  })

  test('должна завершаться победой при трех правильных ответах', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'
    const playerName = 'Победитель'

    readlineSync.question
      .mockReturnValueOnce(playerName)
      .mockReturnValueOnce('да')
      .mockReturnValueOnce('да')
      .mockReturnValueOnce('да')

    runGame(mockGenerateRound, mockDescription)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Поздравляем')
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(playerName)
    )
  })

  test('должна завершаться поражением при неправильном ответе', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'
    const playerName = 'Проигравший'

    readlineSync.question
      .mockReturnValueOnce(playerName)
      .mockReturnValueOnce('нет') // неправильный ответ

    runGame(mockGenerateRound, mockDescription)

    // Проверяем, что colors.redBright был вызван с правильным сообщением
    expect(colors.redBright).toHaveBeenCalledWith(
      expect.stringContaining('Неверно')
    )
    // Проверяем, что console.log был вызван с результатом colors.redBright (текст)
    const redBrightCalls = colors.redBright.mock.calls
    expect(redBrightCalls.length).toBeGreaterThan(0)
    const errorMessage = redBrightCalls[0][0]
    expect(errorMessage).toContain('Неверно')
    expect(errorMessage).toMatch(/Правильн.*ответ.*да/)

    // Проверяем, что colors.yellow был вызван (первый раз для приветствия, второй для сообщения об ошибке)
    expect(colors.yellow).toHaveBeenCalledWith(
      expect.stringContaining('Давайте попробуем снова')
    )
    const yellowCalls = colors.yellow.mock.calls
    // Находим вызов с сообщением об ошибке (последний вызов)
    const retryMessage = yellowCalls[yellowCalls.length - 1][0]
    expect(retryMessage).toContain('Давайте попробуем снова')
    expect(retryMessage).toContain(playerName)
  })

  test('не должна играть следующие раунды после неправильного ответа', () => {
    const mockGenerateRound = jest
      .fn()
      .mockReturnValueOnce(['10', 'да'])
      .mockReturnValueOnce(['15', 'нет'])
    const mockDescription = 'Тестовое описание игры'

    readlineSync.question
      .mockReturnValueOnce('Игрок')
      .mockReturnValueOnce('нет') // неправильный ответ

    runGame(mockGenerateRound, mockDescription)

    expect(mockGenerateRound).toHaveBeenCalledTimes(1)
  })

  test('должна выводить "Правильно!" при правильном ответе', () => {
    const mockGenerateRound = jest.fn(() => ['10', 'да'])
    const mockDescription = 'Тестовое описание игры'

    readlineSync.question
      .mockReturnValueOnce('Игрок')
      .mockReturnValueOnce('да')

    runGame(mockGenerateRound, mockDescription)

    expect(consoleSpy).toHaveBeenCalledWith('Правильно!')
  })

  test('должна обрабатывать второй неправильный ответ правильно', () => {
    const mockGenerateRound = jest
      .fn()
      .mockReturnValueOnce(['10', 'да'])
      .mockReturnValueOnce(['15', 'нет'])
    const mockDescription = 'Тестовое описание игры'
    const playerName = 'Игрок'

    readlineSync.question
      .mockReturnValueOnce(playerName)
      .mockReturnValueOnce('да') // правильный ответ
      .mockReturnValueOnce('да') // неправильный ответ (ожидается 'нет')

    runGame(mockGenerateRound, mockDescription)

    expect(mockGenerateRound).toHaveBeenCalledTimes(2)
    expect(consoleSpy).toHaveBeenCalledWith('Правильно!')
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Неверно')
    )
  })
})

