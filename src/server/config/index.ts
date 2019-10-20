
let environment = process.env.Node_ENV || 'production'; // node_env only exist on heroku
export default require(`./${environment}`).default; 