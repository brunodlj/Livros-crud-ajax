document.addEventListener("DOMContentLoaded", () => {
    listarTodos();
});

function listarTodos() {
    fetch("listar.php",
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(eventos => inserirUsuarios(eventos))
        .catch(error => console.log(error));
}

function inserirUsuarios(livros) {
    for (const livro of livros) {
        inserirUsuario(livro);
    }
}

function inserirUsuario(livro) {
    let tbody = document.getElementById('livros');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = livro.id;
    let tdTitulo = document.createElement('td');
    tdTitulo.innerHTML = livro.titulo;
    let tdCategoria = document.createElement('td');
    tdCategoria.innerHTML = livro.categoria;
    let tdAutor = document.createElement('td');
    tdAutor.innerHTML = livro.autor;
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaUsuario, false);
    btnAlterar.id = livro.id;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluir, false);
    btnExcluir.id = livro.id;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdTitulo);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdAutor);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
} 

function excluir(evt) {
    let id = evt.currentTarget.id;
    let excluir = confirm("Você tem certeza que deseja excluir este usuário?");
    if (excluir == true) {
        fetch('excluir.php?id=' + id,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirUsuario(retorno, id))
            .catch(error => console.log(error));
    }
}

function excluirUsuario(retorno, id) {
    if (retorno == true) {
        let tbody = document.getElementById('livros');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarUsuario(livro) {
    let tbody = document.getElementById('livros');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == livro.id) {
            tr.children[1].innerHTML = livro.titulo;
            tr.children[2].innerHTML = livro.categoria;
            tr.children[3].innerHTML = livro.autor;
        }
    }
}

function buscaUsuario(evt) {
    let id = evt.currentTarget.id;
    fetch('buscaUsuario.php?id=' + id,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(livro => preencheForm(livro))
        .catch(error => console.log(error));
}

function preencheForm(livro) {
    let inputIDUsuario = document.getElementsByName("id")[0];
    inputIDUsuario.value = livro.id;
    let inputTitulo = document.getElementsByName("titulo")[0];
    inputTitulo.value = livro.titulo
    let inputCategoria = document.getElementsByName("categoria")[0];
    inputCategoria.value = livro.categoria;
    let inputAutor = document.getElementsByName("autor")[0];
    inputAutor.value = livro.autor;
    
}

function salvarUsuario(event) {
    // parar o comportamento padrão do form
    event.preventDefault();
    // obtém o input id_usuario
    let inputIDUsuario = document.getElementsByName("id")[0];
    // pega o valor do input id_usuario
    let id = inputIDUsuario.value;

    let inputTitulo = document.getElementsByName("titulo")[0];
    let titulo = inputTitulo.value;
    let inputCategoria = document.getElementsByName("categoria")[0];
    let categoria = inputCategoria.value;
    let inputAutor = document.getElementsByName("autor")[0];
    let autor = inputAutor.value;

    if (id == "") {
        cadastrar(id, titulo, categoria, autor);
    } else {
        alterar(id, titulo, categoria, autor);
    }
    document.getElementsByTagName('form')[0].reset();
}

function cadastrar(id, titulo, categoria, autor) {
    fetch('inserir.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                titulo: titulo,
                categoria: categoria,
                autor: autor
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(livro => inserirUsuario(livro))
        .catch(error => console.log(error));
}

function alterar(id, titulo, categoria, autor) {
    fetch('alterar.php',
        {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                titulo: titulo,
                categoria: categoria,
                autor: autor
            }),
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(livro => alterarUsuario(livro))
        .catch(error => console.log(error));
}