const School = require('../model/school.model')

const { throwError } = require('../utils/errorhandler')

const { getDistanceFromLatLonInKm } = require('../utils/helper')

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body

  if (!name || !address || latitude == undefined || longitude == undefined) {
    return throwError(res, 400, 'All fields are required.')
  }

  try {
    const school = await School.create({ name, address, latitude, longitude })
    res.status(201).json({ message: 'School added successfully.', school })
  } catch (error) {
    return throwError(res, 500, 'Error adding school.')
  }
}

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query

  if (!latitude || !longitude) {
    return throwError(res, 400, 'Latitude and Longitude are required.')
  }

  try {
    const schools = await School.findAll()

    const schoolsWithDistance = schools.map((school) => {
      const distance = getDistanceFromLatLonInKm(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude,
      )
      return { ...school.toJSON(), distance }
    })

    schoolsWithDistance.sort((a, b) => a.distance - b.distance)

    res.status(200).json({ schools: schoolsWithDistance })
  } catch (error) {
    return throwError(res, 500, 'Error fetching schools.')
  }
}
