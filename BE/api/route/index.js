const itemController = require("../controller/index");

const routers = (app) => {
  app
    .route("/items")
    .get(itemController.paginateItem)
    .post(itemController.addItem)
    .delete(itemController.deleteOneItem);
  app
    .route("/items/:id")
    .delete(itemController.deleteItem)
    .put(itemController.updateItem);
  app.route("items/search").get(itemController.searchItem);
};

module.exports = routers;
