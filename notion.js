// ========== CONFIGURAÇÃO ==========
const PROXY_URL = "https://dashboard-oficial.jorewmario.workers.dev/dados";
// ==================================

async function carregarDados() {
  try {
    const res = await fetch(PROXY_URL);
    const data = await res.json();

    console.log("Resposta do proxy:", data); // para debug

    if (!data || !data.results) {
      throw new Error("A resposta do proxy não contém 'results'. Veja o console.");
    }

    const resultados = processarDados(data.results);
    renderizar(resultados);
  } catch (erro) {
    document.getElementById("cards").innerHTML = "Erro ao carregar dados: " + erro.message;
    console.error(erro);
  }
}

function processarDados(paginas) {
  if (!paginas || !Array.isArray(paginas)) {
    return {
      participacao: 0,
      comAtividade: 0,
      total: 0
    };
  }

  let totalDias = paginas.length;
  let diasComParticipacao = 0;
  let diasComAtividade = 0;

  paginas.forEach(pagina => {
    const props = pagina.properties;

    // Checkbox de participação
    const participou = 
      props["Participei"]?.checkbox || 
      props["Participei (Checkbox)"]?.checkbox ||
      props["Participou"]?.checkbox;

    if (participou === true) {
      diasComParticipacao++;
    }

    // Relação "Meu Progresso"
    const progresso = props["Meu Progresso"]?.relation;

    if (progresso && Array.isArray(progresso) && progresso.length > 0) {
      diasComAtividade++;
    }
  });

  return {
    participacao: totalDias > 0 ? Math.round((diasComParticipacao / totalDias) * 100) : 0,
    comAtividade: totalDias > 0 ? Math.round((diasComAtividade / totalDias) * 100) : 0,
    total: totalDias
  };
}

function renderizar(dados) {
  const cards = document.getElementById("cards");

  cards.innerHTML = `
    <div class="card">
      <div class="circle" style="--percent: \( {dados.participacao}"> \){dados.participacao}%</div>
      <strong>Participação Geral</strong>
      <small>${dados.total} dias registrados</small>
    </div>
    <div class="card">
      <div class="circle" style="--percent: \( {dados.comAtividade}"> \){dados.comAtividade}%</div>
      <strong>Dias com Atividade</strong>
      <small>Religião, Acadêmico, Treino...</small>
    </div>
  `;
}

// Inicia o carregamento quando a página abrir
carregarDados();
