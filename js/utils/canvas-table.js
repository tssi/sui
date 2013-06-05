$(document).ready(function(){
	$('.canvasForm').bind('request_content',function(evt,args){
		var form =  $(this);
		var model = form.attr('model');
		var canvas = form.attr('canvas');
		var in_modal = $(canvas).parents('.modal:first');
		var args = args||{'init':false};
		var no_details = $(canvas).find('tfoot tr.no-details').html();
		if(no_details){
			var template = JSON.stringify({'html':no_details});
			form.attr('template',template);
		}
		form.ajaxSubmit({
			dataType:'json',
			beforeSend:function(){
				$(canvas).trigger('preload');
			},
			success:function(data){
				if(!data.length){
					if(form.attr('template')){
						var template = $.parseJSON(form.attr('template'));
						$(canvas).trigger('emptyRecord',{'html':template.html});
					}else{
						$(canvas).trigger('emptyRecord');
					}
					
				}else{
					RECORD.setModel(model);
					$(canvas).trigger('populate', {'data':data,'append':false});
					$(canvas).trigger('showRecord');
					
				}
				if(in_modal&&!args.init){
					in_modal.modal('show');
				}
		}});
	});
	$(document).on('click','.canvasTable .action-view,.canvasTable .action-edit',function(evt,args){
		var key  = $(this).parents('tr:first').attr('id');
		var data = $('.RECORD').trigger('access',{'key':key});
		var record =  window.RECORD.getActive();
		var modal =  $(this).attr('href');
		var canvas =  '#'+$(modal).find('.canvasTable').attr('id');
		var advancedtable = $(canvas).hasClass('advancedTable');
		var model =  $(canvas).attr('model');
		var form  = $('form[canvas="'+canvas+'"]');
		$(canvas).trigger('preload');
		$.each(record,function(mdl,content){
				if(mdl==model){
					console.log(record[mdl]);
					if(record[mdl].length){
						RECORD.setModel(mdl);
						$(canvas).trigger('populate', {'data':record[mdl],'append':false});
						$(canvas).trigger('showRecord',{'advancedtable':advancedtable});
					}else{
						if(form.attr('template')){
							var template = $.parseJSON(form.attr('template'));
							$(canvas).trigger('emptyRecord',{'html':template.html});
						}else{
							$(canvas).trigger('emptyRecord');
						}
					}
				}
				$.each(content,function(fld,v){
	
					if(v instanceof Object){
						$.each(v,function(vf,vv){
							$(modal).find('input[name*="['+mdl+']['+fld+']['+vf+']"],select[name*="['+mdl+']['+fld+']['+vf+']"]').val(vv);
						});
						
						//fieldIt($(modal),mdl,fld,[],v);
					}else{
						//Display content regular
						$(modal).find('input[name*="['+mdl+']['+fld+']"],select[name*="['+mdl+']['+fld+']"]').val(v);
						$(modal).find('span.uneditable-input[data-field="'+mdl+'.'+fld+'"]').text(v);
						//Populate foreign key						
						//console.log(('input[name*="['+mdl+']['+fld+']",role="foreign-key"]'));
						$('.canvasForm').find('input[name*="['+mdl+']['+fld+']"]').val(v);
					}
						
					
				});
			});
	});
	function fieldIt(target,mdl,fld,path,v){
		
		if(v instanceof Object){
			$.each(v,function(vf,vv){
				fieldIt(target,mdl,vf,path+'['+vf+']',vv);
			});
		}else{
			target.find('input[name*="'+path+'"],select[name*="'+path+'"]').val(v);
		}
						
	}
	$('.canvasTable').parents('form:first').bind('reset',function(){
		var canvas = '#'+$(this).find('.canvasTable').attr('id');
		var form  = $('form[canvas="'+canvas+'"]');
		if(form.attr('template')){
		var template = $.parseJSON(form.attr('template'));
			$(canvas).trigger('emptyRecord',{'html':template.html});
		}else{
			$(canvas).trigger('emptyRecord');
		}
		$(canvas).find('tbody').hide();
	});
	$(document).on('click','form .intent-cancel',function(evt,args){
		var form =  $($(this).parents('form:first').attr('canvas'));
		var canvas = form.attr('canvas');
		//console.log(canvas);
		//console.log(form);
		var in_modal = $(canvas).parents('.modal:first');
		if(in_modal){
			in_modal.modal('show');
		}
	});
	$(document).on('click','.canvasTable .action-btn',function(evt,args){
		var href = $(this).attr('href');
		var form = $(this).parents('form:first');
		var formName = form.attr('name');
		//console.log(href,form,formName);
		var canvasForm =  form.attr('canvas');
		var model = $(canvasForm).attr('model');
		var self =  $(this);
		if(document[formName+''].checkValidity()){
			form.ajaxSubmit({
				dataType:'json',
				beforeSend:function(){
					self.attr("disabled","disabled");
				},
				success:function(formReturn){
					var key =  formReturn['data'][model]['id'];
					form.find('input[role="primary-key"]').val(key);
					$('input[role="foreign-key"]').val(key);
				}
			});
		}
	});
	//Initialize page
	$('.canvasForm').trigger('request_content',{'init':true});
});