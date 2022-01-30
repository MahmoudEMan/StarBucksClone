
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "y58v543jsrwg",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "rIIPYnu1LmP7J6ulWlT9ssBhP2sz5ZefEnx4SZAJ72g"
});

// console.log(client);



let productsG ;

const leftMentNav = document.querySelector(".menu-side-sections.left-side");
const rightMentNav = document.querySelector(".menu-side-sections.right-side");
const leftNavSelect = document.querySelectorAll(".section-nav-child");


class Products {
  async getProducts() {
    try {
      let contentfulz = await client.getEntry('16vUz8gX47SnuCLCVzl5np')

      // .then(entry => console.log(entry))
      // .catch(err => console.log(err));

      // console.log(contentfulz.fields.starbucksMenu.menus);
      let products = contentfulz.fields.starbucksMenu.menus;
      // const response = await fetch('Starbucks.json');
      // const data = await response.json();
      // products = data.menus;
      return products
    } catch (e) {
      console.log(e);
    }
  }
}

class UI {
  displayProducts(products) {
    console.log(products);
    productsG = products
    leftMentNav.innerHTML = " ";
    // rightMentNav.innerHTML = "";
    const sectionsTitle = this.getProductsSectionsHeader(products);
    // console.log(sectionsTitle);

    // console.log(sectionsTitle);
    sectionsTitle.forEach((title, idx) => {
      const children = this.getChildrenTitle(title, products);

      /// left nav display
      const childrenHtml = children.map(child => {
        return `<li><a class="section-nav-child" href="" data-section="${child}" >${child}</a></li>`
      })

      const movRow = `<section>
        <h4 class="menu-nav-name">${title}</h4>
        <ul>
          ${childrenHtml.join("\n")}
        </ul>
      </section>`;
      leftMentNav.insertAdjacentHTML('beforeend', movRow);


      //right aside display

      const menuChildrenHTML = children.map(child => {
        return `<div class="select-sec" data-section="${child}" data-section_parent="${title}">
          <div class="menu-image-con">
            <img src="${this.getMainImage(child,title,products ,idx)}" alt="">
          </div>
          <h3 class="select-sec-title">${child}</h3>
        </div>`
      })
      // console.log(menuChildrenHTML);
      const rightMenRow = `<section class="menuSection">
        <h2 class="sb-rule">${title}</h2>
        <hr>
        <div class="flexy">

          ${menuChildrenHTML.join("\n")}

        </div>
      </section>`;
      rightMentNav.insertAdjacentHTML('beforeend', rightMenRow);

    })

    //declare buttons
    this.declareButtons();
  }
  getProductsSectionsHeader(products) {
    const sectionsTitle = products.map(product => product.name)
    return sectionsTitle;
  }
  getChildrenTitle(title, products) {
    const obj = products.find(product => product.name == title);
    // console.log(obj);
    // console.log(obj);
    const childrenNames = obj.children.map(child => child.name);
    // console.log(childrenNames);
    return childrenNames;
  }
  getMainImage(child, title, products, idx) {
    const image = products[idx].children.find(product => product.name == child)
    if (image.children.length > 0) {
      const secondStep = image.children[0].products[0].assets.masterImage.uri;
      return secondStep
    } else if (image.children.length == 0) {
      const secondStep = image.products[0].assets.masterImage.uri;
      return secondStep
    }
  }
  declareButtons(){
    const leftNavSelect = document.querySelectorAll(".section-nav-child");
    const rightNavSelect = document.querySelectorAll(".select-sec");
    leftNavSelect.forEach( btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const sectionParentName =  e.currentTarget.parentNode.parentElement.previousElementSibling.innerText;
        const sectionName = e.currentTarget.dataset.section;
        this.getSelectedProducts(sectionParentName,sectionName);
      })
    });

    rightNavSelect.forEach( btn => {
      btn.addEventListener("click" , e => {
        const sectionParentName =e.currentTarget.dataset.section_parent
        const sectionName = e.currentTarget.dataset.section;
        this.getSelectedProducts(sectionParentName,sectionName);

      })
    })

  }
  getSelectedProducts(parent , child){
    rightMentNav.innerHTML = "";
    rightMentNav.insertAdjacentHTML('beforeend',`<h1 class="menuText"><a href="menu.html"><i class="fas fa-long-arrow-alt-left"></i> Menu</a>/${child}</h1> `)
    console.log(parent,child, "hoy");
      const stepOne = productsG.find( product => product.name == parent).children;
      const stepTwo = stepOne.find( e => e.name ==child);
      if (stepTwo.children.length > 0) {
        const thirdStep = stepTwo.children
        // [0].products[0].assets.masterImage.uri;
        // return secondStep
        // console.log(thirdStep);
        console.log(thirdStep);
        this.displaySelectedProducts(thirdStep);
      } else if (stepTwo.children.length == 0) {
        const thirdStep = stepTwo
        // [0].assets.masterImage.uri;
        // return secondStep
        console.log(thirdStep);
        this.displaySelectedProducts([thirdStep]);
      }
      window.scroll(0, 0)
  }
  displaySelectedProducts(products){

    products.forEach( product => {
      const menuChildrenHTML = product.products.map(child => {
        return `<div class="select-sec" data-section="${child.name}" >
          <div class="menu-image-con">
            <img src="${this.getMenuImage(child)}" alt="">
          </div>
          <h3 class="select-sec-title">${child.name}</h3>
        </div>`
      });

      const rightMenRow = `<section class="menuSection">
        <h2 class="sb-rule">${product.name}</h2>
        <hr>
        <div class="flexy">

          ${menuChildrenHTML.join("\n")}

        </div>
      </section>`;
      rightMentNav.insertAdjacentHTML('beforeend', rightMenRow);


      // console.log(product.products);
    } )
  }
  getMenuImage(child){
    if(child.assets.masterImage.uri)
    {
      return child.assets.masterImage.uri
    }else
    {
      return child.assets.thumbnail.large.uri
    }
  }
}


class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products))
  }
  static getFullProducts()
  {
    return localStorage.getItem('products');
  }
  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id == id)
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  //
  // ui.setupAPP();
  //
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products)
  })
  // products.getProducts().then((products) => {
  //
  //   ui.displayProducts(products);
  //   Storage.saveProducts(products)
  //
  // }).then(() => {
  //   ui.getBagButtons();
  //
  // });
  // ui.cartLogic();


});
