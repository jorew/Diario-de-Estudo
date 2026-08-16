const PROXY_URL = "https://dashboard-streaks.jorewmario.workers.dev/dados"; // ← coloque a URL do seu worker
    // ==================================

    async function carregarDados() {
      try {
        const res = await fetch(PROXY_URL);
        const data = await res.json();

        // Aqui você processa os dados do Notion
        // Exemplo simplificado (você vai adaptar conforme suas propriedades)
        const resultados = processarDados(data.results);

        renderizar(resultados);
      } catch (erro) {
        document.getElementById("cards").innerHTML = "Erro ao carregar dados: " + erro.message;
      }
    }

    function processarDados(paginas) {
      // Exemplo: conta quantos dias tiveram participação
      // Você precisa adaptar isso de acordo com as propriedades reais do seu Painel Métrica

      let totalDias = paginas.length;
      let diasComParticipacao = 0;
      let estudo = 0;
      let treino = 0;
      let enem = 0;

      // Aqui você vai ler as propriedades reais
      // Exemplo hipotético:
      /*
      paginas.forEach(pagina => {
        const props = pagina.properties;
        if (props["Participou"]?.checkbox) diasComParticipacao++;
        if (props["Estudo"]?.checkbox) estudo++;
        if (props["Treino"]?.checkbox) treino++;
        if (props["ENEM"]?.checkbox) enem++;
      });
      */

      return {
        participacao: Math.round((diasComParticipacao / totalDias) * 100) || 0,
        estudo: Math.round((estudo / totalDias) * 100) || 0,
        treino: Math.round((treino / totalDias) * 100) || 0,
        enem: Math.round((enem / totalDias) * 100) || 0,
      };
    }

    function renderizar(dados) {
      const cards = document.getElementById("cards");
      cards.innerHTML = `
        <div class="card">
          <div class="circle" style="--percent: \( {dados.participacao}"> \){dados.participacao}%</div>
          <strong>Participação Geral</strong>
        </div>
        <div class="card">
          <div class="circle" style="--percent: \( {dados.estudo}"> \){dados.estudo}%</div>
          <strong>Estudo</strong>
        </div>
        <div class="card">
          <div class="circle" style="--percent: \( {dados.treino}"> \){dados.treino}%</div>
          <strong>Treino</strong>
        </div>
        <div class="card">
          <div class="circle" style="--percent: \( {dados.enem}"> \){dados.enem}%</div>
          <strong>ENEM</strong>
        </div>
      `;
    }

    carregarDados();