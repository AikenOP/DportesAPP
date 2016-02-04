
function notificaciones(){
	this.id_notifica


	this.getNotificaciones = function(){
		var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id',localStorage.getItem('id'));

        xhr.open('POST', path + 'app/getNotificaciones');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = 10000;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
        	//alert(localStorage.getItem('id'));
        	
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var inc = '';
                   	var fecha = '';
                    var hora = '';
                    var asistir= 'none;';
                    var no_asistir = 'none;';
                    for(var i = 0; i < json.length; i++ ){ 
                    	fecha = getFecha(json[i].fecha_evento);
                        hora = getHora(json[i].fecha_evento);
                        if(json[i].tipos_asistencias_id_tipo_asistencia == 1){
                            asistir = 'block;';
                            no_asistir = 'none;';
                        } else if(json[i].tipos_asistencias_id_tipo_asistencia == 2){
                            no_asistir = 'block;';
                            asistir = 'none;';
                        } else {
                            no_asistir = 'none;';
                            asistir = 'none;';
                        }
                    	inc += "<div class='contenedor-general-notificaciones' id='contenedor-notificacion'>";    
		                inc += "<div class='fecha-notificacion'>Aviso de Encuentro</div>";
		                inc += "<a onclick='redirectAsistencia("+json[i].id_notificacion+")' class='link-color'>";
		                inc += "<div class='contenedor-fechas-notificacion'>";
		                inc += "<div class='centrado-fechas-notificacion'>";
		                inc += "<div class='block-notificacion'><img src='jquerymobile/img-dportes/logo-encuentro.png'><p class='nombre-equipo'>"+json[i].nombre+"</p></div>";
		                inc += "<div class='vs-notificacion'>VS</div>";
		                inc += "<div class='block-notificacion'><img src='jquerymobile/img-dportes/logo-encuentro.png'><p class='nombre-equipo'>"+json[i].evt_nombre+"</p></div>";
		                inc += "<div class='block-notificacion'><p class='nombre-equipo-notificacion'>"+fecha+" - "+hora+"hrs</p></div>";
		                inc += "<div class='block-notificacion'><p id='notifica-con"+json[i].id_notificacion+"' class='nombre-equipo-notificacion-con' style='display:"+asistir+"'>Asistencia confirmada</p></div>";
		                inc += "<div class='block-notificacion'><p id='notifica-no"+json[i].id_notificacion+"' class='nombre-equipo-notificacion-in' style='display:"+no_asistir+"'>Inasistencia confirmada</p></div>";
		                inc += "</div>";
		                inc += "</div>";
		                inc += "</a>";
		                inc += "<div class='boton-participar'><a onclick='setAsistencia(1,"+json[i].id_notificacion+","+localStorage.getItem('id')+")' href='#ventana-asistira' data-rel='popup' data-position-to='window' class='ui-btn color-boton-notificacion' id='boton-asistere' data-transition='pop'>Asistiré</a></div>";
		                inc += "<div class='boton-participar'><a onclick='setAsistencia(2,"+json[i].id_notificacion+","+localStorage.getItem('id')+")' href='#ventana-no-asistira' data-rel='popup' data-position-to='window' class='ui-btn color-boton-notificacion-2' id='boton-no-asistere' data-transition='pop'>No Asistiré</a></div>";
		                inc += "</div>";
                    }
                }
            }

        	$('#notificaciones-evt').html(inc);
        }
	}

    this.getAsistencia = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion',sessionStorage.getItem('id_notifica'));

        xhr.open('POST', path + 'app/getAsistencia');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = 10000;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){ 
        
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);
                    var inc = '';
                    var tipo = '';
                    for(var i = 0; i < json.length; i++ ){
                        if(json[i].id_tipo_asistencia == 1){
                            tipo = "asistencia-asistira";
                        } else if(json[i].id_tipo_asistencia == 2){
                            tipo = "asistencia-no-asistira";
                        } else {
                            tipo = "asistencia-sin-responder";
                        }
                        inc += "<li data-icon='false'>";                        
                        inc +=  "<a href='#' class='color-boton-equipo'><img src='jquerymobile/img-dportes/foto.png'>";
                        inc +=  "<h2>"+ json[i].nombre + "</h2>";
                        inc +=  "<p></p>";
                        inc +=  "<span class='ui-li-count "+tipo+"'>"+ json[i].nombre_asistencia +"</span>";
                        inc +=  "</a>";
                        inc +=  "</li>";
                    }
                    $('#asistencia-notifica').html(inc).listview('refresh');
                }
            }
        }
    }

    this.getInfo = function(){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion',sessionStorage.getItem('id_notifica'));

        xhr.open('POST', path + 'app/getAsistenciaInfo');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = 10000;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){ 
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){   
                    var json = JSON.parse(this.response);
                    var fecha = getFecha(json.info.fecha_evento);
                    document.getElementById('asist-fecha').innerHTML = fecha;
                    document.getElementById('asist-rival').innerHTML = json.info.nombre;
                    document.getElementById('asist-asisten').innerHTML = json.asistire;
                    document.getElementById('asist-no-asisten').innerHTML = json.nasistire;
                    document.getElementById('asist-pendiente').innerHTML = json.nresponde;
                }
            }
        }     
    }
}

function redirectAsistencia(id){
    sessionStorage.setItem('id_notifica',id);
    $.mobile.navigate("#asistencia", {transition: "fade"});   
}

function setAsistencia(tipo,notifica,id){
        var xhr = new XMLHttpRequest();
        var send = new FormData();

        send.append('id_notificacion', notifica);
        send.append('id_tipo',tipo);
        send.append('id_usuario',id);

        xhr.open('POST', path + 'app/setAsistencia');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);
        $.mobile.loading('show');
        xhr.timeout = 10000;
        xhr.ontimeout = function () {
            $.mobile.loading('hide');
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };
        /*xhr.onprogress = function(){
            alert('progress');
        };*/
        xhr.onerror = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');
        };

        xhr.onload = function(e){
            if(tipo == 1){
                $("#notifica-con"+notifica).slideDown(500);
                $("#notifica-no"+notifica).slideUp(500);
            } else {
                $("#notifica-no"+notifica).slideDown(500);
                $("#notifica-con"+notifica).slideUp(500);                
            }
            $.mobile.loading('hide');
        };
}
