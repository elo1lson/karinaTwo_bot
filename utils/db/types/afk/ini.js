var low = require('lowdb');
var fsync = require('../../../../utils/db/plugins/local_footer.js');

var adap = new fsync({db:"db",ftr:"afk_data"},{defaultValue:{"all":[]}});
var db = low(adap);

class data_afk {
	constructor(){
		
	}
	new(member,motiv, day) {
		if(db.get('all').find({id: member.id}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
		db.get('all').push({
			id: member.id,
			afk: motiv,
			data: day
		}).write()
	}
	add(c,nw) {
		
	}
	find(c) {
		return db.get('all').find({id: c.id}).value()
	}
	get_(c) {
		
	}
	set_() {
		
	}
	delete(c){
		db.get('all').remove({id: c.id}).write()
	}
}
module.exports = data_afk;