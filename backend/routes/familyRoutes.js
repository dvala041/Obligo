const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')
const {
    getFamilies,
    getFamilyById,
    createFamily,
    updateFamily,
    deleteFamily,
    addMember,
    updateMemberRole,
    removeMember
} = require('../controllers/familyController')

router.use(requireAuth)

//get all families
router.get('/', getFamilies)

//get a family by it's id
router.get('/:id', getFamilyById)

//create a family
router.post('/', createFamily)

//update a family's name
router.patch('/:id', updateFamily)

//delete a family
router.delete('/:id', deleteFamily)

// Add a member to a family
router.patch('/:id/addMember', addMember);

// Update a member's role in a family
router.patch('/:id/updateMemberRole', updateMemberRole);

// Remove a member from a family
router.patch('/:id/removeMember', removeMember);



module.exports = router

