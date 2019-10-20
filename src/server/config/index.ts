
let environment = process.env.Node_ENV || 'development'; // node_env only exist on heroku
export default require(`./${environment}`).default; 