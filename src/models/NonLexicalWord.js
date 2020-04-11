import mongoose from 'mongoose';

const nonLexicalWordSchema = new mongoose.Schema({
  word: {
    type: String,
  },
});

const NonLexicalWord = mongoose.model('NonLexicalWord', nonLexicalWordSchema);

export default NonLexicalWord;
