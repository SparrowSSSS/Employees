const {prisma} = require("../prisma/prisma-client");

/**
 * 
 * @route POST /api/user/employees/all
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(500).json({message: "Не удалось получить сотрудников"});
    };
};

/**
 * 
 * @route POST /api/user/employees/add
 * @desc Добавление сотрудников
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            res.status(400).json({message: "Не заполнены обязательные поля"});
        };

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id

            }
        });

        return res.status(200).json(employee);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Не удалось добавить сотрудника"});
    };
};

/**
 * 
 * @route POST /api/user/employees/remove/:id
 * @desc Удаление сотрудников
 * @access Private
 */
const remove = async (req, res) => {
    try {

        const {id} = req.params;

        await prisma.employee.delete({
            where: {
                id
            }
        });

        res.status(204).json("OK");

    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Не удалось удалить сотрудника"});
    };
};

/**
 * 
 * @route PUT /api/user/employees/edit/:id
 * @desc Редактирование сотрудников
 * @access Private
 */
const edit = async (req, res) => {
    try {

        const data = req.body;
        const {id} = req.params;

        await prisma.employee.update({
            where: {
                id
            },
            
            data
        });

        res.status(204).json("OK");

    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Не удалось редактировать сотрудника"});
    };
};

/**
 * 
 * @route GET /api/user/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */
const employee = async (req, res) => {
    try {

        const {id} = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        });

        const user = await prisma.user.findUnique({
            where: {
                id: employee.userId
            }
        });

        res.status(200).json({...employee, userName: user.name});

    } catch (e) {
        console.log(e);
        res.status(500).json({message: "Не удалось получить сотрудника"});
    };
};

module.exports = {
    all,
    add,
    remove,
    edit,
    employee
};