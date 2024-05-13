// const { Error } = require('mongoose')
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')



// get All Task
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(200).json({ tasks: tasks })
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

// create Task
// const createTask = async (req, res) => {
//     try {
//         const task = await Task.create(req.body)
//         res.status(201).json({ task })
//     }
//     catch (error) {
//         res.status(500).json({ msg: error })
//     }

// }


const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

// get single task
// const getTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params
//         const task = await Task.findOne({ _id: taskID })
//         if (!task) {
//             return res.status(404).json({ msg: `no such tasks with ${taskID}` })
//         }
//         res.status(200).json({ task })

//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

// update task
// const updateTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params
//         const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
//         if (!task) {
//             return res.status(404).json({ msg: `no such task with id ${taskID}` })
//         }
//         res.status(200).json({ task })
//     } catch (error) {
//         res.status(404).json({ msg: error })
//     }
// }

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

// delete the task
// const deleteTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params
//         const task = await Task.findByIdAndDelete({ _id: taskID })
//         if (!task) {
//             return res.status(404).json({ msg: `no such task with id ${taskID} to Delete` })
//         }
//         res.status(200).json({ task })

//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }


const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }