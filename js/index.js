const main = document.querySelector(".main-content");

function listaDeCards(array) {
    const ul = document.createElement("ul");
    ul.classList.add("ul-main-class");
    main.appendChild(ul);

    for (let i = 0; i < array.length; i++) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        const div = document.createElement("div");
        const button = document.createElement("button");

        li.classList.add("li-product");
        img.classList.add("img-product");
        img.src = array[i].img;
        div.classList.add("div-details");
        button.classList.add("button-add");
        button.id = array[i].id;
        button.innerText = "Adicionar ao carrinho";

        div.innerHTML = `
        <span class="category-product">${array[i].tag}</span>
        <h3 class="name-product">${array[i].nameItem}</h3>
        <p class="description-product">${array[i].description}</p>
        <p class="value-product">R$${array[i].value.toFixed(2)}</p>
        `;
        ul.appendChild(li);
        li.appendChild(img);
        li.appendChild(div);
        div.appendChild(button);

        criaEvento(array[i].id);
    }
    carrinhoVazio();
}
listaDeCards(data);

function criaEvento(id) {
    const button = document.getElementById(id);
    button.addEventListener("click", (event) => {
        selecionarProduto(id);
        carrinhoTotal();
    });
}

function selecionarProduto(id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            const produto = data[i];
            carrinhoDeCompras(produto);
        }
    }
}
let remover = "remover-";
let id = 1;
let somaTotal = 0;
let quantidadeItens = 0;

function carrinhoDeCompras(produto) {
    const divVazio = document.querySelector(".carrinhoVazio");
    const ulC = document.querySelector(".carrinho-ul");
    const ulT = document.querySelector(".total-ul");

    if (divVazio.style.display == "block") {
        divVazio.style.display = "none";
        ulC.style.display = "flex";
        ulT.style.display = "flex";
    }

    const ulCarrinho = document.querySelector(".carrinho-ul");
    const liCarrinho = document.createElement("li");
    const imgCarrinho = document.createElement("img");
    const divDetalhes = document.createElement("div");
    const btnRemover = document.createElement("button");

    liCarrinho.classList.add("lista-carrinho");
    imgCarrinho.classList.add("img-carrinho");
    divDetalhes.classList.add("detalhes-carrinho");
    btnRemover.classList.add("btn-carrinho");

    liCarrinho.id = `item-${id}`;
    imgCarrinho.src = produto.img;
    btnRemover.id = remover + id;
    btnRemover.innerHTML = "Remover produto";

    divDetalhes.innerHTML = `
    <h3 class="produto-carrinho">${produto.nameItem}</h3>
    <p class="preco-carrinho">${produto.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })}</p>
    `;

    ulCarrinho.appendChild(liCarrinho);
    liCarrinho.append(imgCarrinho, divDetalhes);
    divDetalhes.appendChild(btnRemover);

    id++;
    somaTotal += produto.value;
    quantidadeItens++;
    removerEvento(btnRemover.id, produto.value);
}

function removerEvento(id, preco) {
    const btnRemover = document.getElementById(id);
    btnRemover.addEventListener("click", function (e) {
        removerProduto(id, preco);
    });
}

function removerProduto(idButton, preco) {
    for (let i = 0; i <= id; i++) {
        if (idButton == `remover-${i}`) {
            const li = document.getElementById(`item-${i}`);
            li.remove();

            quantidadeItens--;
            somaTotal -= preco;
            carrinhoTotal();

            if (quantidadeItens == 0) {
                const divVazio = document.querySelector(".carrinhoVazio");
                const ul = document.querySelector(".carrinho-ul");
                const ulT = document.querySelector(".total-ul");

                divVazio.style.display = "block";
                ul.style.display = "none";
                ulT.style.display = "none";
            }
        }
    }
}

const ulTotal = document.querySelector(".total-ul");
const liQuantidade = document.createElement("li");
const liValor = document.createElement("li");

ulTotal.className = "total-ul";
liQuantidade.className = "li-total";
liValor.className = "li-total";

liQuantidade.innerHTML = `
<h3 class="title-liCarrinho">Quantidade:</h3>
<p class="p-liCarrinho" id="quantidade">${quantidadeItens}</p>`;
liValor.innerHTML = `
<h3 class="title-liCarrinho">Total:</h3>
<p class="p-liCarrinho" id="total">${somaTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
})}</p>`;

ulTotal.append(liQuantidade, liValor);

function carrinhoTotal() {
    const quantidade = document.querySelector("#quantidade");
    const total = document.querySelector("#total");

    quantidade.innerText = quantidadeItens;
    total.innerText = somaTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function carrinhoVazio() {
    const divCarrinho = document.querySelector("#carrinho-div");
    const div = document.createElement("div");
    div.classList.add("carrinhoVazio");
    div.style.display = "block";
    div.innerHTML = `
        <h3 class="carrinho-vazio">Carrinho vazio</h3>
        <p class="add-itens">Adicione itens</p>
        `;

    divCarrinho.appendChild(div);
}
