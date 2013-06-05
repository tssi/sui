
/* Journal Entry Literal Strings */
JournalEntry.REVENUE = {'prefix':'REV','model':'RevenueJournal'};
	
function JournalEntry(type){
	/* Constants */
	var ENTRY = 'JE';
	var DEBIT = 'DEBIT';
	var CREDIT = 'CREDIT';
	var BASE_URL ='/'+window.location.pathname.split('/')[1]+'/';
	/* Prefix */
	var prefix = [];
	prefix.push(ENTRY);
	prefix.push(type.prefix);
	prefix.push('');
	prefix =  prefix.join('_');
	/* Fields and Rules */
	var fields = [prefix+DEBIT,prefix+CREDIT];
	/* Request JSON from System Defaults*/
	var rule = {'DEBIT':'','CREDIT':''};
	$.getJSON(BASE_URL+'system_defaults.json?fields='+fields.join(','),function(json){
		$.each(json.data,function(index,value){
			switch(index){
				case fields[0]:
					rule['DEBIT'] = value;
					break;
				case fields[1]:
					rule['CREDIT'] = value;
					break;
			}
		});
	});
	this.DEBIT = function(id,code,desc,amount){
		var _debit = {};
		_debit[type.model] = {'account_chart_id':id,'amount':amount,'flag':'D'};
		_debit[type.model]['AccountChart'] = {'account_code_full':code,'description':desc};
		_debit['Debit'] = {'amount':amount};
		_debit['Credit'] = {'amount':'0.00'};
		return _debit;
	}
	this.CREDIT = function(id,code,desc,amount){
		var _credit = {};
		_credit[type.model] = {'account_chart_id':id,'amount':amount,'flag':'C'};
		_credit[type.model]['AccountChart'] =  {'account_code_full':code,'description':desc};
		_credit['Debit'] = {'amount':'0.00'};
		_credit['Credit'] = {'amount':amount};
		return _credit;
	}
	this.rule = rule;
}
	