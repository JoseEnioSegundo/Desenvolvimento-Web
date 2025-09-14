const express = require("express");
const app = express();

app.use(express.json()); // Permite que o servidor leia JSON no corpo das requisições

// "Banco de dados" em memória
let produtos = [
  { id: 1, nome: "Teclado", preco: 199.9 },
  { id: 2, nome: "Mouse", preco: 89.9 },
];

// ========================
// ROTAS
// ========================

// Rota GET - listar todos os produtos
app.get("/produtos", (req, res) => {
  res.json([...produtos]); // devolve uma cópia do array
});

// Rota GET por ID - buscar um produto específico
app.get("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find((p) => p.id === id);
  if (!produto) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  res.json(produto);
});

// Rota POST - criar um novo produto
app.post("/produtos", (req, res) => {
  const novoId =
    produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;
  const novoProduto = { id: novoId, ...req.body };

  produtos.push(novoProduto);

  res.status(201).json({
    message: "Produto criado com sucesso",
    dados: novoProduto,
  });
});

// Rota DELETE - excluir um produto por ID
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  const produtoDeletado = produtos.splice(index, 1)[0];

  res.status(200).json({
    message: "Produto deletado com sucesso",
    dados: produtoDeletado,
  });
});

// Inicia o servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// ========================
// INSTRUÇÕES DE TESTE
// ========================

// 1. Rodar o servidor:
//    node index.js

// 2. Testar GET (listar todos os produtos):
//    curl http://localhost:3000/produtos

// 3. Testar GET por ID (buscar produto 1):
//    curl http://localhost:3000/produtos/1

// 4. Testar POST (criar produto):
//    curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome":"Monitor","preco":1200.00}'

// 5. Testar DELETE (deletar produto 2):
//    curl -X DELETE http://localhost:3000/produtos/2
