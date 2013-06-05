function Registree() {
	var REG3STCK={};
	window.REGSYNC=true;
	function checkNode(index, node){
		if(!(REG3STCK[index] instanceof Object)){
				REG3STCK[index]={};
		}
		if(!(REG3STCK[index][node] instanceof Object)){
			REG3STCK[index][node]={'children':{}};
		}
	}
	return {
		pull: function(){
			return REG3STCK;
		},
		newNode: function (index, node,children){
			checkNode(index,node);
			REGSYNC=false;
			$.each(children,function(child){
				REG3STCK[index][node]['children'][child]=null;
			});
		},
		saveNode:function(index,node,child,id){
			checkNode(index,node);
			REGSYNC=true;
			if(id==undefined){
				REGSYNC = false;
			}
			REG3STCK[index][node]['children'][child]=id;
		},
		at: function (index){
			if(REG3STCK[index] instanceof Object){
				return REG3STCK[index];
			}else{
				throw new Error('Unknown index ' +index);
			}
		},
		is_sync:function (){
			return REGSYNC;
		},
		reset:function(){
			if(!REGSYNC){
				//throw new Error('Could not reset, REGISTREE is out of sync');
			}else{
				REG3STCK={};
			}
		}
	};
}