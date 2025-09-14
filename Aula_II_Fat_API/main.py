from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# Modelo para itens
class Item(BaseModel):
    id: int
    nome: str
    preco: float

# Modelo para POST
class ItemInput(BaseModel):
    nome: str
    preco: float

# Modelo para resposta de POST
class ItemInputResponse(BaseModel):
    message: str
    dados: Item

# Lista de itens em memória
items = [
    Item(id=1, nome="Notebook", preco=3500.00),
    Item(id=2, nome="Mouse", preco=80.00),
    Item(id=3, nome="Teclado", preco=150.00),
    Item(id=4, nome="Monitor", preco=1200.00),
    Item(id=5, nome="Impressora", preco=300.00),
]

# Rota GET
@app.get("/produtos", response_model=list[Item])
def listar_produtos():
    return [
       {"id": item.id, "nome": item.nome, "preco": item.preco} for item in items
    ]

# Rota POST
@app.post("/produtos", response_model=ItemInputResponse)
def criar_produto(item: ItemInput):
    novo_id = max(item.id for item in items) + 1
    novo_item = Item(id=novo_id, **item.model_dump())
    items.append(novo_item)
    response = ItemInputResponse(message="Produto criado com sucesso", dados=novo_item)
    return response.model_dump()

# Rodar servidor:
# uvicorn main:app --reload