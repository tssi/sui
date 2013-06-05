TSSi.Server=(function(){
	var server = $('.server');
	this.date =  new Date(server.attr('server-date'));
	this.year =  server.attr('server-year');
	//Remove atttribute for security
	server.removeAttr('server-date').removeAttr('server-year');
	this.isoDate =TSSi.Date.format(this.date,TSSi.Date.format.masks.isoDate);
	//Populate defaults
	$('input.server-date').attr('data-date-default',this.isoDate);
	$('input.server-date').val(this.isoDate).attr('pattern','[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])');
	return this;
}());