
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


/* =========================================================
   MASCOTE INTERATIVO - NOVI
========================================================= */

const noviCharacter = document.getElementById("noviCharacter");
const noviMenu = document.getElementById("noviMenu");
const noviSpeech = document.getElementById("noviSpeech");
const noviMessage = document.getElementById("noviMessage");
const noviTitle = document.getElementById("noviTitle");
const noviClose = document.getElementById("noviClose");
const noviAssistant = document.getElementById("noviAssistant");
const noviOptions = document.querySelectorAll(".novi-option");

let noviTimer;
let idleTimer;
let clickCount = 0;
let clickTimer;

function noviFalar(mensagem, animacao = "happy", titulo = "Novi") {
    noviTitle.textContent = titulo;
    noviMessage.textContent = mensagem;
    noviSpeech.classList.add("show");

    noviCharacter.classList.remove("happy", "wave", "jump", "spin", "surprise", "excited");
    void noviCharacter.offsetWidth;
    noviCharacter.classList.add(animacao);

    clearTimeout(noviTimer);
    noviTimer = setTimeout(() => {
        if (!noviMenu.classList.contains("open")) {
            noviSpeech.classList.remove("show");
        }
    }, 5000);
}

function fecharMenu() {
    noviMenu.classList.remove("open");
    noviAssistant.classList.remove("open");
    noviCharacter.setAttribute("aria-expanded", "false");
    noviMenu.setAttribute("aria-hidden", "true");
}

function abrirMenu() {
    noviMenu.classList.add("open");
    noviAssistant.classList.add("open");
    noviCharacter.setAttribute("aria-expanded", "true");
    noviMenu.setAttribute("aria-hidden", "false");
    noviFalar("Escolha uma opção. Tenho várias coisas para fazer! 🐾", "wave");
}

function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        if (!noviMenu.classList.contains("open")) {
            noviFalar("Pssiu... estou aqui se você precisar de mim! 💜", "wave");
        }
    }, 25000);
}

noviCharacter.addEventListener("click", function () {
    clickCount++;
    clearTimeout(clickTimer);

    /* Duplo clique: reação especial */
    if (clickCount === 2) {
        clickCount = 0;
        fecharMenu();
        noviFalar("MIAU! Você descobriu meu truque secreto! ✨", "spin", "Novi surpresa");
        return;
    }

    clickTimer = setTimeout(() => {
        clickCount = 0;
        if (noviMenu.classList.contains("open")) fecharMenu();
        else abrirMenu();
        resetIdle();
    }, 230);
});

noviClose.addEventListener("click", function (event) {
    event.stopPropagation();
    noviSpeech.classList.remove("show");
    resetIdle();
});

noviCharacter.addEventListener("mouseenter", function () {
    if (!noviMenu.classList.contains("open")) {
        noviFalar("Oi! Clique em mim para abrir minhas opções. 🐱", "wave");
    }
    resetIdle();
});

noviOptions.forEach(function (option) {
    option.addEventListener("click", function () {
        const action = option.dataset.action;

        if (action === "search") {
            fecharMenu();
            noviFalar("Vamos pesquisar! Escreva o que você está procurando. 🔎", "jump");
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        if (action === "tip") {
            fecharMenu();
            noviFalar("Dica: você pode escrever algo como ‘arquivos PDF sobre redes de 2025’. Eu consigo entender a descrição. 💡", "happy", "Dica do Novi");
        }

        if (action === "suggestion") {
            const cards = Array.from(document.querySelectorAll(".suggestion-card"));
            if (cards.length) {
                const card = cards[Math.floor(Math.random() * cards.length)];
                const query = card.dataset.query || card.textContent.trim();
                searchInput.value = query;
                realizarPesquisa(query);
                fecharMenu();
                noviFalar("Que tal pesquisar isso? Já coloquei a sugestão para você! ✨", "excited", "Novi recomenda");
                searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                noviFalar("Ainda não encontrei sugestões nesta tela. 😺", "surprise");
            }
        }

        if (action === "files") {
            fecharMenu();
            noviFalar("Vamos para seus arquivos! 📁", "jump");
            setTimeout(() => {
                window.location.href = "../MeusArquivos/MeusArquivos.html";
            }, 700);
        }

        if (action === "tags") {
            fecharMenu();
            noviFalar("As tags deixam seus arquivos muito mais fáceis de encontrar! 🏷️", "wave");
            setTimeout(() => {
                window.location.href = "../Tags/tags.html";
            }, 700);
        }

        if (action === "shortcut") {
            fecharMenu();
            noviFalar("Aperte Ctrl + K e eu levo você direto para a pesquisa. ⌨️", "happy", "Atalho rápido");
        }

        if (action === "mood") {
            fecharMenu();
            noviFalar("Hoje eu estou muito feliz! 😸", "happy", "Humor do Novi");
        }

        if (action === "surprise") {
            fecharMenu();
            const respostas = [
                ["Miau! Você encontrou uma interação secreta! 🎉", "jump"],
                ["Eu tenho 9 vidas... e várias dicas! 🐾", "happy"],
                ["Procure por mim quando precisar de ajuda. 💜", "wave"],
                ["Segredo: o Ctrl + K é meu atalho favorito! ✨", "excited"]
            ];
            const escolha = respostas[Math.floor(Math.random() * respostas.length)];
            noviFalar(escolha[0], escolha[1], "Novi surpresa");
        }

        resetIdle();
    });
});

/* Depois de uma pesquisa, o Novi reage automaticamente. */
const pesquisaOriginal = realizarPesquisa;
realizarPesquisa = function (query) {
    pesquisaOriginal(query);
    noviFalar("Encontrei resultados para: “" + query + "”. 🔎", "excited", "Pesquisa concluída");
    resetIdle();
};

/* Fecha o menu clicando fora. */
document.addEventListener("click", function (event) {
    if (!noviAssistant.contains(event.target)) {
        fecharMenu();
    }
});

/* Mensagem inicial somente uma vez, sem texto permanente abaixo do gato. */
window.addEventListener("load", function () {
    setTimeout(() => {
        noviFalar("Oi! Eu sou o Novi. Clique em mim para descobrir o que eu posso fazer! 🐾", "happy");
        resetIdle();
    }, 900);
});
