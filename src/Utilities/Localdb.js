// set data on local storage
const addToDb = (_id, storageName) => {
  let cartItem = getFromLocalDb(storageName);

  if (!cartItem) {
    cartItem = {};
  }
  if (cartItem[_id] >= 1) {
    cartItem[_id] += 1;
  } else {
    cartItem[_id] = 1;
  }
  localStorage.setItem(storageName, JSON.stringify(cartItem));
};

// get data from localstorage
const getFromLocalDb = (storageName) => {
  let cartItem = JSON.parse(localStorage.getItem(storageName));
  if (!cartItem) {
    cartItem = {};
  }
  return cartItem;
};

// update item quantity on localstorage
const updateQuantityOnDb = (newCart, storageName) => {
  const storedProducts = getFromLocalDb("products-list");
  for (let id in storedProducts) {
    const updatedProduct = newCart.find((item) => item?._id === id);
    storedProducts[id] = updatedProduct.quantity;
  }
  localStorage.setItem("products-list", JSON.stringify(storedProducts));
};

// delete item from localstorage
const deleteItemFromDb = (_id, storageName) => {
  const storedProducts = getFromLocalDb(storageName);
  delete storedProducts[_id];
  localStorage.setItem(storageName, JSON.stringify(storedProducts));
};

// remove collection from localStorage
const removeFromDb = (storageName) => {
  localStorage.removeItem(storageName);
};

export {
  addToDb,
  getFromLocalDb,
  deleteItemFromDb,
  removeFromDb,
  updateQuantityOnDb,
};
