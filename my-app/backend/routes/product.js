const router = require("express").Router();
const Product = require("../models/product.model");
const Company = require("../models/company.model");

router.route("/").get((req, res) => {
  Product.ProductCollection.find()
    .then((products) => res.send(products))
    .catch((err) =>
      res.status(400).json("Error: Could not fetch Products - " + err)
    );
});

/*
Saves a product.
Saves company as an owner of the product.
*/
router.route("/add/:id").post((req, res) => {
  Company.CompanyCollection.findById(req.params.id)
    .then((company) => {
      const name = req.body.name;
      const description = req.body.description;
      const image = req.body.image;
      const tags = req.body.tags;
      let idString = company._id.toString();
      const owner = {
        ownerID: idString,
        ownerName: company.companyName,
      };

      const new_product = new Product.ProductCollection({
        name: name,
        description: description,
        image: image,
        owner: owner,
        tags: tags,
      });

      new_product
        .save()
        .then(function () {
          company.products.push(new_product);
          company
            .save()
            .then(() => res.json("Product added to company"))
            .catch((err) =>
              res
                .status(400)
                .json("Error: Could not add product to company - " + err)
            );
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.status(400).json("Error: company not found " + err));
});

module.exports = router;
