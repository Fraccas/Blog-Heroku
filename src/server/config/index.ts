
let environment = process.env.Node_ENV || 'development'; // node_env undefined
export default require(`./${environment}`).default;