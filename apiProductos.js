class Products {
  arrayProducts = [
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

  newId() {
    let id = 1;
    if (this.arrayProducts.length >= 1) {
      id = this.arrayProducts[this.arrayProducts.length - 1].id + 1;
    }

    return id;
  }

  existsProduct(id) {
    let product = this.arrayProducts.find((product) => product.id == id);
    if (product != undefined) {
      return true;
    } else {
      return false;
    }
  }

  validateProduct(product) {
    if (
      product.title != null &&
      product.price != null &&
      product.thumbnail != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  updateProduct(product, id) {
    if (this.existsProduct(id)) {
      let index = this.arrayProducts.findIndex((product) => product.id == id);
      if (index != -1) {
        product.id = parseInt(id);
        this.arrayProducts[index] = product;
        return true;
      }
    } else {
      return false;
    }
  }

  saveProduct(product) {
    product.id = this.newId();
    this.arrayProducts.push(product);
  }

  getAll() {
    return this.arrayProducts;
  }

  getById(id) {
    return this.arrayProducts.find((product) => product.id == id);
  }

  deleteById(id) {
    this.arrayProducts = this.arrayProducts.filter(
      (product) => product.id != id
    );
  }
}

exports.Products = Products;
