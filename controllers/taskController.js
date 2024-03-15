const taskService = require("../services/taskService");

const createTask = async (req,res) => {
try {
const {title,description,isCompletedTask,priority} = req.body;
const userId = req.user.id;

const task = await taskService.createTask({
    title,
    description,
    isCompletedTask,
    priority,
    userId,
});

res.status(201).json(task);
} catch (error) {
    res.status(500).json({message: error.message});
}
};

const getAllTasks = async (req,res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getAllTasks(userId);
        
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const getTaskById = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;
        const task = await taskService.getTaskById(id,userId);

        if(!task) {
            res.status(404).json({message : "Task not found"});
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateTask = async (req,res) => {
    try {

        const {id} = req.params;
        const userId = req.user.id;

        const updateData = req.body;

        const task = await taskService.updateTask(id,userId,updateData);
        if(!task) {
            res.status(404).json({message : "Task not found."})
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

const deleteTask = async (req,res) => {
    try {
        const {id} = req.params;
        const userId = req.user.id;

        const success = await taskService.deleteTask(id,userId);
        if(!success) {
            res.status(404).json({message : "Task not found"});
        }

        res.status(204).json({message :"task deleted"});

    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports = {createTask, getAllTasks,getTaskById, updateTask, deleteTask};