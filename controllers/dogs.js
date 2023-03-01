const { Dog } = require('../models')
const { v2 } = require('cloudinary')

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
    const dogs = await Dog.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
  })
    res.status(200).json(dogs)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

const update = async(req, res) => {
  try {
    const dog = await Dog.findByPk(req.params.id)
    dog.set(req.body)
    await dog.save()
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

const deleteDog = async(req, res) => {
  try {
    const dog = await Dog.findByPk(req.params.id)
    await dog.destroy()
    res.status(200).json(dog)
  } catch (error) {
    res.status(500).json(error)
    console.log(error);
  }
}

const addPhoto = async(req, res) =>{
  try {
    const imageFile = req.files.photo.path;
    console.log('ImageFile ', imageFile);
    const dog = await Dog.findByPk(req.params.id)
    const image = await v2.uploader.upload(imageFile, {tags: 'dog photo'});
    dog.photo = image.url;
    await dog.save();
    res.status(201).json(dog)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  }

module.exports = {
  create,
  index,
  update,
  delete: deleteDog,
  addPhoto
}