const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const caminhoBase = path.join(__dirname, 'alunos_fiap_watson.json');
const alunos = JSON.parse(fs.readFileSync(caminhoBase, 'utf8'));

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    mensagem: 'API de consulta de alunos FIAP funcionando.',
    endpoint: '/alunos/:rm'
  });
});

app.get('/alunos/:rm', (req, res) => {
  const rm = String(req.params.rm || '').toUpperCase().trim();

  if (!/^RM\d{6}$/.test(rm)) {
    return res.status(400).json({
      encontrado: false,
      mensagem: 'Formato de RM inválido. Use RM seguido de 6 números.'
    });
  }

  const aluno = alunos.find(a => a.rm === rm);

  if (!aluno) {
    return res.status(404).json({
      encontrado: false,
      mensagem: 'RM não cadastrado'
    });
  }

  return res.status(200).json({
    encontrado: true,
    ...aluno
  });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});