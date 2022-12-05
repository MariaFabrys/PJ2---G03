

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
    const response = await fetch('backend/insertcomunidade.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu post '+result.data.title+' foi publicado com sucesso!')


    }
}

async function loadProductions(){
    const response = await fetch('backend/listcomunidade.php')
    const result = await response.json()
    if(result?.success){
        const listProductions = document.querySelector('#containerpost')
        listProductions.innerHTML=''
        const posts = result.data
        posts.map((post) => {
            listProductions.innerHTML +=`
        <div class="bgpost">
            
            <div class="pub">
                <img src="${post.publicacao}" alt="">
                <p>${post.legenda}</p>
                
            </div>
            <div class="iconc">

                <div class="editdelet">
                <img src="assets/img/trash2.svg" onclick="deleteProduction(${post.id})">
                <img src="assets/img/pencil2.svg" onclick="loadProductionsData(${post.id})">

                
                </div>

                <div class="interacao">
                    <img src="assets/img/like-svgrepo-com.svg" alt="" onclick="corSvg()">
                </div>
            </div>
        </div>

            `
        })
    }else{
        alert('Erro ao carregar produções')
    }
}

async function deleteProduction(id){
    const response = await fetch('backend/deletecomunidade.php?id='+id)
    const result = await response.json()
    if(result?.success){
        alert('Seu post foi deletado com sucesso!')
        loadProductions()
    }
}

async function loadProductionsData(id){
    const response = await fetch('backend/get-post-by-id.php?id='+id)

    const result = await response.json()
    if(result?.success){
        showModal('#modal-editar')
        const subtitle = document.querySelector('#modal-editar input[name=subtitle]')
        subtitle.value = result.data.legenda

        const Publication = document.querySelector('#modal-editar input[name=Publication]')
        Publication.value = result.data.publicacao

        const id = document.querySelector('#modal-editar input[name=id]')
        id.value = result.data.id
    }
}



async function edit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/editcomunidade.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu post '+result.data.title+' foi editado com sucesso!')
    loadProductions()

    }
}

