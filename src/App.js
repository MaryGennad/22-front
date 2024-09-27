import { useEffect, useState } from "react";
import './App.css';


function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    let res = await fetch('http://localhost:2000/api/product')
    let resJson = await res.json()
    setProducts(resJson)
  }

  async function onChange(paramName, value, productIndex) {
    let newProducts = [...products]
    newProducts[productIndex][paramName] = value
    setProducts(newProducts)

  }

  return (

    <div>
      {products.map((product, productIndex) => {
        return (
          <div key={productIndex}>
            {/*HEADER*/}
            <div className="product" >
              <input
                className="h1"
                value={product.name}
                onChange={(e) => {
                  let value = e.target.value
                  onChange('name', value, productIndex)
                }}
              />
            </div>

            {/*IMAGE*/}
            <div>
              <img className="imgs" src={product.image} />
              Картинку можно поменять тут :
              <input className="product"
                value={product.image}
                onChange={(e) => {
                  let value = e.target.value
                  onChange('image', value, productIndex)
                }}
              />
            </div>
            <br></br>
            {/* INGREDIENTS */}
            <div className="product">{
              product.ingreS?.map((ingredient, ingredientIndex) => {
                return (
                  <div className="product ingredient">
                    <input value={ingredient}
                      key={ingredientIndex}
                      onChange={(e) => {
                        let value = e.target.value
                        let newProducts = [...products]
                        // newProducts[productIndex][paramName] = value                                         
                        newProducts[productIndex].ingreS[ingredientIndex] = value
                        setProducts(newProducts)
                      }} />
                    <button
                      className="button"
                      onClick={() => {
                        // let value = e.target.value
                        let newProducts = [...products]
                        newProducts[productIndex].ingreS.splice(ingredientIndex, 1)
                        setProducts(newProducts)
                      }}
                    >Удалить</button>
                  </div>
                )
              }
              )}
              <br></br>
              <button
                className="button"
                onClick={(e) => {
                  let newProducts = [...products]
                  newProducts[productIndex].ingreS.push('Новый ингредиент')
                  setProducts(newProducts)
                }}
              >Добавить ингредиент
              </button>
            </div>
            <br></br>
            <br></br>
            {/*DESCRIPTION*/}
            <div className="product">
              <textarea value={product.description} rows="5"
                onChange={(e) => {
                  let value = e.target.value
                  onChange('description', value, productIndex)
                }}
              >
              </textarea>
            </div>
<div className="save">
            <button className="button"
              onClick={async () => {
                let res = await fetch('http://localhost:2000/api/product',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(product)
                  })
                let resJson = await res.json()
                console.log(resJson);
              }}
            >Сохранить</button></div>
          </div>
        )
      })}
      <div className="buttonProducts">
        {/* добавить блюдо */}
        <button className="button"
          onClick={(e) => {
            let newProducts = [...products]
            newProducts.push({

              name: "Новое блюдо",
              image: "https://chefrestoran.ru/wp-content/uploads/2018/08/shutterstock_413329057.jpg",
              ingreS: [
                "Ингредиент 1",
                "Ингредиент 2",
              ],
              description: "Описание приготовления",
              "__v": 0

            })
            setProducts(newProducts)
          }}
        >Добавить блюдо
        </button>
        {/* удалить блюдо */}
        <button className="button"
          onClick={() => {
            // let value = e.target.value
            let newProducts = [...products]
            newProducts.splice(newProducts, 1)
            setProducts(newProducts)
          }}
        >Удалить блюдо</button>
      </div>
    </div>
  );
}
// Textarea
// const txt = document.querySelector('#myTextarea');
// function setNewSize() {
//    this.style.height = "1px";
//    this.style.height = this.scrollHeight + "px";
// }
// txt.addEventListener('keyup', setNewSize);
export default App;

