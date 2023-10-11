"use strict";

window.addEventListener("load", changeAddForm);

function changeAddForm(param) {
  // change active button.
  document.querySelector("#change-to-add-artist").classList.value = "";
  document.querySelector("#change-to-add-song").classList.value = "";
  document.querySelector(`#change-to-add-${param}`).classList.add("active");

  // change active form.
  document.querySelector("#add-artist-div").classList.value = "hidden";
  document.querySelector("#add-song-div").classList.value = "hidden";
  document.querySelector(`#add-${param}-div`).classList.value = "";
}

export {
  changeAddForm
};