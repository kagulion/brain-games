#!/usr/bin/env node
import { runGame } from '../src/index.js'
import { generateRound, description } from '../src/games/progression.js'

runGame(generateRound, description)
