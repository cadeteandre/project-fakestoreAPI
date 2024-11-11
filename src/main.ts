import './style.css'

type TClothes = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {rate: number, count: number},
  title: string
}

const searchInput = document.querySelector('#searchInput') as HTMLInputElement;
const sortSelect = document.querySelector('#sortSelect') as HTMLSelectElement;
const filterButtons = document.querySelectorAll('.filter__Btn') as NodeListOf<HTMLButtonElement>;
const main = document.querySelector('main') as HTMLElement;
const searchBtn = document.querySelector('#searchBtn') as HTMLButtonElement;

function renderCatalog(title?: string): void {
  main.innerHTML = '';

  fetch('https://fakestoreapi.com/products')
    .then((response) => {
      return response.json();
    }).then((clothes: TClothes[]) => {
      if(title) {
        clothes.forEach((product) => {
          if(product.title.toLowerCase().includes(title)) {
            createClothesCard(product.image, product.title, product.price);
            return;
          }
        });
      } else {
        clothes.forEach((product) => createClothesCard(product.image, product.title, product.price));
      }
    })
}

function createClothesCard(imgURL: string, title: string, price: number): void {
  //* ------------------ Creating HTML elements ------------------
  const productContainer = document.createElement('div');
  productContainer.classList.add('product__container');
  const productImg = document.createElement('img');
  const productInfoDiv = document.createElement('div');
  productInfoDiv.classList.add('product__info');
  const productTitle = document.createElement('h3');
  const priceAndBtnContainer = document.createElement('div');
  priceAndBtnContainer.classList.add('price__button__container')
  const productPrice = document.createElement('span');
  const addToCartBtn = document.createElement('button');
  //* ------------------ Assigning data ------------------
  productImg.src = imgURL;
  productTitle.textContent = title;
  productPrice.textContent = `$ ${price.toString()}`;
  addToCartBtn.textContent = 'Add to Cart';
  //* ------------------ Appending HTML elements ------------------
  priceAndBtnContainer.append(productPrice, addToCartBtn)
  productInfoDiv.append(productTitle, priceAndBtnContainer);
  productContainer.append(productImg, productInfoDiv);
  main.appendChild(productContainer);
}

function sortCatalog(category?: string): void {
  main.innerHTML = '';

  if(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => { 
      return response.json();
    }).then((clothes: TClothes[]) => {
      clothes.forEach((product) => createClothesCard(product.image, product.title, product.price));
    })
    return;
  }

}

//? ------------------ Button events ------------------

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sortCatalog(button.value);
  })
})

searchBtn.addEventListener('click', () => {
  const titleName = searchInput.value.trim().toLowerCase();
  renderCatalog(titleName);
})

// sortSelect.addEventListener('change', () => {
//   if(sortSelect.value === 'desc') {

//   }
// })

renderCatalog();