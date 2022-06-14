import express from 'express';

const app = express();
const routerProductos = express.Router();

app.use('/api/productos', routerProductos);
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let arrayProducts = [
  {
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    id: 1,
  },
  {
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    id: 2,
  },
  {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
    id: 3,
  },
];

//#region Middlewares
function validateProduct(req, res, next) {
  let product = req.body;
  if (
    product.title != null &&
    product.price != null &&
    product.thumbnail != null
  ) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid Body' });
  }
}

function newId(req, res, next) {
  req.body.id = arrayProducts[arrayProducts.length - 1].id + 1;
  next();
}

function existProduct(req, res, next) {
  let id = req.params.id;
  let product = arrayProducts.find((product) => product.id == id);
  product != undefined
    ? next()
    : res.status(400).json({ error: `Product ${id} not found` });
}

function updateProduct(req, res, next) {
  let id = req.params.id;
  let index = arrayProducts.findIndex((product) => product.id == id);
  if (index != -1) {
    req.body.id = parseInt(id);
    arrayProducts[index] = req.body;
    next();
  } else {
    res.json({ error: `Product ${id} not found` });
  }
}

//#endregion

//#region  RUTAS
routerProductos.get('/', (req, res) => {
  res.json(arrayProducts);
});

routerProductos.get('/:id', existProduct, (req, res) => {
  let id = req.params.id;
  let product = arrayProducts.find((product) => product.id == id);
  res.json(product);
});

routerProductos.post('/', validateProduct, newId, (req, res) => {
  arrayProducts.push(req.body);
  res.json(req.body);
});

routerProductos.put('/:id', validateProduct, updateProduct, (req, res) => {
  res.json(req.body);
});

routerProductos.delete('/:id', existProduct, (req, res) => {
  let id = req.params.id;
  arrayProducts = arrayProducts.filter((product) => product.id != id);
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
