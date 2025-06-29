import { createProduct, updateProduct } from "../api/products.js";

const addProduct = async () => {
  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    ingredients: document.getElementById('ingredients').value,
    type_id: document.getElementById('type.label').value,
    contains_alcohol: document.getElementById('contains_alcohol').value,
    unit_price: document.getElementById('unit_price').value,
    stock_quantity: document.getElementById('stock_quantity').value,
    limit_quantity: document.getElementById('limit_quantity').value,
    image_url: document.getElementById('image_url').value
  };

  try {
    const result = await createProduct(data);

    Swal.fire({
      icon: 'success',
      title: 'Product added',
      text: 'The product has been successfully added.',
      timer: 2000,
      showConfirmButton: false
    });

    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Add failed',
      text: `An error occurred while adding the product: ${error.message}`,
    });

    return null;
  }
};

const saveProduct = async (productId) => {
  const updatedData = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    ingredients: document.getElementById('ingredients').value,
    type_id: document.getElementById('type.label').value,
    contains_alcohol: document.getElementById('contains_alcohol').value,
    unit_price: document.getElementById('unit_price').value,
    stock_quantity: document.getElementById('stock_quantity').value,
    limit_quantity: document.getElementById('limit_quantity').value,
    image_url: document.getElementById('image_url').value
  };

  console.log(updatedData);
  

  try {
    const result = await updateProduct(productId, updatedData);

    Swal.fire({
      icon: 'success',
      title: 'Product updated',
      text: 'The product has been successfully updated.',
      timer: 2000,
      showConfirmButton: false
    });

    return result;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Update failed',
      text: `An error occurred while updating the product: ${error.message}`,
    });

    return null;
  }
};

export { addProduct, saveProduct };
