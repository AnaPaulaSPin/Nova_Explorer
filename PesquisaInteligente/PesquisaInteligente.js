
const searchForm = document.getElementById("smartSearchForm");
const searchInput = document.getElementById("smartSearchInput");

const emptyResults = document.getElementById("emptyResults");
const resultsList = document.getElementById("resultsList");
const resultsTitle = document.getElementById("resultsTitle");

const suggestionCards = document.querySelectorAll(".suggestion-card");


/* =========================================================
   PESQUISA
========================================================= */

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
        searchInput.focus();
        return;
    }

    realizarPesquisa(query);

});


/* =========================================================
   REALIZAR PESQUISA
========================================================= */

function realizarPesquisa(query) {

    emptyResults.style.display = "none";

    resultsList.style.display = "block";

    resultsTitle.textContent = "Resultados encontrados";

    /*
        Nesta etapa do protótipo os resultados são apenas
        demonstrativos.

        Futuramente esta função poderá enviar a pesquisa
        para o backend, por exemplo:

        fetch("/api/pesquisa-inteligente", {
            method: "POST",
            body: JSON.stringify({
                consulta: query
            })
        });

        O backend poderá então interpretar a frase
        e devolver os arquivos mais relevantes.
    */

    console.log("Pesquisa realizada:", query);

}


/* =========================================================
   SUGESTÕES
========================================================= */

suggestionCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const query = card.dataset.query;

        searchInput.value = query;

        realizarPesquisa(query);

    });

});


/* =========================================================
   ATALHO CTRL + K
========================================================= */

document.addEventListener("keydown", function (event) {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});
