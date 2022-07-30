const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


const tempClient = { //cliente temporário
  nome: "pedro",
  telefone: "88994557863",
  cpfcpnj: "08153790307",
  logradouro: "rua dr zequinha parente",
  numero: "274",
  complemento: "nenhum",
  bairro: "nossa senhora de fatima",
  cidade: "sobral",
  estado: "ceara"
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
    createClient(client)
  }
}

//eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar') 
    .addEventListener('click', saveClient)