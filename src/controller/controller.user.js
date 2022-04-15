const mongoose = require("mongoose");
require('dotenv').config()
const jwt = require('jsonwebtoken')
const redisClient = require('../libs/libs.redis')

const User = require('../model/model.user')

const register = async (req, res) => {
    try {
        await redisClient.connect()
        const { username, account_number, email, identity_number } = req.body
        const userExist = await redisClient.exists(identity_number)
        if (userExist) throw { status: 400, message: `User with identity number ${identity_number} already exist` }
        const user = new User({ _id: new mongoose.Types.ObjectId(), userName: username, accountNumber: account_number, emailAddress: email, identityNumber: identity_number })
        const result = await user.save()
        if (!result) throw { status: 400, message: 'Failed to insert user' }
        const setRedis = await redisClient.set(identity_number, JSON.stringify({ username, account_number, identity_number, email }))
        await redisClient.disconnect()
        if (!setRedis) throw { status: 400, message: 'Failed to set redis key' }
        res.status(200).send({ status: 200, message: 'User created' })
    } catch (err) {
        if (await redisClient.ping() == 'PONG') await redisClient.disconnect()
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { identity_number, email } = req.body
        const user = await User.findOne({ identityNumber: identity_number, emailAddress: email })
        if (!user) throw { status: 400, message: `User with email ${email} and identity ${identity_number} not found` }
        const token = jwt.sign({ id: user.identityNumber }, process.env.TOKEN_KEY, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ status: 200, message: 'Login success', token })
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        await redisClient.connect()
        await Promise.all([
            redisClient.del(req.userId),
            User.deleteOne({ identityNumber: req.userId })
        ])
        await redisClient.disconnect()
        res.status(200).send({ status: 200, message: 'User deleted' })
    } catch (err) {
        if (await redisClient.ping() == 'PONG') await redisClient.disconnect()
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        await redisClient.connect()
        const { userName, emailAddress } = req.body
        if (!(userName && emailAddress)) throw { status: 400, message: 'Please check your request body' }
        const [result] = await Promise.all([
            User.findOneAndUpdate({ identityNumber: req.userId }, { userName, emailAddress }, { new: true }),
            redisClient.connect()
        ])
        const newValue = JSON.stringify(
            {
                username: result.userName,
                identity_number: result.identityNumber,
                account_number: result.accountNumber,
                email: result.emailAddress
            }
        )
        await redisClient.set(req.userId, newValue)
        await redisClient.disconnect()
        res.status(200).send({ status: 200, message: 'Update user success' })
    } catch (err) {
        if (await redisClient.ping() == 'PONG') await redisClient.disconnect()
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

const getUserDetailByAccountNumber = async (req, res) => {
    try {
        await redisClient.connect()
        const { account_number } = req.params
        let user = await redisClient.get(req.userId)
        await redisClient.disconnect()
        user = JSON.parse(user)
        if (!(user && user.account_number == account_number)) throw { status: 200, message: 'User not found' }
        res.status(200).send({ status: 200, data: user })
    } catch (err) {
        if (await redisClient.ping() == 'PONG') await redisClient.disconnect()
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

const getUserDetailByIdentityNumber = async (req, res) => {
    try {
        await redisClient.connect()
        const { identity_number } = req.params
        let user = await redisClient.get(req.userId)
        await redisClient.disconnect()
        user = JSON.parse(user)
        if (!(user && user.identity_number == identity_number)) throw { status: 200, message: 'User not found' }
        res.status(200).send({ status: 200, data: user })
    } catch (err) {
        if (await redisClient.ping() == 'PONG') await redisClient.disconnect()
        res.status(err.status || 504).send({ status: err.status || 504, message: err.message })
    }
}

module.exports = {
    register, getUserDetailByAccountNumber, getUserDetailByIdentityNumber, deleteUser, updateUser, login
}