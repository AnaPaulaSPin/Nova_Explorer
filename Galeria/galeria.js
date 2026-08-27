/* =========================================================
   ELEMENTOS
========================================================= */

const searchInput =
    document.getElementById("gallerySearch");

const filterButtons =
    document.querySelectorAll(".filter-button");

const photoCards =
    document.querySelectorAll(".photo-card");

const sortSelect =
    document.getElementById("sortSelect");

const photoModal =
    document.getElementById("photoModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");


/* =========================================================
   ESTADO
========================================================= */

let currentFilter = "all";
let currentSearch = "";


/* =========================================================
   APLICAR FILTROS
========================================================= */

function applyFilters() {

    photoCards.forEach(card => {

        const type =
            card.dataset.type;

        const name =
            card.dataset.name.toLowerCase();

        const matchesFilter =
            currentFilter === "all" ||
            type === currentFilter;

        const matchesSearch =
            currentSearch === "" ||
            name.includes(currentSearch);

        if (
            matchesFilter &&
            matchesSearch
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* =========================================================
   BOTÕES DE FILTRO
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item => item.classList.remove("active")
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            applyFilters();

        }
    );

});


/* =========================================================
   PESQUISA
========================================================= */

searchInput.addEventListener(
    "input",
    event => {

        currentSearch =
            event.target.value
                .toLowerCase()
                .trim();

        applyFilters();

    }
);


/* =========================================================
   ORDENAÇÃO
========================================================= */

sortSelect.addEventListener(
    "change",
    () => {

        const groups =
            document.querySelectorAll(".photo-grid");

        groups.forEach(grid => {

            const cards =
                Array.from(
                    grid.querySelectorAll(".photo-card")
                );

            const option =
                sortSelect.value;

            if (option === "name") {

                cards.sort(
                    (a, b) => {

                        const nameA =
                            a.dataset.name;

                        const nameB =
                            b.dataset.name;

                        return nameA.localeCompare(
                            nameB
                        );

                    }
                );

            }

            if (option === "oldest") {

                cards.reverse();

            }

            if (option === "recent") {

                cards.sort(
                    () => 0
                );

            }

            cards.forEach(card => {
                grid.appendChild(card);
            });

        });

    }
);


/* =========================================================
   ABRIR FOTO
========================================================= */

photoCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.querySelector("img");

            if (!image) {
                return;
            }

            modalImage.src =
                image.src;

            modalImage.alt =
                image.alt;

            photoModal.classList.add(
                "show"
            );

        }
    );

});


/* =========================================================
   FECHAR MODAL
========================================================= */

modalClose.addEventListener(
    "click",
    () => {

        photoModal.classList.remove(
            "show"
        );

        modalImage.src = "";

    }
);


/* =========================================================
   FECHAR CLICANDO FORA DA FOTO
========================================================= */

photoModal.addEventListener(
    "click",
    event => {

        if (
            event.target === photoModal
        ) {

            photoModal.classList.remove(
                "show"
            );

            modalImage.src = "";

        }

    }
);


/* =========================================================
   ESC PARA FECHAR
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            photoModal.classList.remove(
                "show"
            );

            modalImage.src = "";

        }

    }
);


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
