const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json())

const costumers = [];

app.listen(3333);

app.post('/account', (request, response) => {
  
  const { cpf, name }  = request.body;

  const costumerAlreadyExists = costumers.some((costumer) => costumer.cpf === cpf);

  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  if(costumerAlreadyExists) {
    return response.status(400).json({error: "Costumer already exists!"});
  }

  console.log(costumers);

  return response.status(201).send()

});