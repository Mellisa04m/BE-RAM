// Importing required modules
const express = require('express');
const bodyParser = require('body-parser')
const port = 5000;

// Initialize the app
const app = express();
const productRoutes = require('./routes/products');
const path = require('path');

fetch('http://localhost:5000/api/products')
  .then(response => response.json())
  .then(data => {console.log(data);})
  .catch(error => console.error('Error:', error));

app.use(express.json()); 
app.use('/api/products', productRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// List of products
app.get('/api/products', (req, res) =>  {
    res.json([{ id: 1, name: 'New Balance 530' }])
    res.json([{ id: 2, name: 'New Balance 550' }])
    res.json([{ id: 3, name: 'New Balance 574' }])
    res.json([{ id: 4, name: 'New Balance 327' }])
    res.json([{ id: 5, name: 'Jordan 1 Zion Williamson' }])
    res.json([{ id: 6, name: 'Jordan 4 Retro Military Black' }])
});

// Fetch all products
const Product = require('./Product');
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } 
    catch (err) {
        res.status(500).send('Server Error');
    }
});

app.get('/api/products/:id', (req, res) => {
    const products = [
        { id: 1, name: 'New Balance 530', price: 6000 },
        { id: 2, name: 'New Balance 550', price: 5500 },
        { id: 3, name: 'New Balance 574', price: 5500 },
        { id: 4, name: 'New Balance 327', price: 4500 },
        { id: 5, name: 'Jordan 1 Zion Williamson', price: 5500 },
        { id: 6, name: 'Jordan 4 Retro Military Black', price: 4500 },
    ];
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product); // Respond with the product details
    } else {
        res.status(404).json({ message: 'Product not found' }); // Send error if not found
    }
});



// Add new product
app.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Update product route (assuming you have a route defined for updating a product)
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    // Here you would typically update the product in the database
    // For example:
    // const result = await ProductModel.update(productId, updatedData);

    // Sending a response back to the client
    res.json({ message: `Product ${productId} updated`, updatedData });
});
