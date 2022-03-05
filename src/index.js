const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json())

const customers = [];

app.post('/account', (request, response) => {
  
  const { cpf, name }  = request.body;

  const costumerAlreadyExists = customers.some((costumer) => costumer.cpf === cpf);

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  if(costumerAlreadyExists) {
    return response.status(400).json({error: "Costumer already exists!"});
  }

  console.log(customers);

  return response.status(201).send()

});

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;
  
  const costumer = customers.find(customer => customer.cpf === cpf);

    return response.json(costumer.statement);

});

app.listen(3333);