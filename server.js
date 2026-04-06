const express = require('express');
const fs = require('fs');

const app = express();

// IMPORTANTE: usar porta do Render
const PORT = process.env.PORT;

// carregar base
const alunos = JSON.parse(fs.readFileSync('./alunos_fiap_watson.json', 'utf8'));

// rota teste
app.get('/', (req, res) => {
  res.send('API FIAP funcionando 🚀');
});

// rota principal
app.get('/alunos/:rm', (req, res) => {
  const rm = req.params.rm.toUpperCase();

  const aluno = alunos.find(a => a.rm === rm);

  if (!aluno) {
    return res.status(404).json({
      encontrado: false,
      mensagem: 'RM não cadastrado'
    });
  }

  res.json({
    encontrado: true,
    ...aluno
  });
});

// ESSA LINHA É CRÍTICA
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
