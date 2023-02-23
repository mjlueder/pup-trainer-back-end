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

const index = async(req, res) => {
  try {
    const dogs = await Dog.findAll()
    res.status(200).json(dogs)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

const update = async(req, res) => {
  try {
    // req.body.ownerId = req.user.profile.id

    const dog = await Dog.findByPk(req.params.id)
    dog.set(req.body)
    await dog.save()

    // find and return full profile? depends on state...

    // const profile = await Profile.findByPk(
    //   req.body.profileId,
    //   { include: [{ model: Vote, as: "votesReceived" }] }
    // )
    // res.status(200).json(profile)

    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}


module.exports = {
  create,
  index,
  update,
}