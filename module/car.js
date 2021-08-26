//建立一個模組

let brand = "賓士";
let product = "轎車";
let flavor = "xxx";
let price = "NT1900000";

function getBrand() {
  return brand;
}

function getName() {
  return product;
}

function getFlavor() {
  return flavor;
}

function getPrice() {
  return price;
}


module.exports = {
  getBrand,
  getName,
  getFlavor
}