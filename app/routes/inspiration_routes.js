// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for projects
const Project = require('../models/project')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { project: { title: '', text: 'foo' } } -> { project: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /projects
router.post('/inspiration', requireToken, (req, res, next) => {
  const inspirationData = req.body.inspiration
  const projectId = inspirationData.projectId

  Project.findById(projectId)
    .then(project => {
      project.inspiration.push(inspirationData)
      return project.save()
    })
    // respond to succesful `create` with status 201 and JSON of new "project"
    .then(project => {
      res.status(201).json({ project: project.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /projectss/5a7db6c74d55bc51bdf39793
router.patch('/inspiration/:id', requireToken, removeBlanks, (req, res, next) => {
  const inspirationId = req.params.id
  const inspirationData = req.body.inspiration
  const projectId = inspirationData.projectId

  Project.findById(projectId)
    .then(handle404)
    .then(project => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, project)

      // pass the result of Mongoose's `.update` to the next `.then`
      project.inspiration.id(inspirationId).set(inspirationData)
      return project.save()
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /projectss/5a7db6c74d55bc51bdf39793
router.delete('/inspiration/:id', requireToken, (req, res, next) => {
  const inspirationId = req.params.id
  const inspirationData = req.body.inspiration
  const projectId = inspirationData.projectId
  Project.findById(projectId)
    .then(handle404)
    .then(project => {
      // throw an error if current user doesn't own `project`
      requireOwnership(req, project)
      // delete the project ONLY IF the above didn't throw
      project.inspiration.id(inspirationId).remove()
      return project.save()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
