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