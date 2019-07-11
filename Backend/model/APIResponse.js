var constants = require('../constant');

class APIResponse {
    constructor(sc, result) {
        this.status = sc;
        if (sc == constants.STATUS_CODE.SUCCESS) {
            result ? this.response = result : constants.EMPTY;
        } else {
            result ? this.error = result : constants.EMPTY;
        }
        this.time = new Date().getTime();
    }
}

module.exports = APIResponse;