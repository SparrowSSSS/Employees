const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

/**
 * 
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async function (req, res) {
    try {


        const { password, email } = req.body;

        if (!password || !email) return res.status(400).json({ message: "Заполните обязательные поля" });

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" })
            });
        } else {
            return res.status(200).json({ message: "Неверно введён логин или пароль" });
        };
    } catch (e) {
        return res.status(500).json({ message: e.message });
    };
};

/**
 * 
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async function (req, res) {
    try {


        const { email, password, name } = req.body;

        if (!email || !password || !name) return res.status(400).json({ message: "Заполните обязательные поля" });

        const registeredUser = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (registeredUser) return res.status(400).json({ message: "Пользователь с таким email уже существует" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" })
            })
        } else {
            return res.status(400).json({ message: "Не удалось создать пользователя" });
        };
    } catch (e) {
        return res.status(500).json({ message: e.message });
    };
};

/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async function (req, res) {
    res.status(200).json(req.user);
};

module.exports = {
    login,
    register,
    current
}