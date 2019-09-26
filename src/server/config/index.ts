
let environment = process.env.Node_ENV || 'production'; // node_env undefined so set production default
export default require(`./${environment}`).default; 