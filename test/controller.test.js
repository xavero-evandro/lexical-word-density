/* eslint-disable no-undef */
import dbHandler from './db-tests';
import httpMocks from 'node-mocks-http';
import Controller from '../src/controllers/Controller';
import { addLexicalWords } from '../src/migrateData';
let req, res, next;

beforeAll(async () => {
  await dbHandler.connect();
  await addLexicalWords();
});

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterAll(async () => {
  await dbHandler.clearDatabase();
  await dbHandler.closeDatabase();
});

describe('POST /complexity', () => {
  test('Should return 200 and the lexical density', async (done) => {
    req.body = {
      text: 'Test a String on a Text is the best thing in the world',
    };
    const result = {
      data: {
        density: {
          overall_ld: '1.00',
        },
      },
    };
    await Controller.getLexicalWordsDensity(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
    done();
  });

  test('Should return 400 if text have 100 words or 1000 characters', async (done) => {
    req.body = {
      text:
        'I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts I Test a Text againts everything in the world I Test a Text againts everything in the world I Test a Text againts',
    };
    const result = {
      error:
        'Only texts with up to 100 words or up to 1000 characters are valid input.',
    };
    await Controller.getLexicalWordsDensity(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual(result);
    done();
  });
});

describe('POST /complexity?mode=verbose', () => {
  test('Should return 200 and the lexical density and the sentence', async (done) => {
    req.query = {
      mode: 'verbose',
    };
    req.body = {
      text: 'Test. a String. on a Text. is the best thing. in the world.',
    };
    const result = {
      data: {
        density: {
          overall_ld: '0.92',
          sentence_ld: ['1.00', '1.00', '1.00', '0.75', '1.00'],
        },
      },
    };
    await Controller.getLexicalWordsDensity(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
    done();
  });
});

describe('POST /lexical-word', () => {
  test('Should return 200 with successful message ', async (done) => {
    req.body = {
      words: ['one', 'two', 'three', 'four', 'five'],
    };
    const result = {
      ok: 'New Words Added! (one,two,three,four,five)',
    };
    await Controller.addLexicalWords(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(result);
    done();
  });
});
