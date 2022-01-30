'use strict'

const favoriteTavBtns = document.querySelectorAll(".tab-list-btn");
const favoriteTabSlider = document.querySelector(".tab-slider");
const favoritePanelTabs = document.querySelectorAll(".favorites-choice");

favoriteTavBtns.forEach(btn => {

  btn.addEventListener("click" , function(e){
    const idxNeeded = Array.from(favoriteTavBtns).indexOf(e.currentTarget);
    // console.log(Array.from(favoriteTavBtns).indexOf(e.currentTarget));
    changeSliderPosition(idxNeeded);
    showFavouritePanel(idxNeeded)

  })

})

const changeSliderPosition = function(idx){
  favoriteTabSlider.style.left = `${idx * 20}%`;
}

const showFavouritePanel = function(idx){
  favoritePanelTabs.forEach( panel => panel.classList.remove("tabPanelActive"));
  favoritePanelTabs[idx].classList.add("tabPanelActive");
}
