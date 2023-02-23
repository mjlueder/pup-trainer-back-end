const { Dog } = require('../models')

const create = async (req, res) => {
  try {
    req.body.ownerId = req.user.profile.id
    const dog = await Dog.create(req.body)
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

module.exports = {
  create,

}