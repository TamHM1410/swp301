const auth = require("./auth-routes");
const product =require("./product-routes")

const webApi = (app) => {
  app.use("/api/v1", auth);
  app.use("/api/v1", product);

};

module.exports = webApi;
