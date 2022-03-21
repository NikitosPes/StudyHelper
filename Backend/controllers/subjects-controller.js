const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';

const sqlQueries = {
	GET_SUBJECTS: 'SELECT Id, Name, ClassroomURL, SubjectPriority FROM GroupSubject LEFT JOIN Subjects ON GroupSubject.Subject_id = Subjects.Id WHERE Group_id = ?',
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?',
	GET_SUBJECT_ID_BY_NAME: 'SELECT Id FROM Subjects WHERE Name = ?'
}


class SubjectsController {

	async getAllSubjects(req, res) {
		let result = {exam: [], credit: []};
		sqlite.open(connectionString);
		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		const rows = await sqlite.all(sqlQueries.GET_SUBJECTS, [user.Id]);
		rows.map(item => item.SubjectPriority === 1 
					? result.exam.push({Id: item.Id, Name: item.Name, ClassroomURL: item.ClassroomURL})
					: result.credit.push({Id: item.Id, Name: item.Name, ClassroomURL: item.ClassroomURL}));
		res.json(result);
		sqlite.close();
	}

	async createSubject(req, res) {
		sqlite.open(connectionString);
		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		await sqlite.run(`INSERT INTO Subjects (Name) VALUES ("${subject.name}")`);
		const newSubjectId = await sqlite.get(sqlQueries.GET_SUBJECT_ID_BY_NAME, [subject.name]);
		await sqlite.run(`INSERT INTO GroupSubject (Group_id, Subject_id) VALUES (${user.groupId}, ${newSubjectId})`);
		sqlite.close();
	}

	async deleteSubjectById(req, res) {
		sqlite.open(connectionString);
		await sqlite.run(`DELETE FROM Subjects WHERE Id = ${req.params.id}`);
		sqlite.close();
	}

	async updateSubjectById(req, res) {
		const Id = req.params.id;
		const subject = req.body;
		sqlite.open(connectionString);
		await sqlite.run(`UPDATE Subjects SET Name = ${req.body.name} WHERE Id = ${req.params.id}`)
		sqlite.close();
	}


}

module.exports = new SubjectsController();
