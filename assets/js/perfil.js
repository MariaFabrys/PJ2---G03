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
    const response = await fetch('backend/insertperfil.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu perfil '+result.data.title+' foi cadastrado com sucesso!')


    }
}

async function loadProductions(){
    const response = await fetch('backend/listperfil.php')
    const result = await response.json()
    if(result?.success){
        const listProductions = document.querySelector('.profile')
        listProductions.innerHTML=''
        const perfis = result.data
        perfis.map((perfil) => {
            listProductions.innerHTML +=`
            <div class="wrapper">
            <div class="photo-profile">
                    <img src="${perfil.nomeperfil}" alt=""> 
                    <div class="img-icon">  
                        <img src="assets/img/pencil.svg" onclick="loadProductionsData(${perfil.id})">   
                        <img src="assets/img/trash.svg" onclick="deleteProduction(${perfil.id})">
                    </div>
                </div>
                <div class="bio">
                    <div class="nickname">
                        <p>${perfil.fotoperfil}</p>
                        <p>Seguir</p>
                    </div>
                    <div class="follow">
                        <p><b>0</b> publicações</p>
                        <p> <b>0</b> seguidores </p>
                        <p><b>0</b> seguindo</p>  
                    </div>
                    <div class="contact">
                        <p>${perfil.bio}</p>
                    </div>
                    
                </div><!--bio-->
        </div>

            `
        })
    }else{
        alert('Erro ao carregar produções')
    }
}

async function deleteProduction(id){
    const response = await fetch('backend/deleteperfil.php?id='+id)
    const result = await response.json()
    if(result?.success){
        alert('Seu filme foi deletado com sucesso!')
        loadProductions()
    }
}

async function loadProductionsData(id){
    const response = await fetch('backend/get-perfil-by-id.php?id='+id)

    const result = await response.json()
    if(result?.success){
        showModal('#modal-editar')
        const nameprofile = document.querySelector('#modal-editar input[name=nameprofile]')
        nameprofile.value = result.data.nomeperfil

        const photoprofile = document.querySelector('#modal-editar input[name=photoprofile]')
        photoprofile.value = result.data.fotoperfil

        const biograf = document.querySelector('#modal-editar input[name=biograf]')
        biograf.value = result.data.bio

        const id = document.querySelector('#modal-editar input[name=id]')
        id.value = result.data.id
    }
}



async function edit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const response = await fetch('backend/editperfil.php',{
        method: 'POST',
        body: formData
    })

const result = await response.json()
if(result?.success){
    closeAllModal()
    alert('seu perfil '+result.data.title+' foi editado com sucesso!')
    loadProductions()

    }
}

// function clearForm(idModal){
//     const title = document.querySelector(`${idModal} input[name=title]`)
//     title.value = ''
//     const description = document.querySelector(`${idModal} input [name=description]`)
//     description.value=''
//     const category = document.querySelector(`${idModal} input [name=category]`)
//     category.value=''
//     const cover = document.querySelector(`${idModal} input [name=cover]`)
//     cover.value=''
//     const classification = document.querySelector(`${idModal} input [name=classification]`)
//     classification.value=''

// }