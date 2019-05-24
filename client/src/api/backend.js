import Axios from "axios";

export default Axios.create({
  baseURL: 'https://api-hof.demarsh.dev',
});

// export default Axios.create({
//   baseURL: 'http://localhost:3000',
// });
