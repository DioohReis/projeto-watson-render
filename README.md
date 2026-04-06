# Projeto Watson + Render

## Arquivos
- `server.js`: API Node.js com Express
- `package.json`: dependências do projeto
- `alunos_fiap_watson.json`: base fictícia de alunos
- `openapi_alunos_fiap_watson.json`: arquivo para importar no IBM watsonx Assistant

## Como rodar localmente
```bash
npm install
npm start
```

A API ficará disponível em:
```bash
http://localhost:3000
```

Teste:
```bash
http://localhost:3000/alunos/RM573301
```

## Como subir no Render
1. Crie um repositório no GitHub
2. Envie esses arquivos para o repositório
3. Acesse o Render
4. Clique em **New +**
5. Escolha **Web Service**
6. Conecte seu GitHub
7. Selecione o repositório
8. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
9. Clique em **Create Web Service**

## Depois de publicar
O Render vai gerar uma URL parecida com:
```text
https://seu-projeto.onrender.com
```

Abra o arquivo `openapi_alunos_fiap_watson.json` e troque:
```json
"https://SEU-ENDERECO-DA-API.onrender.com"
```

pela sua URL real.

## Como usar no IBM watsonx Assistant
1. Abra seu Assistant
2. Vá em **Integrations**
3. Clique em **Build custom extension**
4. Importe `openapi_alunos_fiap_watson.json`
5. Volte em **Actions**
6. Na sua action de consulta, adicione a chamada da extensão
7. Passe o RM digitado pelo aluno para o parâmetro `rm`

## Fluxo sugerido do chatbot
### Mensagem inicial
Olá! Digite seu RM no formato RM123456 para consultar seus dados.

### Regex
```regex
^RM\d{6}$
```

### Resposta quando encontrar
Cadastro localizado com sucesso.

RM: {{rm}}
Nome: {{nome}}
Curso: {{curso}}
Período: {{periodo}}
Matriculado: {{matriculado}}

### Resposta quando não encontrar
Não encontrei nenhum aluno com esse RM.
Vamos tentar novamente desde o início.
Digite seu RM no formato RM123456.