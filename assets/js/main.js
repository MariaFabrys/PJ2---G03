function showModal(idmodal){
    const modal = document.querySelector(idmodal)
    modal.style.display='flex'
}
function hideModal(idmodal, event){
    if(event.target.className === 'modal'){
        const modal = document.querySelector(idmodal)
        modal.style.display = 'none'
    }
}
function closeAllModal(){
        const modais = document.querySelectorAll('.modal')
        modais.forEach(modal => {
            modal.style.display = 'none'

        })
}
    

async function insert(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/insert.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu jogo '+result.data.title+' foi cadastrado com sucesso!')


    }
}

async function loadProductions(){
    const response = await fetch('backend/list.php')
    const result = await response.json()
    if(result?.success){
        const listProductions = document.querySelector('#jogos')
        listProductions.innerHTML=''
        const jogos = result.data
        jogos.map((jogo) => {
            listProductions.innerHTML +=`
            <div class="card-jogos">
            <a href="jogo">
                <img src="${jogo.capa}" alt="${jogo.titulo}">
            </a>
                <div>
                    <a href="jogo">
                        <h2>${jogo.titulo}</h2>
                    </a>
                    <div>
                        <p>${jogo.categoria}</p>
                        <img src="assets/img/trash.svg" onclick="deleteProduction(${jogo.id})">
                        <img src="assets/img/pencil.svg" onclick="loadProductionsData(${jogo.id})">
                    </div>
                </div>
            </a>
        </div>

            `
        })
    }else{
        alert('Erro ao carregar produções')
    }
}

async function deleteProduction(id){
    const response = await fetch('backend/delete.php?id='+id)
    const result = await response.json()
    if(result?.success){
        alert('Seu jogo foi deletado com sucesso!')
        loadProductions()
    }
}

async function loadProductionsData(id){
    const response = await fetch('backend/get-production-by-id.php?id='+id)

    const result = await response.json()
    if(result?.success){
        showModal('#modal-editar')
        const title = document.querySelector('#modal-editar input[name=title]')
        title.value = result.data.titulo

        const description = document.querySelector('#modal-editar input[name=description]')
        description.value = result.data.descricao

        const category = document.querySelector('#modal-editar input[name=category]')
        category.value = result.data.categoria

        const cover = document.querySelector('#modal-editar input[name=cover]')
        cover.value = result.data.capa

        const classification = document.querySelector('#modal-editar input[name=classification]')
        classification.value = result.data.classificacao

        const id = document.querySelector('#modal-editar input[name=id]')
        id.value = result.data.id
    }
}



async function edit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/edit.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu jogo '+result.data.title+' foi editado com sucesso!')
    loadProductions()

    }
}

function clearForm(idModal){
    const title = document.querySelector(`${idModal} input[name=title]`)
    title.value = ''
    const description = document.querySelector(`${idModal} input [name=description]`)
    description.value=''
    const category = document.querySelector(`${idModal} input [name=category]`)
    category.value=''
    const cover = document.querySelector(`${idModal} input [name=cover]`)
    cover.value=''
    const classification = document.querySelector(`${idModal} input [name=classification]`)
    classification.value=''

}