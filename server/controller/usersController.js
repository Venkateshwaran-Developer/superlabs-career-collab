const client = require("../config/connectdatabase");

const postUser = async (req, res) => {
    try {
        const { user_title,user_password } = req.body;
        const newUser = await client.query(
            `INSERT INTO users (user_title, user_password) VALUES($1, $2) RETURNING *`,
            [user_title,user_password]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM users`);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_title,user_password } = req.body;
        const updatedUser = await client.query(
            `UPDATE users SET user_title = $1, user_password = $2 WHERE user_id = $3 RETURNING *`,
            [user_title,user_password, id]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser.rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await client.query(
            `DELETE FROM users WHERE user_id = $1 RETURNING *`,
            [id]
        );

        if (deletedUser.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { postUser, getUser, updateUser, deleteUser };
