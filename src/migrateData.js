import * as nonLexicalWords from '../assets/nonLexicalWords.json';
import NonLexicalWord from '../src/models/NonLexicalWord';
import logger from '../config/logger';

export const insertNewLexicalWords = async (words) => {
  try {
    await words.map(async (word) => {
      const found = await NonLexicalWord.findOne({ word: word });
      if (!found) {
        await NonLexicalWord.create({ word: word });
      }
    });
    return true;
  } catch (error) {
    return logger.error(error.message);
  }
};

export const addLexicalWords = async (words = nonLexicalWords.data) => {
  try {
    return await insertNewLexicalWords(words);
  } catch (error) {
    return logger.error(error.message);
  }
};
