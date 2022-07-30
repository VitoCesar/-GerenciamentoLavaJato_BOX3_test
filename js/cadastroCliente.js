const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
  clearFields()
  document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

//CRUD
const deleteClient = (index) => {
  const dbClient = readClient()
  dbClient.splice(index, 1)
  setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
  const dbClient = readClient()
  dbClient[index] = client
  setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) =>{
  const dbClient = getLocalStorage()
  dbClient.push(client)
  setLocalStorage(dbClient)
}

const isValidFields = () => {
  return document.getElementById('form').reportValidity()
}

//interação com usuário
const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field')
  fields.forEach(field => field.value = "")
}

const saveClient = () => {
  if(isValidFields()){
    const client = {
      nome: document.getElementById('nome').value,
      telefone: document.getElementById('celular').value,
      cpfcnpj: document.getElementById('cpfcnpj').value,
      cep: document.getElementById('cep').value,
      logradouro: document.getElementById('logradouro').value,
      numero: document.getElementById('numero').value,
      complemento: document.getElementById('complemento').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value
    }
    const index = document.getElementById('nome').dataset.index
    if(index == 'new'){
      createClient(client)
      closeModal()
      updateTable()
    }else{
      closeModal()
      updateClient(index, client)
      updateTable()
    }
  }
}

const createRow = (client, index) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.telefone}</td>
    <td>${client.cpfcnpj}</td>
    <td>${client.cep}</td>
    <td>${client.logradouro}</td>
    <td>${client.numero}</td>
    <td>${client.complemento}</td>
    <td>${client.bairro}</td>
    <td>${client.cidade}</td>
    <td>${client.estado}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
  `
  document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr')
  rows.forEach(row => row.parentNode.replaceChild(row))
}

const updateTable = () =>{
  const dbClient = readClient()
  clearTable()
  dbClient.forEach(createRow)
}

 const fillFields = (client) =>{
  document.getElementById('nome').value = client.nome
  document.getElementById('celular').value = client.telefone
  document.getElementById('cpfcnpj').value = client.cpfcnpj
  document.getElementById('cep').value = client.cep
  document.getElementById('logradouro').value = client.logradouro
  document.getElementById('numero').value = client.numero
  document.getElementById('complemento').value = client.complemento
  document.getElementById('bairro').value = client.bairro
  document.getElementById('cidade').value = client.cidade
  document.getElementById('estado').value = client.estado
  document.getElementById('nome').dataset.index = client.index
 }

const editClient = (index) => {
  const client = readClient()[index]
  client.index = index
  fillFields(client)
  openModal()
}

const editDelete = (event) => { 
  if(event.target.type == 'button'){
    const [action, index] = event.target.id.split('-')
    if(action == 'edit'){
      editClient(index)
    }else{
      const client = readClient()[index]
      const response = confirm(`Deseja realmente excluir este cliente ${client.nome}`)
      if(response){
        deleteClient(index)
        updateTable()
      }
    }
  }
  
}

updateTable()

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar') 
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)