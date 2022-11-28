const { QueryTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const { ApiUtils } = require('../utils');

const { Course, CourseDetails } = require('../models');

class CourseController {
  static async findCourses(req, res) {
    try {
      let sql_query = 'SELECT * FROM curso';
      const [results, metadata] = await sequelize.query(sql_query);

      return ApiUtils.sendResponse(res, 200, { results, metadata });
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }
}

module.exports = CourseController;
