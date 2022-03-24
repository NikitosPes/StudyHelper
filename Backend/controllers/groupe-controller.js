const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';

const sqlQueries = { 
	GET_ALL_STUDENTS: 'SELECT * FROM Students ORDER BY Surname',
	GET_STUDENT_BY_EMAIL: 'SELECT * FROM Students WHERE Email = ?',
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?'
}

class GroupController {

	async getAllStudentsFromGroup (req, res) { 

		await sqlite.open(connectionString);

		const rows = await sqlite.all(sqlQueries.GET_ALL_STUDENTS, []);

		await sqlite.close();

		res.json(rows).status(200);
	}

	async createStudent (req, res) {

		const createdStudent = req.body.student;
		const entry = `'${createdStudent.Name}', '${createdStudent.Surname}', '${createdStudent.Phone}', '${createdStudent.Email}'`;

		await sqlite.open(connectionString);

		try {
			const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
			const sql = `INSERT INTO Students (Name, Surname, Email, Phone, Group_id) VALUES (${entry}, "${user.Group_id}")`;
			await sqlite.run(sql);
		} catch(e) {
			res.status(500).send(e.message);
		}

		await sqlite.close();

		res.status(200).send('OK');
	}

	async updateStudent (req, res) {

		const updatingStudent = req.body.student;

		await sqlite.open(connectionString);

		try {
			await sqlite.run(`UPDATE Students SET Name = '${updatingStudent.Name}', Surname = '${updatingStudent.Surname}', Email = '${updatingStudent.Email}', Phone = '${updatingStudent.Phone}' WHERE Id = ${req.params.id}`);
		} catch(e) {
			res.status(500).send(e.message);
		}

		await sqlite.close();
		
		res.status(200).send('OK')
	}


	async deleteStudent (req, res) {

		await sqlite.open(connectionString);

		const result = await sqlite.run(`DELETE FROM Students WHERE Id = ${req.params.id}`);

		await sqlite.close();

		res.status(200).send('OK');
	}

}

module.exports = new GroupController();