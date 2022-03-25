const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';

const sqlQueries = { 
	GET_NOTES: 'SELECT * FROM Notes WHERE User_id = ?',
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?'
}

class NoteController {
	
	async getAllNotes(req, res) {

		let responseTamplate = {
			urgentImportant: [],
			notUrgentImportant: [],
			urgentNotImportant: [],
			notUrgentNotImportant: []
		};

		await sqlite.open(connectionString);

		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		const rows = await sqlite.all(sqlQueries.GET_NOTES, [user.Id]);
		for (let i = 1; i < 5; i++) {
			rows.filter(note => note.Priority === i)
				.map(note => {
					if(i==1) responseTamplate.urgentImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==2) responseTamplate.notUrgentImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==3) responseTamplate.urgentNotImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==4) responseTamplate.notUrgentNotImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
				});
		}

		await sqlite.close();

		res.json(responseTamplate).status(200);
	}

	async createNote(req, res) {

		const note = req.body.note;
		console.log(note)
		const entry = `'${note.Title}', '${note.Text}', '${note.Priority}'`;

		await sqlite.open(connectionString);

		try {
			const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
			const row = await sqlite.run(`INSERT INTO Notes (title, text, priority, User_id) VALUES (${entry}, "${user.Id}"")`);
		} catch(e) {
			res.status(500).send(e.message);
		}

		await sqlite.close();

		res.status(200).send('OK');
	}

	async editNodeById(req, res) {

		const newNote = req.body.note;
		console.log(req.body);

		await sqlite.open(connectionString);

		try {
			await sqlite.run(`UPDATE Notes SET Title = "${newNote.Title}", Text = "${newNote.Text}", Priority = "${newNote.Priority}"  WHERE id = ${req.params.id}`);
		} catch(e) {
			res.status(500).send(e.message);
		}

		await sqlite.close();

		res.status(200).send('OK');
	}

	async deleteNoteById(req, res) {

		await sqlite.open(connectionString);

		const row = await sqlite.run(`DELETE FROM Notes WHERE Id = ${req.params.id}`);
		
		await sqlite.close();

		res.status(200).send('OK');
	}
}

module.exports = new NoteController();