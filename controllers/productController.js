const productService = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newProduct = await productService.createProduct({ name, price, stock });
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateProduct(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
