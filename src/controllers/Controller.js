'use strict';
import logger from '../../config/logger';
import { lexicalWordDensity } from '../service/lexicalWordDensity';
import { stringSizeValidator } from '../utils/stringSizeValidator';
import { addLexicalWords } from '../migrateData';

const Controller = {
  getLexicalWordsDensity: async function (req, res, next) {
    try {
      const { text } = req.body;
      if (!stringSizeValidator(text)) {
        return res.status(400).json({
          error:
            'Only texts with up to 100 words or up to 1000 characters are valid input.',
        });
      }

      const verboseMode = req.query.mode === 'verbose' ? true : false;
      const density = await lexicalWordDensity(text, verboseMode);

      return res.status(200).json({ data: { density } });
    } catch (e) {
      logger.error(e.message);
      return next(e);
    }
  },
  addLexicalWords: async function (req, res, next) {
    try {
      const { words } = req.body;
      await addLexicalWords(words);
      return res.status(200).json({ ok: `New Words Added! (${[...words]})` });
    } catch (e) {
      logger.error(e.message);
      return next(e);
    }
  },
};

export default Controller;
