class UserController {
  async registration(req, res, next) {
    try {

    } catch(e) {

    }
  }

  async login(req, res, next) {
    try {

    } catch(e) {
      
    }
  }

  async logout(req, res, next) {
    try {

    } catch(e) {
      
    }
  }

  async activate(req, res, next) {
    try {

    } catch(e) {
      
    }
  }

  async refresh(req, res, next) {
    try {

    } catch(e) {
      
    }
  }
  
  async getUsers(req, res, next) {
    try {
      res.status(201).json(['123','test'])
    } catch(e) {
      console.log(e)
    }
  }
}

export default new UserController();