const mongoose = require("mongoose");
var generator = require('mongoose-gen');

const db = require('../../lib/db');
const Node = require("../models/node");
let typeNode = new Map()

exports.create = (model, req, res) => {
    console.log("model: " + model)
    req.body.formatedName = "node_" + req.body.formatedName
    const newTodoObj = new mongoose.models[model](req.body);
    console.log("create model machin chose")
    console.log(req.body.model)
    newTodoObj.save(err => {
        if (err) {
            console.log(err)
            return res.status(500).json(err);
        }
        this.createModel(model, req.body.model)
        return res.status(200).send(newTodoObj);
    });
}

exports.find = (model, req, res) => {
    console.log(model);
    let query = req.query || {};
    mongoose.models[model].find(query, (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(data);
    });
}

exports.findOne = (model, req, res) => {
    console.log("model: " + model)
    let query = req.body || {};
    mongoose.models[model].findOne(query, (err, data) => {
        if (err) return res.status(200).send(err)
        return res.status(200).send(data)
    });
}

exports.findById = (model, req, res) => {
    mongoose.models[model].findById(req.params.id, (err, object) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(object)
    });
}

exports.update = (model, req, res) => {
    mongoose.models[model].findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.send(todo);
    })
}

exports.delete = (model, req, res) => {
    mongoose.models[model].findByIdAndRemove(req.params.id, (err, todo) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: model +  " successfully deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
}

exports.checkModel = (name) => {
    if (!typeNode.has(name)) {
        return this.createModel(name)
    } else {
        return typeNode[name]
    }
}

exports.createModel = (name, schema) => {
    console.log(schema.to_json)
    let json = JSON.parse(schema);
    console.log('schema ==> ')
    console.log(typeof json)
    console.log(json)
    //const NodeSchema = new db.Schema(generator.convert(json.properties));
    console.log("name: " + name)
    //return db.model(name, NodeSchema);
}

exports.init = async () => {
    console.log("init node")
    let list = await mongoose.models.Node.find({}, (err, data) => {
        if (err) return err
        return data
    });
    list.forEach(element => {
        
        this.createModel(element.formatedName, element.model)
    });
}