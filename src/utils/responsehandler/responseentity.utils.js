// ResponseObject.js

class ResponseEntity {
  constructor(data, statusCode, status, message) {
    this.data = data;
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

export default ResponseEntity;
