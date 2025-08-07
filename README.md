# 🧠 MCP Example com Node.js + TypeScript

Este é um projeto de estudo que implementa um servidor no padrão **Model Context Protocol (MCP)** usando **Node.js**, **TypeScript** e o SDK oficial da [ModelContextProtocol](https://modelcontextprotocol.io).

## 📚 Objetivo

Explorar como criar um servidor MCP que permite uma **LLM (Large Language Model)** interagir com ferramentas (tools) que consomem dados de uma API REST.  
Neste exemplo, usamos a **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** como API fake para simular um sistema de usuários e posts.

---

## 🔧 Tecnologias utilizadas

- Node.js + TypeScript
- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- zod (validação de schemas)
- fetch API

---

## 📁 Estrutura do projeto


```markdown
📦 mcp-example/
├── tools/
│   ├── users.ts         # Tools e handlers relacionados a usuários
│   └── posts.ts         # Tools e handlers relacionados a posts
├── config/
│   └── api.ts           # Configuração da base da API
├── index.ts             # Arquivo principal que roda o servidor MCP
├── package.json
└── tsconfig.json
```

## 🚀 Como funciona?

### 🧠 Conceito do MCP

O **Model Context Protocol (MCP)** permite que você exponha funções (chamadas *tools*) que uma LLM pode chamar durante a conversa.  
Essas tools são descritas por um schema JSON (entrada e saída), e o servidor MCP executa o que for solicitado pela LLM.

---

### ⚙ Ferramentas implementadas

| Tool Name             | Descrição                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `usuarios_schema`     | Lista todos os usuários cadastrados na API                               |
| `posts_user_schema`   | Lista todos os posts de um usuário (via `userId`)                         |
| `posts_new_schema`    | Cria um novo post para um usuário com título e conteúdo personalizados    |

---

## 📥 Requisições utilizadas

Usamos a [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) para simular as interações reais:

- `GET /users`
- `GET /posts?userId=1`
- `POST /posts`

---

## 🧪 Exemplo de retorno da tool `usuarios_schema`

```json
{
  "content": [
    {
      "type": "text",
      "text": "👥 Lista de usuários encontrados:\n• Leanne Graham (Sincere@april.biz)\n• Ervin Howell (Shanna@melissa.tv)"
    }
  ]
}
````

---

## ▶️ Como rodar o projeto

```bash
# Instale as dependências
npm install

# Compile o projeto
tsc

# Execute o servidor MCP
node build/index.js
```

> Obs: este projeto está configurado para rodar com STDIO (modo CLI). Ideal para testes com LLMs locais como Claude via [Claude Desktop](https://github.com/johnsmithm/claude-desktop) ou ferramentas similares.


## 🧠 Créditos e inspiração

* [ModelContextProtocol](https://modelcontextprotocol.io/)
* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
* Projeto criado por \[Seu Nome ou GitHub] como laboratório de aprendizado 🚀

---

## 📄 Licença

Projeto livre para fins de estudo e uso não comercial.

```
