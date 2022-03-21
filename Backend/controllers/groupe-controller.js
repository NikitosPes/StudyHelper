const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';

const sqlQueries = { 
	GET_ALL_STUDENTS: 'SELECT * FROM Students',
	GET_STUDENT_BY_ID: 'SELECT * FROM Students WHERE Id = ?',
	GET_STUDENT_BY_EMAIL: 'SELECT * FROM Students WHERE Email = ?',
	UPDATE_STUDENT_BY_ID: 'UPDATE Students SET Name = ?, Surname = ?, Email = ?, Phone = ? WHERE Id = ?',
	INSERT_STUDENT: 'INSERT INTO Students (Name, Surname, Email, Phone, Group_id) VALUES (?, ?, ?, ?, ?)',
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?',
}


class GroupController {
	
	async createStudent (req, res) {
		const student = req.body.student;
		sqlite.open(connectionString);
		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		let row = await sqlite.get(sqlQueries.GET_STUDENT_BY_EMAIL, [student.email]);

		if(row)
			return res.json({message: "user with this email is already exists"});

		const sql = `INSERT INTO Students (Name, Surname, Email, Phone, Group_id) VALUES ("${student.Name}", "${student.Surname}", "${student.Email}", "${student.Phone}", ${user.Group_id})`
		await sqlite.run(sql);
		sqlite.close();
	}


	async deleteStudent (req, res) {
		console.log('delete');
		sqlite.open(connectionString);		
		const result = await sqlite.run(`DELETE FROM Students WHERE Id = ${req.params.id}`);
		result ? res.json({status: 200}) : res.json({status: 500}); 
		sqlite.close();
	}


	async updateStudent (req, res) {

		const student = req.body.student;
		console.log(student);
		sqlite.open(connectionString);
		
		await sqlite.run(`UPDATE Students SET Name = '${student.Name}', Surname = '${student.Surname}', Email = '${student.Email}', Phone = '${student.Phone}' WHERE Id = ${req.params.id}`);
		res.json({status: 200}); 
		sqlite.close();
	}


	async getAllStudentsFromGroup (req, res) { //TODO: sortBySurname
		sqlite.open(connectionString);
		const rows = await sqlite.all(sqlQueries.GET_ALL_STUDENTS,[]);
		res.json(rows);
		sqlite.close();
	}

}

module.exports = new GroupController();