const express = require('express');
const router = express.Router()
const authenticate = require('../app/middlewares/authenticate');
const userController = require('../app/controller/userController');
const categoryController = require('../app/controller/categoryController');
const expenseController = require('../app/controller/expenseController');
const colorController = require('../app/controller/colorController');


//----User Routes----//

router.post('/api/user', userController.create)
router.post('/api/user/login', userController.login)
router.put('/api/users/budget', authenticate, userController.addbudget)
router.get('/api/users/account', authenticate, userController.show)
router.post('/api/account/delete', authenticate, userController.deleteAccount)

//----Category Routes----//
router.post('/api/add/category', authenticate, categoryController.create)
router.get('/api/category', authenticate, categoryController.list)
router.delete('/api/category/delete/:id', authenticate, categoryController.destroy)



//----Expense Routes----//
router.put('/api/update/:id', authenticate, expenseController.update)
router.post('/api/add/expense', authenticate, expenseController.create)
router.get('/api/showDeleted/expense', authenticate, expenseController.showDeleted)
router.get('/api/show/expense', authenticate, expenseController.show)
router.put('/api/undo/:id', authenticate, expenseController.UndoDelete)
router.delete('/api/remove/:id', authenticate, expenseController.softDelete)




router.post('/api/random', colorController.create)
router.put('/api/savestamp/:id', colorController.addTime)
router.post('/api/findstamps/:id', colorController.findStamps)


module.exports = router