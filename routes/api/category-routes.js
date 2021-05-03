const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET /api categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categoryResData) => {
      if (!categoryResData) {
        res.status(404).json({ message: "No categories found." });
        return;
      }
      res.json(categoryResData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((categoryResData) => {
      if (!categoryResData) {
        res.status(404).json({ message: "No category found with that id." });
        return;
      }
      res.json(categoryResData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((category) => {
    if (!category) {
      res.status(404).json({ message: "No category with that id found." });
      return;
    }
    res.json(category);
  });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "No category with that id found." });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
