const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';

const sqlQueries = {
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?',
	GET_SCHEDULE: 'SELECT s.Id, s.Time, sub.Name AS SubjectName, s.DaysOfWeek_id, dow.name FROM Schedule s'+
					' LEFT JOIN Subjects sub' +
					' ON s.Subject_id = sub.Id' +
					' LEFT JOIN DaysOfWeek dow' +
					' ON s.DaysOfWeek_id = dow.Id' +
					' WHERE Group_id = ?' +
					' ORDER BY DaysOfWeek_id',
}

class ScheduleController {

	async getSchedule(req, res) {

		const responseTamplate = { monday: [], tuesday: [], wednsday: [], thursday: [], friday: [], saturday: [] };

		await sqlite.open(connectionString);

		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		const rows = await sqlite.all(sqlQueries.GET_SCHEDULE, [user.Id]);

		let index = 1;
		while(index < 7) {
			let oneDaySchedule = rows.filter(item => item.DaysOfWeek_id === index)
				.map(item => ({Id: item.Id, Time: item.Time, SubjectName: item.SubjectName}));
			if(index === 1) responseTamplate.monday.push(...oneDaySchedule);
			if(index === 2) responseTamplate.tuesday.push(...oneDaySchedule);
			if(index === 3) responseTamplate.wednsday.push(...oneDaySchedule);
			if(index === 4) responseTamplate.thursday.push(...oneDaySchedule);
			if(index === 5) responseTamplate.friday.push(...oneDaySchedule);
			if(index === 6) responseTamplate.saturday.push(...oneDaySchedule);
			index++;
		}

		await sqlite.close();

		res.json(responseTamplate).status(200);
	}

}

module.exports = new ScheduleController();