const express = require("express");

const { Product } = require("./models");
const app = express();
const port = 8080;
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//show all data product
app.get("/products", (req, res) => {
  Product.findAll().then((products) => {
    res.status(200).json(products);
  });
});

// show select data product by id
app.get("/products/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  }).then((product) => {
    res.status(200).json(product);
  });
});

//insert data product
app.post("/products", (req, res) => {
  const { name, category, price, description, image } = req.body;

  Product.create({
    name: name,
    category: category,
    price: price,
    description: description,
    image: image,
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(422).json(" can't create product");
    });
});

// update data product
app.put("/products/:id", (req, res) => {
  const { name, category, price, description, image } = req.body;
  Product.update(
    {
      name: name,
      category: category,
      price: price,
      description: description,
      image: image,
    },
    {
      where: { id: req.params.id },
    }
  )
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(422).json("can't update data");
    });
});

app.delete("/product/:id", (req, res) => {
  Product.destroy({
    where: { id: req.params.id },
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(422).json(" can't delete data");
    });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
