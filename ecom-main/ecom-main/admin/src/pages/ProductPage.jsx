  import React, { useState, useEffect } from 'react';
  import { FaPencilAlt, FaTrash, FaStar } from 'react-icons/fa';

  const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [addProductForm, setAddProductForm] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });
  const [updateProductForm, setUpdateProductForm] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (event) => {
    event.preventDefault();
  
    try {
      // Fetch existing products to find the maximum ID
      const response = await fetch('https://fakestoreapi.com/products');
      const existingProducts = await response.json();
  
      const maxId = Math.max(...existingProducts.map((product) => product.id));
  
      const newProductId = maxId + 1;
  
      const responseAdd = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newProductId,
          ...addProductForm,
          rating: { rate: 0, count: 0 },
        }),
      });
  
      if (!responseAdd.ok) {
        // Handle non-OK response
        console.error(`Error adding new product. Status: ${responseAdd.status}, ${responseAdd.statusText}`);
        return;
      }
  
      const newProduct = await responseAdd.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      console.log('New Product:', newProduct);
      setShowAddModal(false);
      setAddProductForm({
        title: '',
        price: 0,
        description: '',
        image: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };
  
  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${selectedProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProductForm),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProductId ? { ...product, ...updateProductForm } : product
          )
        );
        console.log('Updated Product (PUT):', updateProductForm);
        setShowUpdateModal(false);
        setUpdateProductForm({
          title: '',
          price: 0,
          description: '',
          image: '',
          category: '',
        });
        setShowUpdateModal(false)
      } else {
        console.error('Error updating product (PUT):', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product (PUT):', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`https://fakestoreapi.com/products/${productId}`, {
          method: 'DELETE',
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        console.log('Deleted Product:', productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    return (
      <div>
        <div className='product-header'>
          <h2>Products</h2>
          <button className="add-btn"onClick={() => setShowAddModal(true)}>Add Product</button>
        </div>

        <div>
          <input
            type="text"
            className='search-bar'
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearch}
          />

        </div>
        <div className="cardContainer">
        {filteredProducts.map((product, index) => (
          <div key={`${product.id}-${index}`}className="cardProduct">
            <div className='button-container'>
              <div onClick={() => {
                setShowUpdateModal(true);
                setSelectedProductId(product.id);
                setUpdateProductForm({
                  title: product.title,
                  price: product.price,
                  description: product.description,
                  image: product.image,
                  category: product.category,
                });
              }}>
                <FaPencilAlt />
              </div>
              <div onClick={() => handleDeleteProduct(product.id)}>
                <FaTrash />
              </div>
            </div>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.title} />
            {product.rating && (
              <p><FaStar/> {product.rating.rate} ({product.rating.count} reviews)</p>
            )}
          </div>
        ))}

      </div>

        {showAddModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Product</h2>
              <form onSubmit={handleAddProduct}>
                <input
                  type="text"
                  placeholder="Title"
                  value={addProductForm.title}
                  onChange={(e) => setAddProductForm({ ...addProductForm, title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={addProductForm.price}
                  onChange={(e) => setAddProductForm({ ...addProductForm, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={addProductForm.description}
                  onChange={(e) => setAddProductForm({ ...addProductForm, description: e.target.value })}
                />
                 <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setAddProductForm({...addProductForm, image: reader.result });
                    };

                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={addProductForm.category}
                  onChange={(e) => setAddProductForm({ ...addProductForm, category: e.target.value })}
                />
                <button type="submit">Add</button>
              </form>
              <button  className='close'  onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showUpdateModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Update Product</h2>
              <form onSubmit={handleUpdateProduct}>
                <input
                  type="text"
                  placeholder="Title"
                  value={updateProductForm.title}
                  onChange={(e) => setUpdateProductForm({ ...updateProductForm, title: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={updateProductForm.price}
                  onChange={(e) => setUpdateProductForm({ ...updateProductForm, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={updateProductForm.description}
                  onChange={(e) =>
                    setUpdateProductForm({ ...updateProductForm, description: e.target.value })
                  }
                />
                 <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setUpdateProductForm({ ...updateProductForm, image: reader.result });
                    };

                    if (file) {
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={updateProductForm.category}
                  onChange={(e) =>
                    setUpdateProductForm({ ...updateProductForm, category: e.target.value })
                  }
                />
                <button type="submit">Update</button>
              </form>
              <button className='close' onClick={() => setShowUpdateModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ProductPage;
