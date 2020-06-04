const controller = require('../controllers/node');
const express = require("express");
const Node = require("../models/node");
let router = express.Router();
let model = "Node";
let baseName = "node";


/** pour la gestion des noeuds */

// list of nodes
router.get('/', (req, res) => { 
  controller.find(model, req, res);
});

// find node by id
router.get('/:id', (req, res) => { 
  controller.findById(model, req, res);
});
// create a node
router.post('/', (req, res) => { 
  controller.create(model, req, res);
});
// update a node
router.put('/:id', (req, res) => { 
  controller.update(model, req, res);
});
// delete a node
router.delete('/:id', (req, res) => { 
  controller.delete(model, req, res);
});

/** pour la gestion des objets des different noeud */

// list of object's node
router.get('/:nameNode/elements', (req, res) => {
  controller.find(`${req.params.nameNode}`, req, res);
});

// find an object's node by here id
router.get('/:nameNode/elements/:id', (req, res) => { 
  controller.findById(`${req.params.nameNode}`, req, res);
});

// create an object's node
router.post('/:nameNode/elements', (req, res) => { 
  controller.create(`${req.params.nameNode}`, req, res);
});

// update an object's node
router.put('/:nameNode/elements/:id', (req, res) => { 
  controller.update(`${req.params.nameNode}`, req, res);
});

// delete an object's node
router.delete('/:nameNode/elements/:id', (req, res) => { 
  controller.delete(`${req.params.nameNode}`, req, res);
});


module.exports = router;