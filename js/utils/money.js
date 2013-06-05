$(document).ready(function(){
	window.MoneyBank = [];
	$(document).bind('honey-money',function(){
		$.each($('div.money,span.money'),function(c,o){
			var mbid =  $(o).attr('data-mbid');
			var hasChanged = false;
			var value =parseFloat($(o).attr('data-value'));
			var text =$(o).attr('data-text');
			var monetary = isNaN(value)?$(o).text():value;
			if(isNaN(monetary))  monetary = 0;
			
			if(text!=$(o).text()){
				monetary=parseFloat($(o).text());
				hasChanged=true;
				if($(o).parent().hasClass('negative')) monetary*=-1;
			}
			
			
			if(mbid==undefined){
				MoneyBank.push(monetary);
				$(o).attr('data-mbid',MoneyBank.length);
				$(o).attr('data-value',monetary);
				hasChanged = true;
			}else if(MoneyBank[mbid-1]!=monetary ){
				MoneyBank[mbid-1] = monetary;
				$(o).attr('data-value',parseFloat(monetary));
				hasChanged = true;
			}
			
			if(hasChanged){	
				var v = number_format (Math.abs(monetary), '2', '.', ',');
				$(o).text(v);
				$(o).attr('data-text',v);
				if(monetary<0){
					$(o).parent().addClass('negative');
				}else{
					$(o).parent().removeClass('negative');
				}
			}	
		});
	}); 
	setInterval(function(){$(document).trigger('honey-money')},100);
});
function number_format (number, decimals, dec_point, thousands_sep) {
	  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	  var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
		  var k = Math.pow(10, prec);
		  return '' + Math.round(n * k) / k;
		};
	  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	  if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	  }
	  if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	  }
	  return s.join(dec);
}