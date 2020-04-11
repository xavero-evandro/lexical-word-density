import NonLexicalWord from '../models/NonLexicalWord';

const getNonLexicalWords = async () => {
  const words = await NonLexicalWord.find();
  return words.map((item) => item['word']);
};

const getDensity = async (text, nonLexicalWords) => {
  const words = text
    .replace(/[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g, '')
    .split(' ')
    .filter((item) => item !== '');
  const wordsFiltered = words.filter((word) => !nonLexicalWords.includes(word));
  return Number(wordsFiltered.length / words.length).toFixed(2);
};

export const lexicalWordDensity = async (text, verboseMode = false) => {
  const nonLexicalWords = await getNonLexicalWords();
  text = text.trim().toLowerCase();

  let sentenceDensity = [];
  let lexicalResult = {};
  if (verboseMode) {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
    sentences.map(async (sentence) => {
      sentenceDensity.push(await getDensity(sentence, nonLexicalWords));
    });
    lexicalResult.sentence_ld = sentenceDensity;
  }

  lexicalResult.overall_ld = await getDensity(text, nonLexicalWords);

  return lexicalResult;
};
