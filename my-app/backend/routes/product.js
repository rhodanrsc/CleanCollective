const router = require('express').Router();
const Product = require("../models/product.model");
const Company = require("../models/company.model")

router.route('/').get((req, res) => {
    Product.ProductCollection.find()
    .then(products => res.send(products))
    .catch(err => res.status(400).json('Error: Could not fetch Products - ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const owner = req.body.owner;
    const tags = req.body.tags;

    Company.CompanyCollection.findById(owner)
    .then(company => {

        const new_product = new Product.ProductCollection({
        name : name,
        description : description,
        image : image,
        owner : company,
        tags : tags
        });

        new_product.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.json(company));

        company.products.push(new_product)
        company.save()
        .then(() => res.json('Product added to company'))
        .catch(err => res.status(400).json('Error: Could not add product to company - ' + err));
    })
    .catch((err) => res.status(400).json("Error: company not found " + err));
});

module.exports = router;