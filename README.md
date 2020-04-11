# Lexical Word Density

## Receive a Text and return a lexical word density

### Express API running on port 3000

### Please copy the .env.example (cp .env.example .env) and set our environment variables (MONGODB_URI, PORT)

### For the sake of simplicity I added a migrate function inside the server.js file to add all lexical words that are inside the nonLexicalWords.json file

### Docker compose file included with mongodb

#### Just run

```
docker-compose up -d
```

### Standard node server with our local mongodb

#### Just run

```
npm install
```

#### then

```
npm run start
```

## End points

## Route: /complexity

### Return the lexical density of the inputted text. The input text should be provided via the request.

#### Request Body:

```
{
	"text": "I Test a Text against everything in the world"
}
```

### Output :

```
{
  "data": {
    "density": {
      "overall_ld": "0.67"
    }
  }
}
```

## Route: /complexity?mode=verbose

### Return the lexical density of the text broken down into sentences. The input text should be provided via the request.

#### Request Body:

```
{
	"text": "I Test. a Text against. everything. in the world."
}
```

### Output :

```
{
  "data": {
    "density": {
      "sentence_ld": [
        "1.00",
        "0.67",
        "1.00",
        "0.33"
      ],
      "overall_ld": "0.67"
    }
  }
}
```

## To run test

```
npm run test
```

## I also include a insomnia export file with some request examples

## Fell Free to improve it
