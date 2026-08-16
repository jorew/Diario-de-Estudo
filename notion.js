async function carregarDados() {
  try {
    const res = await fetch(PROXY_URL);
    const data = await res.json();

    console.log("Resposta do proxy:", data); // ← isso ajuda a ver o que está vindo

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
