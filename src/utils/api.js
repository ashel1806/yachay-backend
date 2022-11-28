class ApiUtils {
  /**
   * Método que envia la respuesta al cliente
   * @param {Response} response
   * @param {number} code
   * @param {Array<T>} data
   * @return {Response}
   */
  static sendResponse(response, code, data) {
    if (Number(code) >= 400) {
      return response.status(code).json({
        code,
        errors: data,
      });
    } else {
      return response.status(code).json({
        code,
        data,
      });
    }
  }
}

module.exports = ApiUtils;
