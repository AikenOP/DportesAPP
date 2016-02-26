//var path = 'http://localhost/dportes/';
var path = 'http://desarrollo.ilia.cl/dportes/';

function swipe(id,nav,position){
    var startLoc = null; 
    $(id).on( "touchstart", function(e){ 
	    if( e.originalEvent.touches.length == 1 ) { // one finger touch 
	        var touch = e.originalEvent.touches[ 0 ]; 
	        startLoc = { x : touch.pageX, y : touch.pageY }; 
	    } 
   	}); 

    $(id).on( "touchmove", function(e){  
        if( startLoc ) { 
	        var touch = e.originalEvent.touches[ 0 ];  
	        if( Math.abs( startLoc.x - touch.pageX ) >  Math.abs( startLoc.y - touch.pageY ) ) { 
	            e.preventDefault(); 
	        } 
	        startLoc = null; 
        } 
    });

    if(position === 'left'){
    	var lf = "close";
    	var rg = "open";
    } else if(position === 'right'){
    	var lf = "open";
    	var rg = "close";    	
    } else {
    	var lf = '';
    	var rg = '';
    }
    if(lf != '' && rg != ''){
	    $( document ).on( "swipeleft swiperight", id, function( e ) {
	        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
	            if ( e.type === "swipeleft" ) {
	                $( nav ).panel( lf );
	            } else if ( e.type === "swiperight" ) {
	                $( nav ).panel( rg );
	            }
	        }
	    });
	} else {
		navigator.notification.alert('Ocurre un error con el menu',function(){},'Atención','OK');
	}
}

function swipeEstadisticas(id){
    var startLoc = null; 
    $(id).on( "touchstart", function(e){ 
	    if( e.originalEvent.touches.length == 1 ) { // one finger touch 
	        var touch = e.originalEvent.touches[ 0 ]; 
	        startLoc = { x : touch.pageX, y : touch.pageY }; 
	    } 
   	}); 

    $(id).on( "touchmove", function(e){  
        if( startLoc ) { 
	        var touch = e.originalEvent.touches[ 0 ];  
	        if( Math.abs( startLoc.x - touch.pageX ) >  Math.abs( startLoc.y - touch.pageY ) ) { 
	            e.preventDefault(); 
	        } 
	        startLoc = null; 
        } 
    });

    $( document ).on( "swipeleft swiperight", id, function( e ) {
    	//alert('ds');
    });
}

function checkName(nm,ap){
	if(ap == null){
		ap = '';
	}
	return nm + ' ' + ap;
}

function validaEmail(email){
	expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if ( !expr.test(email) ){
	   	return true;
	} else {
	   	return false;
	}
}

function ucwords(str) {
  //  discuss at: http://phpjs.org/functions/ucwords/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Waldo Malqui Silva
  // improved by: Robin
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  //    input by: James (http://www.james-bell.co.uk/)
  //   example 1: ucwords('kevin van  zonneveld');
  //   returns 1: 'Kevin Van  Zonneveld'
  //   example 2: ucwords('HELLO WORLD');
  //   returns 2: 'HELLO WORLD'

  return (str + '')
    .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
      return $1.toUpperCase();
    });
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getHora(hora){
	var hor = hora.split(" ");
	var arr = hor[1].split(":");
	return arr[0] + ":" + arr[1];
}

function getFecha(fecha) {
	var fech = fecha.split(" ");
	var arr = fech[0].split("-");
	var mes = '';
	if(arr[1] == 1){
		mes = 'enero';
	} else if(arr[1] == 2){
		mes = 'febrero';
	} else if(arr[1] == 3){
		mes = 'marzo';
	} else if(arr[1] == 4){
		mes = 'abril';
	} else if(arr[1] == 5){
		mes = 'mayo';
	} else if(arr[1] == 6){
		mes = 'junio';
	} else if(arr[1] == 7){
		mes = 'julio';
	} else if(arr[1] == 8){
		mes = 'agosto';
	} else if(arr[1] == 9){
		mes = 'septiembre';
	} else if(arr[1] == 10){
		mes = 'octubre';
	} else if(arr[1] == 11){
		mes = 'noviembre';
	} else if(arr[1] == 12){
		mes = 'diciembre';
	} 
	var newFech = arr[2] + ' ' + mes + ' ' + arr[0];
	return newFech;
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}

function clearGame(){
	document.getElementById('pg-rival').value = '';
	document.getElementById('pg-ubicacion').value = '';
	document.getElementById('pg-hora').value = '';
	document.getElementById('pg-hora').type = 'text';
	document.getElementById('pg-hora').placeholder = 'Hora del partido';
	document.getElementById('pg-fecha').value = '';
	document.getElementById('pg-fecha').type = 'text';
	document.getElementById('pg-fecha').placeholder = 'Fecha del partido';
	$("select#pg-periodo")[0].selectedIndex = 0;

	document.getElementById('acc-marc-contra').innerHTML = 0;
    document.getElementById('stat-marc-contra').innerHTML = 0;
	document.getElementById('acc-marc-favor').innerHTML = 0;
    document.getElementById('stat-marc-favor').innerHTML = 0;

}

function backHome(){
	if(sessionStorage.getItem('evento')){
		navigator.notification.confirm(
        	'Aplicar esta acción significa terminar el partido.\n ¿Realmente desea hacerlo?',
        	function(button){
        		if(button == 1){
        			closeEvent();
        		}
        	},
        	'Advertencia',
        	'Si,No');
	} else {
		$.mobile.navigate("#home", {transition: "fade"});
	}
}

function checkPeriodo(id,arr){                          
    for(var j = 0; j < arr.length; j++){
	    if(arr[j] == id){
	        return "ui-state-disabled";
	    }
    }
    return '';
}

function checkAmarilla(){
	var arr = [];
    if(sessionStorage.getItem('amarillas')){
    	//alert(sessionStorage.getItem('amarillas'));
    	arr = JSON.parse(sessionStorage.getItem('amarillas'));
	    for(var i = 0 ; i < arr.length ; i++){
	        if(sessionStorage.getItem('accIDTitular') == arr[i]){
	        	$("#jugTarjetaAmarilla"+sessionStorage.getItem('accIDTitular')).css('display','none');
	        	$("#jugDoble"+sessionStorage.getItem('accIDTitular')).css('display','block');
				arr.push(sessionStorage.getItem('accIDTitular'));
	    		sessionStorage.setItem('amarillas',JSON.stringify(arr));
	            return true;
	        }
	    }
	    arr.push(sessionStorage.getItem('accIDTitular'));
	    sessionStorage.setItem('amarillas',JSON.stringify(arr));
	    $("#jugTarjetaAmarilla"+sessionStorage.getItem('accIDTitular')).css('display','block');
	    return false;
    } else {
		arr.push(sessionStorage.getItem('accIDTitular'));
	    sessionStorage.setItem('amarillas',JSON.stringify(arr));
	    $("#jugTarjetaAmarilla"+sessionStorage.getItem('accIDTitular')).css('display','block');
    	return false;
    }
}

function checkAmarillaRoja(id){
	if(sessionStorage.getItem('amarillas')){
		var arr = JSON.parse(sessionStorage.getItem('amarillas'));
		for(var i = 0 ; i <= arr.length ; i++){
			if(id == arr[i]){
				return true
			}
		}
		return false;		
	} else {
		return false;
	}

}

function dropAmarilla(id){
	var arr = JSON.parse(sessionStorage.getItem('amarillas'));
	for(var i = 0 ; i <= arr.length ; i++){
	    if(id == arr[i]){
	        $("#jugDoble"+id).css('display','none');
	        arr.splice(i,1);
	        if(countAmarillas(id,arr)){
	        	$("#jugTarjetaAmarilla"+id).css('display','block');
	        } else {
	        	$("#jugTarjetaRoja"+id).css('display','none');
	        	$("#jugTarjetaAmarilla"+id).css('display','none');
	        	$("#jugTarjetaAmarillaRoja"+id).css('display','none');
	        }
	    	sessionStorage.setItem('amarillas',JSON.stringify(arr));
	        return true;
	    }
	}
	alert('false');
	$("#jugTarjetaAmarilla"+id).css('display','none');
	return false;

}

function countAmarillas(id,arr){
	for(var i = 0 ; i <= arr.length ; i++){
		if(arr[i] == id){
			return true;
		}
	}
	return false;
}


function setMore(){
    var partidos = new eventos();
    partidos.equipo = localStorage.getItem('equipo');
    partidos.bool = false;
    partidos.getHistorialPartidos();
    delete partidos;	
}

function setMorePro(){
    var partidos = new eventos();
    partidos.equipo = localStorage.getItem('equipo');
    partidos.bool = false;
	partidos.getProgramados();
    delete partidos;
}

function setMoreNot(){
    var notifica = new notificaciones();
    notifica.bool = false;
	notifica.getNotificaciones();
    delete notifica;
}

