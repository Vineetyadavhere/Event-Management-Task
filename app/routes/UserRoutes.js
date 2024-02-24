const express = require('express')
const UserController = require('../controller/admin/UserController')
const RegisterEventController = require('../controller/admin/RegisterEventController')
const router = express.Router()



router.post('/admin-logout/:email', UserController.superUserLogout)
router.post('/admin-register', UserController.superUserRegister)
router.post('/user-login', UserController.superUserLogin )
router.get('/count-super-user',UserController.Countsuperuser)
router.get('/get-all-events-backend', RegisterEventController.GetAllBackendEvents)
router.get('/get-backend-event/:id',RegisterEventController.GetBackendEventById)
router.get('/count-backend-events',RegisterEventController.GetBackendEventCount)
router.delete('/delete-event-backend/:id', RegisterEventController.DeleteBackendEventById)
router.patch('/update-backend-event/:id',RegisterEventController.UpdateBackendEventById)
router.get('/getsuperuserslist',UserController.GetUsersBackend)
///////////////


router.post('/frontend-register-eventtypes', RegisterEventController.RegisterEvent)
router.get('/geteventsdetails',RegisterEventController.GetEventTypes)
router.post('/createnewcategory',RegisterEventController.createcategory)
router.get('/getthecategory',RegisterEventController.getcategory)
router.get('/count-total-categories',RegisterEventController.TotalCategoriesCount)
router.patch('/updatethecategory/:id',RegisterEventController.updatecategory)
router.delete('/deletethecategory/:id',RegisterEventController.deletecategory)
router.get('/editcategory/:id',RegisterEventController.EditCategoryById)



module.exports = router