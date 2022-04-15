const express = require('express');
const router = express.Router();
const { updateUser, register, deleteUser, getUserDetailByAccountNumber, login, getUserDetailByIdentityNumber } = require('../controller/controller.user')
const { verifyToken } = require('../libs/libs.jwt')
const { registerPayload, updatePayload, validate } = require('../libs/libs.validator')

router.post('', registerPayload(), validate, register);

router.post('/login', login)

router.delete('/', verifyToken, deleteUser)

router.put('/', verifyToken, updatePayload(), validate, updateUser)

router.get('/account/:account_number', verifyToken, getUserDetailByAccountNumber)
router.get('/identity/:identity_number', verifyToken, getUserDetailByIdentityNumber)

module.exports = router;