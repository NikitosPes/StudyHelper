const sqlite = require('../helper/dbHelper.js');
const connectionString = '../studyHelper_db.db';


const sqlQueries = { 
	GET_NOTES: 'SELECT * FROM Notes WHERE User_id = ?',
	UPDATE_NOTE_BY_ID: 'UPDATE Notes SET title = ?, text = ? WHERE id = ?',
	INSERT_NOTE: 'INSERT INTO Notes (title, text, User_id) VALUES (?)',
	GET_USER_BY_EMAIL: 'SELECT * FROM Users WHERE Email = ?'
}

class NoteController {
	
	async getAllNotes(req, res) {
		let result = {
			urgentImportant: [],
			notUrgentImportant: [],
			urgentNotImportant: [],
			notUrgentNotImportant: []
		};
		sqlite.open(connectionString);
		const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
		const rows = await sqlite.all(sqlQueries.GET_NOTES, [user.Id]);
		for (let i = 1; i < 5; i++){
			rows.filter(note => note.Priority === i)
				.map(note => {
					if(i==1) result.urgentImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==2) result.notUrgentImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==3) result.urgentNotImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
					if(i==4) result.notUrgentNotImportant.push({Id: note.Id, Title: note.Title, Text: note.Text, Priority: note.Priority});
				})
		}
		res.json(result);
		sqlite.close();
	}

	async deleteNoteById(req, res) {
		sqlite.open(connectionString);
		const row = await sqlite.run(`DELETE FROM Notes WHERE Id = ${req.params.id}`);
		row ? res.json({status: 200}) : res.json({status: 500});
		sqlite.close();
	}

	async editNodeById(req, res) {
		const newNote = req.body
		sqlite.open(connectionString);
		try {
			await sqlite.run(`UPDATE Notes SET Title = "${newNote.Title}", Text = "${newNote.Text}", Priority = "${newNote.Priority}"  WHERE id = ${req.params.id}`);
		} catch(e) {
			console.log(e);
		}
		sqlite.close();
		res.json({status: 'ok'})
	}

	async createNote(req, res) {
		const note = req.body;
		sqlite.open(connectionString);
		try {
			const user = await sqlite.get(sqlQueries.GET_USER_BY_EMAIL, [req.username]);
			const row = await sqlite.run(`INSERT INTO Notes (title, text, priority, User_id) VALUES ("${note.Title}", "${note.Text}", "${note.Priority}", ${user.Id})`);
		} catch(e) {
			console.log(e);
		}
		sqlite.close();
		res.json({message: "ok"});
	}
}

module.exports = new NoteController();