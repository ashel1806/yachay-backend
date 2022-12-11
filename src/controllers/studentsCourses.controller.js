const { QueryTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const { ApiUtils } = require('../utils');

const { StudentsCourses } = require('../models');

class StudentsCoursesController {
  static async enrollInCourse(req, res) {
    try {
      const idUser = req.user.idUser;
      const idCourse = req.params.idCourse;

      let sql_query =
        'INSERT INTO estudiantes_cursos (id_student, id_course) VALUES (?, ?)';

      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.INSERT,
        replacements: [idUser, idCourse],
        mapToModel: true,
        model: StudentsCourses,
      });

      console.log('StudentsCoursesController - enrollInCourse()', {
        results,
        metadata,
      });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }

  static async getStudentCourses(req, res) {
    try {
      const { expand } = req.query;
      let sql_columns = 'id_student_course, id_student, id_course';
      let sql_query = `SELECT ${sql_columns} FROM estudiantes_cursos`;

      if (expand && expand === 'student') {
        sql_columns += ', name, email';
        sql_query +=
          ' INNER JOIN usuario ON estudiantes_cursos.id_student = usuario.id_user';
      }

      if (expand && expand === 'course') {
        sql_columns += ', title, description';
        sql_query =
          ' INNER JOIN curso ON estudiantes_cursos.id_course = curso.id_course';
      }

      if (expand && expand === 'all') {
        sql_columns =
          'ec.id_student_course, ec.id_student, ec.id_course, u.name, u.email, c.name, c.title, description';
        sql_query = `SELECT ${sql_columns} FROM estudiantes_cursos ec INNER JOIN usuario u ON estudiantes_cursos.id_student = usuario.id_user INNER JOIN curso c ON estudiantes_cursos.id_course = curso.id_course`;
      }

      const studentCourses = await sequelize.query(sql_query, {
        type: QueryTypes.SELECT,
      });

      return ApiUtils.sendResponse(res, 200, studentCourses);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }

  static async getStudentCourseById(req, res) {
    try {
      const { idStudentCourse } = req.params;

      if (!idStudentCourse) {
        return ApiUtils.sendResponse(res, 400, 'idStudentCourse is required');
      }

      if (isNaN(idStudentCourse)) {
        return ApiUtils.sendResponse(
          res,
          400,
          'idStudentCourse is not a number'
        );
      }

      let sql_columns = 'id_student_course, id_student, id_course';

      let sql_query = `SELECT ${sql_columns} FROM estudiantes_cursos`;
      sql_query += ' WHERE id_student_course = ?';

      const studentCourse = await sequelize.query(sql_query, {
        type: QueryTypes.SELECT,
        replacements: [idStudentCourse],
      });

      return ApiUtils.sendResponse(res, 200, studentCourse);
    } catch (error) {
      console.log(error);
      return ApiUtils.sendResponse(res, 500, error);
    }
  }
}

module.exports = StudentsCoursesController;
