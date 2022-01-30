'use strict'

const navbarMenuBtn = document.querySelector(".menu-button-con");
const primaryMenuPanel = document.querySelector("#primary-hamburger-nav-panel");
const secondaryMenuPanel = document.querySelector("#secondary-hamburger-nav-panel");
const allNavMenuPanels = document.querySelectorAll(".hamburger-navs");
const secondaryNavbarMenuBtn = document.querySelectorAll(".secondary-open-btn");
const navbarMenuMask = document.querySelector(".hamburger-navs-mask");

navbarMenuBtn.addEventListener("click" , () =>
{
  navbarMenuBtn.classList.toggle("active");
  navbarMenuMask.classList.toggle("show");
  openPrimaryNav();
  closeAllNavs()
  function openPrimaryNav()
  {
    primaryMenuPanel.classList.add("show")
  }
  function closeAllNavs()
  {
    navbarMenuBtn.classList.contains("active") || allNavMenuPanels.forEach( (nav) => {nav.classList.remove("show")})
  }
})

secondaryNavbarMenuBtn.forEach((btn)=>{
  btn.addEventListener("click" , () =>
  {
    openSecondaryNav();
    // closeAllNavs()
    function openSecondaryNav()
    {
      secondaryMenuPanel.classList.toggle("show")
    }
  })
})


// async function getISS() {
//         const response = await fetch('Starbucks.json');
//         const data = await response.json();
//         const menu = data.menus;
//         console.log(menu);
//         let coffee = menu.find((section) => section.name == "Merchandise");
//         coffee.children.forEach((e ,inx) =>
//         {
//           console.log(`0${inx+1}: ${e.name}`);
//          e.children.forEach((eve ,i) => console.log(`${i+1}: ${eve.name}`));
//
//        })
//
//       }
//
//
//       getISS()
