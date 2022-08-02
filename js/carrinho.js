let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

//console.log(shopItemsData)
//array com todos os elementos dos cards 
let = basket = JSON.parse(localStorage.getItem("data")) || []

//console.log(basket)

/*soma todos os valores dos itens*/
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((e)=>e.item).reduce((x,y)=>x+y,0)

  //console.log(basket.map((e)=>e.item).reduce((x,y)=>x+y,0))
}

calculation()

let generateCartItems = () => {
  if(basket.length !== 0) { //localStorage nao estará vazio
    //console.log("cesta nao esta vazia")
    return (shoppingCart.innerHTML = basket.map((e)=>{
      //console.log(e)
      let {id, item} = e
      //verificar a id da cesta com a id do arquivo de data
      let search = shopItemsData.find((e)=>e.id === id) || []
      let {img, name, price} = search
      return `
      <div class="cart-item">
        <h3>${img}</h3> 
        <div class="details">
          <div class="title-price-x">
            <h4 class="title-price">
              <p>${name}</p>
              <p class="cart-item-price">R$: ${price}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id=${id} class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>R$: ${item * search.price}</h3>
        </div>
      </div>
      `
    }).join('')) //percorrer todos os elementos um por um
  }else{
    //console.log("cesta esta vazia")
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <h2>Carrinho está vazio</h2>
    <a href="servicos.html">
      <button class="homeBtn">Voltar a serviços</button>
    </a>
    `
  }
}

generateCartItems()

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((e) => e.id === selectedItem)

  if(search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    })
  }else{
    search.item += 1;
  }
  generateCartItems()
  update(selectedItem)
  localStorage.setItem("data", JSON.stringify(basket))

  //console.log(basket)
  //update(selectedItem)
}

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((e) => e.id === selectedItem)

  if(search === undefined) return
  else if(search.item === 0) return
  else{
    search.item -= 1;
  }
  
  update(selectedItem)
  //filtrar todos os objetos que tem itens 0
  basket = basket.filter((e) => e.item !== 0)

  generateCartItems()
  //console.log(basket)
  localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
  let search = basket.find((e) => e.id === id)
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
  totalAmount()
}

let removeItem = (id) => {
  let selectedItem = id
  //console.log(selectedItem)
  basket = basket.filter((e) => e.id !== selectedItem)
  generateCartItems()
  totalAmount()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let clearCart = () => {
  basket = []
  generateCartItems()
  calculation()
  localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () => {
  if(basket.length !== 0){
    let amount = basket.map((e) => {
      let {id, item} = e
      let search = shopItemsData.find((e)=>e.id === id) || []
      return item * search.price
    }).reduce((x,y)=>x+y, 0)
    //console.log(amount)
    label.innerHTML = `
    <h2>Total: R$: ${amount}</h2>
    <button class="checkout">Confirmar</button>
    <button onclick="clearCart()" class="removeAll">Limpar carrinho</button>
    `
  }else return
}

totalAmount()