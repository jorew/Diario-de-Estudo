// ========== CONFIGURAÇÃO ==========
const PROXY_URL = "https://dashboard-oficial.jorewmario.workers.dev/dados";
// ==================================

async function carregarDados() {
  try {
    const res = await fetch(PROXY_URL);
    const data = await res.json();

    console.log("Resposta do proxy:", data);

    // Agora o proxy já devolve os percentuais prontos
    if (!data || data.participacao === undefined) {
      throw new Error("A resposta do proxy está incompleta. Veja o console.");
    }

    renderizar(data);
  } catch (erro) {
    document.getElementById("cards").innerHTML = "Erro ao carregar dados: " + erro.message;
    console.error(erro);
  }
}

function renderizar(dados) {
  const cards = document.getElementById("cards");

  cards.innerHTML = `
    <div class="card">
      <div class="circle" style="--percent: ${dados.participacao}">${dados.participacao}%</div>
      <strong>Participação Geral</strong>
      <small>${dados.totalDias || 0} dias</small>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.religiao}">${dados.religiao}%</div>
      <strong>Religião</strong>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.academico}">${dados.academico}%</div>
      <strong>Acadêmico</strong>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.treino}">${dados.treino}%</div>
      <strong>Treino</strong>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.familia}">${dados.familia}%</div>
      <strong>Família</strong>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.enem}">${dados.enem}%</div>
      <strong>Enem</strong>
    </div>

    <div class="card">
      <div class="circle" style="--percent: ${dados.leitura}">${dados.leitura}%</div>
      <strong>Leitura</strong>
    </div>
  `;
}

// Inicia quando a página carregar
carregarDados();
