$(document).ready(function(){
		window.debug = false;
			window.DEBUG_QUEQUE=[];
			$('body').append('<div id="debugger"><div id="debugger-head">ZEBUG (Zone Debug) <span id="debugger-help">Help: zebug &lt;variable&gt; [-W|-I|-T]</span></div><ul id="debugger-queque"  class="animate"></ul><div class="debugger-command"><input type="text" id="debugger-input" placeholder="zebug <variable> [-W|--watch|-I|--ignore|-T|--toggle]"/></div></div>');
			$('body').append("<style type='text/css'>div#debugger{position:absolute;z-index:9999;color:#FFC303;background:rgba(0,0,0,0.75);top:50%;left:3%;min-width:350px;min-height:50px;max-width:500px;word-wrap:break-word;}span#debugger-help{color: yellowgreen;font-size: 9px;float: right;clear: both;}div#debugger-head{background:#252424;border-bottom:1px solid #9B9B9B;padding:5px;font-weight:bold}ul#debugger-queque{list-style:none;color:white;margin:4px}ul#debugger-queque li:not(.debug-highlight){padding:3px;text-overflow: ellipsis;white-space: nowrap;width: 75%;overflow: hidden;display: inline-block;}ul#debugger-queque li span.debug-var{color:hotpink;margin-right:6px;font-family:Courier;font-size:12px;}ul#debugger-queque li span.debug-var:after{content:':'}ul#debugger-queque li span.debug-val{font-size:10px;}input#debugger-input{background: none;border: 1px solid rgba(189, 183, 183,0.3);color: white;font-family: Courier;font-size: 15px;width:98%;}.debug-highlight {background: #6CFF95;color:#333}</style>");
			$('#debugger').draggable().hide();
			window.WATCH =function watch(variable){
				$('ul#debugger-queque').append('<li id="debug-var-'+DEBUG_QUEQUE.length+'" class="animate"><span class="debug-var">'+variable+'</span><span class="debug-val">'+JSON.stringify(window[variable])+'</span></li>');
				DEBUG_QUEQUE.push(variable);
			}
			window.IGNORE=function ignore(variable){
				$('ul#debugger-queque').find(lookFor(variable)).hide();
			}
			
			var invalid = false;
			var commands = [];
			var point=0;
			$('#debugger-input').keyup(function(e){
				if(invalid){
					display('');
					invalid=false;
				}
				if(e.which==40){
					point++;
					display(commands[point%commands.length]);
				}
				if(e.which==13){
					var cmd = $(this).val();
					commands.push(cmd);
					var tokens = cmd.split(' ');
					var token_count = tokens.length;
					if(token_count>=1){
						switch(tokens[0]){
							case 'zebug':
								if(token_count==1){
									display('Command zebug needs one or more parameters.')
									return;
								}else if(token_count==2){
									display('Too few paramaeters');
									return
								}else{
									debug(tokens[1],tokens[2]);
								}
							break;
							case 'clear':
								clear();
							break;
							case 'quit':
								quit();
							break;
							default:
							display('Command '+tokens[0]+' not recognized');
							invalid=true;
							break;
						}
					}
					point=commands.length-1;
				}
			});
			function debug(variable,action){
				switch(action){
					case '-W':case '--watch':
					WATCH(variable);
					break;
					case '-I':case '--ignore':
					IGNORE(variable);
					break;
					case '-T':case '--toggle':
					toggle(variable);
					break;
					default:
					display('Invalid parameter.')
					return;
					break;
				}
				display('');
			}
			function quit(){
				display('');
				$('#debugger-input').blur();
				$('#debugger').slideUp('fast');
				window.debug=false;
			}
			function open(){
				$('#debugger').slideDown('fast');
				window.debug=true;
			}
			function clear(){
				$.each(DEBUG_QUEQUE,function(index,v){
					IGNORE(v);
				});
			}
			function display(msg){
				$('#debugger-input').val(msg);
			}
			function toggle(variable){
				$('ul#debugger-queque').find(lookFor(variable)).toggleClass('debug-highlight');
				display('');
			}
			function lookFor(variable){
				var lookup = [];
				$.each(DEBUG_QUEQUE,function(index,v){
					if(v==variable)
						lookup.push('#debug-var-'+index);
				});
				return lookup.join(',');
			}
			setInterval(function(){
				$.each(DEBUG_QUEQUE,function(i,q){
					$('ul#debugger-queque>li#debug-var-'+i).find('span.debug-val').text(JSON.stringify(window[q]));
				});
			},500);
		
		$(document).keydown(function(e){
			if(!window.debug){
				if(e.which==90){
					//open();
				}
			}
		});
		if(window.location.search=='?zebug'){
			open();
		}
});