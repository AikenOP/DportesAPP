$(document).on("pagecreate","#reg-equipo", function( event, ui ) {
	var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getRegiones');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
    	if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
            	var json = JSON.parse(this.response);
        		var inc = '<option value="0">Seleccione una region</option>';
        		for(var i = 0; i < json.length; i++ ){
        			inc += "<option value='"+json[i].id_region+"'>"+json[i].nombre+"</option>";
        		}
        		document.getElementById('eq-region').innerHTML = inc;
        		$('#eq-region').selectmenu('refresh');
            }
        }
    }
});

$(document).on("pagecreate","#acciones", function( event, ui ) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', path + 'app/getTiposGoles');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    xhr.onload = function(e){
        if(this.status == 200){
            if(this.response && JSON.parse(this.response)){
                var json = JSON.parse(this.response);
                var inc = '';
            }
        }
    }  
});