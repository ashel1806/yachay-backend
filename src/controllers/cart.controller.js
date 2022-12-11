const { QueryTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const { ApiUtils } = require('../utils');

class CartController {
  static async createCart(req, res) {
    try {
      const { idUser } = req.user;

      let sql_query = 'INSERT INTO carrito (id_user) VALUES (?, ?)';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.INSERT,
        replacements: [idUser],
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }

  static async updateCart(req, res) {
    try {
      const { idCart } = req.params;
      const { totalPrice } = req.body;

      let sql_query =
        'UPDATE carrito SET total_charge = ?, active = ? WHERE id_cart = ?';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.UPDATE,
        replacements: [totalPrice, 1, idCart],
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }

  static async getItemsCart(req, res) {
    try {
      const { idCart } = req.params;

      let sql_query = 'SELECT * FROM item_carrito WHERE id_cart = ?';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.SELECT,
        replacements: [idCart],
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }
}

module.exports = CartController;
