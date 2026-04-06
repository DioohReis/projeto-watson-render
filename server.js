const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Carrega a base de alunos
const caminhoBase = path.join(__dirname, 'alunos_fiap_watson.json');
const alunos = JSON.parse(fs.readFileSync(caminhoBase, 'utf8'));

// Rota inicial de teste
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    mensagem: 'API de consulta de alunos FIAP funcionando.',
    endpoint_teste: '/alunos/RM573301'
  });
});

// Rota principal
app.get('/alunos/:rm', (req, res) => {
  const rm = String(req.params.rm || '').toUpperCase().trim();

  // Validação do formato do RM
  if (!/^RM\d{6}$/.test(rm)) {
    return res.status(200).json({
      encontrado: false,
      mensagem: 'Formato de RM inválido. Use RM seguido de 6 números.'
    });
  }

  // Busca do aluno
  const aluno = alunos.find(a => a.rm === rm);

  // Caso não encontre
  if (!aluno) {
    return res.status(200).json({
      encontrado: false,
      mensagem: 'RM não cadastrado'
    });
  }

  // Caso encontre
  return res.status(200).json({
    encontrado: true,
    rm: aluno.rm,
    nome: aluno.nome,
    curso: aluno.curso,
    periodo: aluno.periodo,
    matriculado: aluno.matriculado
  });
});

// Inicialização do servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
