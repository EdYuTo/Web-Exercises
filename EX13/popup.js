'use strict';

var palavras = ['acabamento', 'acampamento', 'aco', 'acorde', 'acucar', 'adequada', 'agora', 'agua', 'ainda', 'aldeia', 'alegria', 'algodao', 'alimentacao', 'alimentos', 'amigo', 'ampla', 'amplo', 'anel', 'animais', 'ano', 'apoio', 'ar', 'area', 'areia', 'arte', 'arvore', 'asa', 'assento', 'assunto', 'ato', 'atomo', 'aviao', 'aviso', 'banco', 'banda', 'bar', 'barco', 'base', 'bastao', 'bebe', 'bebida', 'beleza', 'bem', 'bloco', 'boca', 'bola', 'bom', 'borda', 'braco', 'branco', 'brilhante', 'brilho', 'buraco', 'cabeca', 'cabelo', 'caca', 'cadeira', 'caixa', 'cama', 'caminhao', 'caminho', 'campo', 'cancao', 'canto', 'cao', 'capitao', 'carne', 'carro', 'carta', 'cartao', 'casa', 'casaco', 'casca', 'cauda', 'causa', 'cavalo', 'cedo', 'celular', 'ceu', 'chapeu', 'chave', 'chefe', 'cheiro', 'chuva', 'cidade', 'ciencia', 'circulo', 'classe', 'cobertura', 'coisa', 'colheita', 'colonia', 'coluna', 'comercio', 'companhia', 'comprimento', 'condicao', 'conjunto', 'conselho', 'consoante', 'continente', 'controle', 'copia', 'cor', 'coracao', 'corda', 'corpo', 'corrego', 'correto', 'corrida', 'corte', 'costa', 'cozinheiro', 'crianca', 'cuidados', 'curso', 'curta', 'dedo', 'dentes', 'desejo', 'deserto', 'deslizamento', 'dia', 'dicionario', 'dinheiro', 'direcao', 'direito', 'discurso', 'diversao', 'efeito', 'elemento', 'elevador', 'energia', 'equipe', 'escala', 'escola', 'escravo', 'escritorio', 'espaco', 'esposa', 'estacao', 'estado', 'estrada', 'estrela', 'estudante', 'estudo', 'evento', 'exata', 'exemplo', 'exercicio', 'experiencia', 'exposicao', 'familia', 'fato', 'fazenda', 'feira', 'ferramenta', 'ferro', 'festa', 'figo', 'figura', 'filho', 'flor', 'floresta', 'fogo', 'folha', 'forma', 'fracao', 'frase', 'frio', 'frutas', 'gama', 'gas', 'gato', 'gelo', 'geral', 'golpe', 'gordura', 'grafico', 'grama', 'grau', 'grito', 'grupo', 'guerra', 'habilidade', 'historia', 'homem', 'horas', 'humano', 'idade', 'ideia', 'ilha', 'ima', 'imagem', 'imprensa', 'impressao', 'industria', 'inferior', 'inicio', 'inimigo', 'inseto', 'instrumento', 'inteiro', 'inverno', 'irma', 'irmao', 'janela', 'jardim', 'jogo', 'jovem', 'juros', 'lado', 'lago', 'lata', 'leite', 'leste', 'libra', 'linguagem', 'linha', 'liquido', 'lista', 'livre', 'livro', 'local', 'loja', 'lua', 'lugar', 'luta', 'luz', 'maca', 'madeira', 'mae', 'maneira', 'manha', 'mao', 'mapa', 'maquina', 'mar', 'marca', 'massa', 'medico', 'medo', 'melodia', 'menina', 'menino', 'mente', 'mentira', 'mercado', 'mergulho', 'mes', 'mesa', 'mestre', 'metade', 'metodo', 'milha', 'milhao', 'milho', 'mina', 'minusculo', 'minuto', 'moderno', 'molecula', 'momento', 'montanha', 'morte', 'morto', 'motor', 'movimento', 'mudanca', 'mulher', 'multa', 'multidao', 'mundo', 'musica', 'nacao', 'nariz', 'natureza', 'navio', 'negocio', 'neve', 'nivel', 'noite', 'norte', 'numeral', 'numero', 'nuvem', 'objeto', 'oceano', 'oeste', 'oferta', 'oleo', 'olho', 'ombro', 'onda', 'oportunidade', 'ordem', 'orgao', 'osso', 'ou', 'ouro', 'ouvido', 'ovo', 'oxigenio', 'padrao', 'pagina', 'pai', 'pais', 'pao', 'papel', 'par', 'paragrafo', 'parede', 'parte', 'passado', 'passaro', 'passeio', 'passo', 'pato', 'pausa', 'pe', 'peca', 'pedra', 'peixe', 'pele', 'pensava', 'pequeno', 'perdido', 'pergunta', 'perguntar', 'pergunto', 'perigo', 'periodo', 'perna', 'pes', 'pescoco', 'peso', 'pesquisa', 'pessoa', 'pinto', 'piso', 'pistola', 'planeta', 'plano', 'planta', 'plantacao', 'pneu', 'pobre', 'poema', 'polegada', 'ponto', 'porta', 'porto', 'posicao', 'prata', 'pratica', 'prazo', 'presente', 'preto', 'primavera', 'principal', 'problema', 'processo', 'produto', 'projeto', 'pronto', 'propagacao', 'propriedade', 'proprio', 'quadrado', 'quarto', 'quatro', 'quintal', 'quociente', 'radio', 'raiva', 'raiz', 'ramo', 'razao', 'reais', 'regiao', 'registro', 'regra', 'rei', 'reivindicacao', 'relogio', 'repeticao', 'resposta', 'resto', 'resultado', 'reta', 'rico', 'rio', 'risada', 'rocha', 'roda', 'rodada', 'rolo', 'rosto', 'rua', 'ruido', 'sal', 'sangue', 'sapato', 'seca', 'secao', 'seculo', 'segmento', 'seguro', 'semana', 'semente', 'senhora', 'senhorita', 'sentenca', 'sentido', 'serra', 'silaba', 'sinal', 'sino', 'sistema', 'sol', 'soldado', 'solo', 'solucao', 'som', 'sono', 'sorriso', 'substancia', 'substantivo', 'sucesso', 'sufixo', 'sul', 'superficie', 'surpresa', 'tamanho', 'tarde', 'temperatura', 'tempo', 'temporada', 'terno', 'terra', 'teste', 'tipo', 'tom', 'topo', 'trabalho', 'trecho', 'trem', 'triangulo', 'trilha', 'trilho', 'tubo', 'unidade', 'vaca', 'vale', 'valor', 'vara', 'vela', 'velho', 'velocidade', 'vento', 'verao', 'verbo', 'verdade', 'verde', 'vestido', 'viagem', 'vida', 'vidro', 'vinco', 'visita', 'vista', 'vitoria', 'vizinho', 'vogal', 'vontade', 'voz'];

for(var i = 0; i < 10; i++) {
    var dropdown = document.getElementById("palavraAleatoria");
    var opcao = document.createElement('option');
    opcao.text = palavras[Math.floor(Math.random() * palavras.length)];
    dropdown.add(opcao, 0);
};

function search(texto) {
  window.open('http://google.com/search?q='+texto, "_blank");
};

submit.onclick = function() {
  var palavraAleatoria = document.getElementById("palavraAleatoria").value;
  var texto = document.getElementById("busca").value;
  search(texto);
  search(texto+" "+palavraAleatoria);
};
