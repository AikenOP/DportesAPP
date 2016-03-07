//CLASS EQUIPOS

function equipos(){

	this.nombre
	this.descripcion
	this.logo
	this.dporte
	this.comuna = 0
	this.estado

	this.checkEquipo = function(){
		var xhr = new XMLHttpRequest();
		var form = new FormData();
		form.append('equipo',this.nombre);
	    xhr.open('POST', path + 'app/checkEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(form);
	    xhr.onload = function(e){
	    	if(this.status == 200){
	    		if(this.response){
	    			document.getElementById('reg-disponible').style.display = "none";
	    			document.getElementById('reg-no-disponible').style.display = "block";
	    		} else {
	    			document.getElementById('reg-disponible').style.display = "block";
	    			document.getElementById('reg-no-disponible').style.display = "none";
	    		}
	    	}
	    }
	}

	this.getEquipo = function(){
        //alert(sessionStorage.getItem('eq_session'));
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',sessionStorage.getItem('eq_session'));
	    xhr.open('POST', path + 'app/getEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }	
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
        	alert(this.response);
        	$.mobile.loading('hide');
        	if(this.status == 200){
	    		if(this.response && JSON.parse(this.response)){
	    			var json = JSON.parse(this.response);
	    			document.getElementById('edit-equipo').innerHTML = json.nombre;
	    			document.getElementById('edit-eq-nombre').value = json.nombre;
	    			document.getElementById('edir-eq-region').value = 'No Disponible';
	    			document.getElementById('edit-eq-comuna').value = 'No Disponible';
	    		}
	    	}
        }
	}

	this.setEquipo = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',sessionStorage.getItem('eq_session'));
		send.append('nombre',this.nombre);
	    xhr.open('POST', path + 'app/setEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
        	$.mobile.loading('hide');
        	if(this.status == 200){
	    		if(this.response){
	    			$.mobile.navigate("#mis-equipos", {transition: "fade"});
	    		}
	    	}
	    }		
	}

	this.addEquipo = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',localStorage.getItem('id'));
		send.append('nombre_equipo',this.nombre);
		send.append('comuna',this.comuna);
		send.append('dporte_equipo',1);
	    xhr.open('POST', path + 'app/addEquipo');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
        	$.mobile.loading('hide');
        	if(this.status == 200){
	    		if(this.response){
	    			$.mobile.navigate("#mis-equipos", {transition: "fade"});
	    		}
	    	}
	    }		
	}

	this.getMisEquipos = function(){
		var xhr = new XMLHttpRequest();
		var send = new FormData();
		send.append('id',localStorage.getItem('id'));
	    xhr.open('POST', path + 'app/getMisEquipos');
	    xhr.setRequestHeader('Cache-Control', 'no-cache');
	    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.send(send);
        xhr.timeout = 10000;
        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        xhr.ontimeout = function(e){
            navigator.notification.alert('Se detecto un problema, intentelo nuevamente',function(){},'Atención','OK');   
        }
        xhr.onload = function(e){
	    	if(this.status == 200){
	    		if(this.response){
	    			var json = JSON.parse(this.response);
	    			var inc = '';
	    			var flagged = '';
	    			var disabled = '';
	    			var deleteDisabled = '';
	    			var click = '';
	    			for(var i = 0; i < json.length; i++ ){
	    				if(json[i].id_equipo == localStorage.getItem('equipo')){
	    					flagged = '';
	    					disabled = 'ui-state-disabled';
	    				} else {
	    					flagged = 'ui-screen-hidden';
	    					disabled = '';
	    				}
	    				if(json[i].rol == 1){
	    					deleteDisabled = 'ui-state-disabled';
	    					click = "onclick='redirectEquipo("+json[i].id_equipo+")'";
	    				} else {
	    					click = '';
	    					deleteDisabled = '';
	    				}
	                    inc += "<li value='"+json[i].id_equipo+"' class='li-padding' "+click+">";
	                    inc += "<input id='eq_r"+json[i].id_equipo+"' type='hidden' value='"+json[i].rol+"'>";
	                    inc += "<span class='delete "+deleteDisabled+"'>";
	                    inc += "<div class='centra_texto'>Salir</div>";
	                    inc += "</span>";
	                    inc += "<span class='flag "+disabled+"'>";
	                    inc += "<div class='centra_texto'>Actual</div>";
	                    inc += "</span>";
	                    inc += "<a href='#' draggable='false'><img src='jquerymobile/img-dportes/logo-encuentro.png'>";
	                    inc += "<h2>"+json[i].nombre+"</h2>";
	                    inc += "<span class='flagged "+flagged+"'>";
	                    inc += "</span>";
	                    inc += "</a>";
	                    inc += "</li>";
	    			}
	    			$("#eq-list").html(inc).listview('refresh');
                    $.mobile.loading('hide');
	    		}
	    	}
        }
	}

	this.setSwipe = function(){
		$( document ).on("swipeleft", "ul#eq-list li a", function (e) {
	    $(this).prevAll("span").addClass("show");
	    $(this).off("click").blur();
	    $(this).css({
	         	transform: "translateX(-139px)" //139
	    	}).one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
		    	$(this).one("swiperight", function () {
		        	$(this).prevAll("span").removeClass("show");
		        	$(this).css({
		            	transform: "translateX(0)"
		        	}).blur();
		    	});
	    	});
		}).on("click", "ul li span.flag", function () {
		    var text = $("div", this),
		        button = $(this).siblings("a"),
		        flagged = button.find(".flagged").hasClass("ui-screen-hidden") ? false : true;
		    if (!flagged) {
		    	$("ul#eq-list li span.flag").removeClass("ui-state-disabled");
		    	$("ul#eq-list li span.flagged").addClass("ui-screen-hidden");
		        //button.find(".flagged").removeClass("ui-screen-hidden");
		        $(this).addClass('ui-state-disabled');
		        button.find(".flagged").removeClass("ui-screen-hidden");
		        localStorage.setItem('equipo',$(this).parent().val());
		        localStorage.setItem('rol_equipo',$("#eq_r"+$(this).parent().val()).val());
		        localStorage.setItem('nombre_equipo',$(this).parent().find("h2").html());
		        //text.text("");
		    }
	});
	}

}

function setEquipo(){
	var eq = new equipos();
	eq.nombre = document.getElementById('edit-eq-nombre').value;
	eq.setEquipo();
	delete eq;
}

function redirectEquipo(eq){
	sessionStorage.setItem("eq_session",eq);
	$.mobile.navigate("#editar-equipo", {transition: "fade"});
}


document.getElementById('btn-reg-equipo').addEventListener('click',function(){
	event.preventDefault();
	var eq = new equipos();
	eq.nombre = document.getElementById('reg-nom-equipo').value;
	eq.comuna = document.getElementById('eq-comuna').value;
	eq.addEquipo();
	delete eq;
});
