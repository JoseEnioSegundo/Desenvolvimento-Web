const express = require("express");
const app = express();

app.use(express.json());

// "Banco de dados" em memória
let produtos = [
  { id: 1, nome: "Teclado", preco: 199.9 },
  { id: 2, nome: "Mouse", preco: 89.9 },
];

// Rota GET
app.get("/produtos", (req, res) => {
  res.json([...produtos]); // cópia para evitar alteração acidental
});

// Rota POST
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
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
//CRIAR PRODUTO VIA TERMINAL. FORA DO TERMINAL PRINCIPAL, ABRIR OUTRO TERMINAL E RODAR O COMANDO ABAIXO:
//curl -X POST http://localhost:3000/produtos -H "Content-Type: application/json" -d '{"nome":"Monitor","preco":1200.00}'
// Instruções para testar:
//node index.js