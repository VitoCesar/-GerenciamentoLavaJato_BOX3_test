let shop = document.getElementById('shop')

let shopItemsData = [{
  id: 1,
  name: "Lavagem Simples",
  price: 80,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  img: "Imagem aqui..."
}, 
{
  id: 2,
  name: "Lavagem com Cera",
  price: 130,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  img: "Imagem aqui..."
},
{
  id: 3,
  name: "Lavagem Completa",
  price: 200,
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
  img: "Imagem aqui..."
},
] 

let = basket = JSON.parse(localStorage.getItem("data")) || []


let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((e)=>{
    let {id, name, price, desc, img} = e
    let search = basket.find((e)=>e.id === id) || []
    return `
    <div id=product-id-${id} class="item">
          <img width="220" src="" alt="">
          <h4>${img}</h4>
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}.</p>
            <div class="price-quantity">
              <h2>R$ ${price}</h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined ? 0: search.item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
    `
  }).join("")) 
}

generateShop()

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
  localStorage.setItem("data", JSON.stringify(basket))

  //console.log(basket)
  update(selectedItem)
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
  basket = basket.filter((e) => e.item !== 0)

  //console.log(basket)
  localStorage.setItem("data", JSON.stringify(basket))
}

let update = (id) => {
  let search = basket.find((e) => e.id === id)
  //console.log(search.item)
  document.getElementById(id).innerHTML = search.item
  calculation()
}

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((e)=>e.item).reduce((x,y)=>x+y,0)

  //console.log(basket.map((e)=>e.item).reduce((x,y)=>x+y,0))
}

calculation()