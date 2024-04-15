const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const repository = require('./repository')

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`)
})

app.get('/produtos', repository.getProdutos)
app.get('/produtos/:id', repository.getProdutoById)
app.post('/produtos', repository.createProduto)
app.put('/produtos/:id', repository.updateProduto)
app.delete('/produtos/:id', repository.deleteProduto)