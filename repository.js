const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123@web',
  port: 5432,
})

const getProdutos = (request, response) => {
    pool.query('SELECT id, product_name, description, quantity, status FROM public.products ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getProdutoById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT id, product_name, description, quantity, status FROM public.products WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createProduto = (request, response) => {
    const { product_name, description, quantity, status } = request.body
  
    pool.query('INSERT INTO public.products (product_name, description, quantity, status) VALUES ($1, $2, $3, $4)', [product_name, description, quantity, status], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Produto criado com sucesso.`)
    })
  }
  
  const updateProduto = (request, response) => {
    const id = parseInt(request.params.id)
    const { product_name, description, quantity, status } = request.body
  
    pool.query(
      'UPDATE public.products SET product_name=$1, description=$2, quantity=$3, status= $4 WHERE id = $5',
      [product_name, description, quantity, status, id],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Produto ${id} atualizado com sucesso.`)
      }
    )
  }
  
  const deleteProduto = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM public.products WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Produto excluído com sucesso: ${id}`)
    })
  }
  
  module.exports = {
    getProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProduto,
  }