const express = require('express');
const products = require('./apiProductos');

const app = express();
const routerProductos = express.Router();

app.use('/api/productos', routerProductos);
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const apiProducts = new products.Products();

//#region Middlewares
function validateProduct(req, res, next) {
  let product = req.body;
  apiProducts.validateProduct(product) == true
    ? next()
    : res.status(400).json({ error: 'Invalid Body' });
}

function existProduct(req, res, next) {
  let id = req.params.id;
  apiProducts.existsProduct(id) == true
    ? next()
    : res.status(400).json({ error: `Product ${id} not found` });
}

function updateProduct(req, res, next) {
  let id = req.params.id;
  let product = req.body;
  apiProducts.updateProduct(product, id) == true
    ? next()
    : res.json({ error: `Product ${id} not found` });
}

//#endregion

//#region  RUTAS
routerProductos.get('/', (req, res) => {
  res.json(apiProducts.arrayProducts);
});

routerProductos.get('/:id', existProduct, (req, res) => {
  let id = req.params.id;
  let product = apiProducts.getProduct(id);
  res.json(product);
});

routerProductos.post('/', validateProduct, (req, res) => {
  let product = req.body;
  apiProducts.saveProduct(product);
  res.json(product);
});

routerProductos.put('/:id', validateProduct, updateProduct, (req, res) => {
  res.json(req.body);
});

routerProductos.delete('/:id', existProduct, (req, res) => {
  let id = req.params.id;
  apiProducts.deleteProduct(id);
  res.json(`Product ${id} deleted successfully`);
});

//#endregion

//#region Server Listen
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));
//#endregion
