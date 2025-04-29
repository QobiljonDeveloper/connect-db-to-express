const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

// ** Frontenddan kelayotkan ma'lumotlar paramsda bodyda ,queryda keladi
const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, role } = req.body;
  db.query(
    `
            INSERT INTO users (first_name, last_name,email,password,phone,role) 
            VALUES (?,?,?,?,?,?) 
            `,
    [first_name, last_name, email, password, phone, role],
    (error, result) => {
      if (error) {
        console.log(`Error adding new user`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      console.log(result);
      res
        .status(201)
        .send({ message: "Yangi user qo'shildi", userId: result.insertId });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM users where id = ${id}`, (error, result) => {
    if (error) {
      console.log(`Error get all users`, error);
      return res.status(500).send({ message: "Serverda xatolik!" });
    }
    res.send(result[0]);
  });
};

const removeUserById = (req, res) => {
  let { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: `${err.message}` });
    }
    res.status(200).send({ message: "User deleted successfully" });
  });
};

const updateUserById = (req, res) => {
  let { id } = req.params;
  let data = req.body;
  updateValue = queryGenerate(data);
  let values = Object.values(data);

  db.query(
    `UPDATE users SET ${updateValue} WHERE id=?`,
    [...values, id],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: `${err.message}` });
      }
      res.status(200).send({ message: "User updated successfully" });
    }
  );
};
const getUsersByDatas = (req, res) => {
  let { first_name, last_name, email, phone } = req.body;

  let where = "true";

  if (first_name) {
    where += ` AND first_name like "%${first_name}%"`;
  }

  if (last_name) {
    where += ` AND last_name like "%${last_name}%"`;
  }

  if (email) {
    where += ` AND email like "%${email}%"`;
  }

  if (phone) {
    where += ` AND phone like "%${phone}%"`;
  }

  if (where == "true") {
    return res.status(400).send({ message: "Qidirishda parametrlar kiriting" });
  }

  db.query(`SELECT * FROM users WHERE ${where}`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: `${err.message}` });
    }
    res.send(result);
  });
};
const getUsersByRole = (req, res) => {
  let { role } = req.body;

  db.query(`SELECT * FROM users WHERE role = ?`, [role], (err, result) => {
    if (err) {
      return res.status(500).send({ message: `${err.message}` });
    }
    res.send(result);
  });
};

const findOwnerStadiums = (req, res) => {
  let { first_name, last_name } = req.body;

  db.query(
    `SELECT u.first_name , u.phone, s.name, image_url from users u
     LEFT JOIN stadium s ON u.id = s.owner_id
     LEFT JOIN images i  ON s.id = i.stadion_id
     WHERE first_name = '${first_name}' and last_name = '${last_name}'`,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: `${err.message}` });
      }
      res.send(result);
    }
  );
};

const findUsersRewievedStadion = (req, res) => {
  let { phone } = req.body;

  db.query(
    `
    SELECT  u.first_name, u.last_name, u.phone, s.name from users u 
    JOIN review r on u.id = r.user_id
    JOIN stadium s on r.stadion_id = s.id
    WHERE  u.phone LIKE '%${phone}%'
    `,
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.send({ data: result });
    }
  );
};

const callProcedures = (req, res) => {
  db.query("CALL getAllUsers()");
  if (err) {
    return res.status(500).send({ message: err.message });
  }
  res.status(200).send({ data: result });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUsersByDatas,
  findOwnerStadiums,
  findUsersRewievedStadion,
  callProcedures,
};
