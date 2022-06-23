class Products {
  arrayProducts = [];

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

  getProduct(id) {
    return this.arrayProducts.find((product) => product.id == id);
  }

  deleteProduct(id) {
    return this.arrayProducts.filter((product) => product.id != id);
  }
}

exports.Products = Products;
