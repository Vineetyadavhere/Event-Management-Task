const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const User = require('../models/User')

module.exports = class UserService {
  static async addSuperUser(data) {
    try {
      const create_super_user = await User.create(data)
      return create_super_user
    } catch (error) {
      console.log(`Could not add super USER ${error}`)
      throw error
    }
  }
}
