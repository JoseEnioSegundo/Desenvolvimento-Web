from fastapi import FastAPI
from typing import Optional

app = FastAPI()

produtos = [
    {"id": 1, "nome": "Notebook", "preco": 3500},
    {"id": 2, "nome": "Mouse", "preco": 80},
    {"id": 3, "nome": "Teclado", "preco": 150},
    {"id": 4, "nome": "Monitor", "preco": 1200},
    {"id": 5, "nome": "Impressora", "preco": 300},
]

@app.get("/produtos/{id_produto}")
def get_produto(id_produto: int):
    for produto in produtos:
        if produto["id"] == id_produto:
            return produto
    return {"erro": "Produto não encontrado"}

@app.get("/produtos")
def listar_produtos(categoria: Optional[str] = None):
    # Como ainda não temos banco, o filtro é apenas ilustrativo
    return produtos