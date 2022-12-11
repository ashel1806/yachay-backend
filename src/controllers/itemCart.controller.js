const { QueryTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const { ApiUtils } = require('../utils');

class ItemCartController {
  static async createItemCart(req, res) {
    try {
      const { idCourse, idCart } = req.body;

      let sql_query =
        'INSERT INTO item_carrito (id_cart, id_course) VALUES (?, ?)';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.INSERT,
        replacements: [idCart, idCourse],
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }

  static async deleteItemCart(req, res) {
    try {
      const { idItemCart } = req.params;

      let sql_query = 'DELETE FROM item_carrito WHERE id_item_cart = ?';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.DELETE,
        replacements: [idItemCart],
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }
}

module.exports = ItemCartController;
