const express = require('express');
const router = express.Router();
const {updateUser, register, deleteUser, getUserDetailByAccountNumber, login, getUserDetailByIdentityNumber} = require('../controller/controller.user')
const {verifyToken} = require('../libs/libs.jwt')

router.post('', register);

router.post('/login',login)

router.delete('/',verifyToken, deleteUser)

router.put('/',verifyToken, updateUser)

router.get('/account/:account_number',verifyToken, getUserDetailByAccountNumber)
router.get('/identity/:identity_number', verifyToken, getUserDetailByIdentityNumber)

module.exports = router;