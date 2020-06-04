const db = require('../../lib/db');

const NodeSchema = new db.Schema({
    name: { type: String, required: true },
    formatedName: { type: String, unique: true, required: true },
    description: { type: String },
    model: { type: Object, required: true },
    active: {type: Boolean, default: true}
});

const NodeModel = db.model('Node', NodeSchema);

module.exports = NodeModel;