function success(status, msg) {
  return {
    status: "Ok",
    statusCode: status,
    result: msg,
  };
}

function error(status, msg) {
  return {
    status: "Error",
    statusCode: status,
    message: msg,
  };
}

module.exports = { success, error };
