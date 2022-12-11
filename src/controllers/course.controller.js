const { QueryTypes } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const { ApiUtils } = require('../utils');

const { Course, CourseDetails } = require('../models');

class CourseController {
  // Método para obtener todos los cursos
  static async findAllCourses(req, res) {
    try {
      // Verificamos si se desea obtener todos los detalles del curso
      const showDetails = req.query.details === 'true';

      // Columnas principales
      let sql_columns = 'c.id_course, c.id_teacher, c.name, c.banner';

      // Columnas del detalle de un curso
      let sql_details_columns =
        'dc.id_category, ' +
        'dc.resume, ' +
        'dc.updated_at, ' +
        'dc.language, ' +
        'dc.files_count, ' +
        'dc.rating, ' +
        'dc.price, ' +
        'dc.discount, ' +
        'dc.benefits, ' +
        'dc.target_public, ' +
        'dc.description';

      // Si se desea obtener todos los detalles del curso agregamos
      // las columnas del detalle al query
      sql_columns += showDetails ? `, ${sql_details_columns}` : '';

      // Query principal
      let sql_query = `SELECT ${sql_columns} FROM curso c`;

      // Si se desea obtener todos los detalles del curso agregamos
      // el JOIN al query
      sql_query += showDetails
        ? ' INNER JOIN detalles_curso dc ON c.id_course = dc.id_course'
        : '';

      // Ejecutamos el query
      const courses = await sequelize.query(sql_query, {
        type: QueryTypes.SELECT,
      });

      // Enviamos la respuesta al cliente
      return ApiUtils.sendResponse(res, 200, courses);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }

  // Método para obtener un curso por su id
  static async findCourseById(req, res) {
    try {
      // Obtenemos el id del curso a buscar
      const { idCourse } = req.params;

      // Columnas principales
      let sql_columns = 'id_course, id_teacher, name, banner';

      // Query principal
      let sql_query = `SELECT ${sql_columns} FROM curso WHERE id_course = ?`;

      // Ejecutamos el query
      const course = await sequelize.query(sql_query, {
        type: QueryTypes.SELECT,
        replacements: [idCourse], // Reemplazamos el ? por el id del curso,
        model: Course, // Mapeamos el resultado a un modelo de Sequelize (Course),
        mapToModel: true,
      });

      // Enviamos la respuesta al cliente
      return ApiUtils.sendResponse(res, 200, course);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }

  // Método para agregar un curso
  static async createCourse(req, res) {
    try {
      const { idTeacher, name, banner } = req.body;

      let sql_query =
        'INSERT INTO curso (id_teacher, name, banner) VALUES (?, ?, ?)';
      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.INSERT,
        replacements: [idTeacher, name, banner],
        model: Course,
        mapToModel: true,
      });

      console.log({ results, metadata });

      return ApiUtils.sendResponse(res, 200, results);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }

  // Método para agregar los detalles de un curso
  static async createCourseDetails(req, res) {
    try {
      // Obtenemos los datos del cuerpo de la petición
      const {
        idCourse,
        idCategory,
        resume,
        updatedAt,
        language,
        filesCount,
        rating,
        price,
        discount,
        benefits,
        targetPublic,
        description
      } = req.body;

      // Query principal
      let sql_query =
        'INSERT INTO detalles_curso (id_course, id_category, resume, updated_at, language, files_count, rating, price, discount, benefits, target_public, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      // Ejecutamos el query
      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.INSERT,
        replacements: [
          idCourse,
          idCategory,
          resume,
          updatedAt,
          language,
          filesCount,
          rating,
          price,
          discount,
          benefits,
          targetPublic,
          description
        ],
        model: CourseDetails,
        mapToModel: true,
      });

      // Enviamos la respuesta al cliente
      return ApiUtils.sendResponse(res, 200, results);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }

 
  static async updateCourse(req, res) {
    try {
      
      // Obtenemos el parametro de la peticion
      const { idCourse } = req.params;

      // Obtenemos los datos del cuerpo de la petición
      const { idTeacher, name, banner } = req.body;

      // Query principal
      let sql_query =
        'UPDATE curso SET id_teacher=?, name=?, banner=? WHERE id_course=?';
      
      // Ejecutamos el query
      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.UPDATE,
        replacements: [idTeacher, name, banner, idCourse],
        model: Course,
        mapToModel: true,
      });

      console.log({ results, metadata });

      // Enviamos la respuesta al cliente
      return ApiUtils.sendResponse(res, 200, results);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }

  static async updateCourseDetails(req, res) {
    try {
      
      // Obtenemos el parametro de la peticion
      const { idCourse } = req.params;

      // Obtenemos los datos del cuerpo de la petición
      const {
        idCategory,
        resume,
        updatedAt,
        language,
        filesCount,
        rating,
        price,
        discount,
        benefits,
        targetPublic,
        description
      } = req.body;

      // Query principal
      let sql_query =
        'UPDATE detalles_curso SET id_category=?, resume=?, updated_at=?, language=?, files_count=?, rating=?, price=?, discount=?, benefits=?, target_public=?, description=? WHERE id_course=?';
      
      // Ejecutamos el query
      const [results, metadata] = await sequelize.query(sql_query, {
        type: QueryTypes.UPDATE,
        replacements: [
          idCategory,
          resume,
          updatedAt,
          language,
          filesCount,
          rating,
          price,
          discount,
          benefits,
          targetPublic,
          description,
          idCourse
        ],
        model: CourseDetails,
        mapToModel: true,
      });

      console.log({ results, metadata });

      // Enviamos la respuesta al cliente
      return ApiUtils.sendResponse(res, 200, results);
    } catch (err) {
      console.log(err);
      return ApiUtils.sendResponse(res, 500, err);
    }
  }
}

module.exports = CourseController;
