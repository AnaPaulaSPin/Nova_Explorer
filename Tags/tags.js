/* =========================================================
   MODAL - NOVA TAG
========================================================= */

const createTagButton =
    document.getElementById("createTagButton");

const tagModal =
    document.getElementById("tagModal");

const modalClose =
    document.getElementById("modalClose");

const cancelButton =
    document.getElementById("cancelButton");

const saveButton =
    document.getElementById("saveButton");

const tagInput =
    document.getElementById("tagInput");


createTagButton.addEventListener("click", () => {

    tagModal.classList.add("show");

    tagInput.focus();

});


function closeModal() {

    tagModal.classList.remove("show");

    tagInput.value = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);

cancelButton.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   CRIAR TAG
========================================================= */

saveButton.addEventListener("click", () => {

    const tagName =
        tagInput.value.trim();

    if (!tagName) {

        tagInput.focus();

        return;

    }

    alert(
        `A tag "${tagName}" foi criada com sucesso!`
    );

    closeModal();

});


/* =========================================================
   FECHAR CLICANDO FORA
========================================================= */

tagModal.addEventListener("click", (event) => {

    if (event.target === tagModal) {

        closeModal();

    }

});


/* =========================================================
   FILTROS
========================================================= */

const filters =
    document.querySelectorAll(".filter");


filters.forEach((filter) => {

    filter.addEventListener("click", () => {

        filters.forEach((item) => {

            item.classList.remove("active");

        });

        filter.classList.add("active");

    });

});


/* =========================================================
   IA
========================================================= */

const aiButton =
    document.getElementById("aiButton");

const suggestions =
    document.getElementById("suggestions");


aiButton.addEventListener("click", () => {

    aiButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Analisando...
    `;

    aiButton.disabled = true;


    setTimeout(() => {

        suggestions.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        aiButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Sugestões encontradas
        `;

        aiButton.disabled = false;

    }, 1200);

});


/* =========================================================
   ADICIONAR TAG SUGERIDA
========================================================= */

const suggestedTags =
    document.querySelectorAll(".suggested-tags button");


suggestedTags.forEach((tag) => {

    tag.addEventListener("click", () => {

        const tagName =
            tag.textContent.trim();

        tag.innerHTML = `
            <i class="fa-solid fa-check"></i>
            ${tagName}
        `;

    });

});