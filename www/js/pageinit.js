    $(document).on('pagecontainerbeforeshow', function (e, ui) {

        var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage').attr('id');
        if(activePage === 'index') {
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady(){

                setTimeout(function(){ 
                    if(localStorage.getItem('login')){
                        $.mobile.navigate("#home", {transition: "fade"});
                    } else {
                        $.mobile.navigate("#login", {transition: "fade"});
                    }
                }, 4000);
            }
        }

        if(activePage === 'home'){
            if(localStorage.getItem("rol_equipo") != 1){
                $('#home-jg').addClass('ui-state-disabled');
            } else {
                $('#home-pg').removeClass('ui-state-disabled');
                $('#home-jg').removeClass('ui-state-disabled');            
            }
            swipe('#home','#menu_perfil','right');
            clearGame();
            closeSessionEvents();
            document.getElementById('tyc-back').href = '#'+activePage;
            document.getElementById('jg-rel-back').href = "#home";
        }

        if(activePage === 'mi-perfil'){
            var user = new usuarios();
            user.id_usuario = localStorage.getItem('id');
            user.getUsuario();
            delete user;
            swipe('#mi-perfil','#menu_perfil','right');
        }

        if(activePage === 'registro-equipo'){
            var dp = new dportes();
            dp.getDportes();
            delete dp;
        }

        if(activePage === 'estadisticas'){
            var stat = new estadisticas();
            stat.evento = sessionStorage.getItem('evento');
            stat.equipo = localStorage.getItem('equipo');
            stat.getEstadisticasPage();
            delete stat;

            swipeEstadisticas('#estadisticas');
            var jg = new jugadores();
            jg.getJugadoresEstadisticas();
            delete jg;

            if(sessionStorage.getItem('periodosJugados')){
                var hasta = document.getElementById('pg-periodo').value;
                periodos = JSON.parse(sessionStorage.getItem('periodosJugados'));
                if(periodos.length >= hasta){
                    document.getElementById('stat-tiempo').innerHTML = 'Finalizar';
                    document.getElementById('stat-tiempo').href = '#home';
                    document.getElementById('stat-tiempo').setAttribute('onclick','closeEvent();');
                    document.getElementById('stat-forward-rel').href = '#home';
                    $('#stat-extra').removeClass('ui-state-disabled');
                    if(sessionStorage.getItem("extra")){
                        document.getElementById('stat-extra').innerHTML = "Extra 2";
                    } else {
                        document.getElementById('stat-extra').innerHTML = "Extra 1";
                    }
                } else {
                    document.getElementById('stat-tiempo').innerHTML = '2do Tiempo';
                    setPeriodoLocal(2,'Segundo Tiempo');
                    document.getElementById('stat-tiempo').href = '#acciones';
                    document.getElementById('stat-tiempo').removeAttribute('onclick');
                    document.getElementById('stat-forward-rel').href = '#acciones';
                    $('#stat-extra').addClass('ui-state-disabled');
                    $('#stat-tiempo-penales').addClass('ui-state-disabled');
                }
            }
        }

        if(activePage === 'p-pro'){
            sessionStorage.removeItem('evento');
            var ev = new eventos();
            ev.equipo  = localStorage.getItem('equipo');
            ev.getProgramados();
            delete ev;
        }

        if(activePage === 'add-partido'){
            $("select#pg-periodo").selectmenu("refresh");
            if(sessionStorage.getItem('evento')){ 
                document.getElementById('pg-fecha').type = "text";
                var ev = new eventos();
                ev.id_evento = sessionStorage.getItem('evento');
                ev.getEvento();
                delete ev;
                document.getElementById('pg-registro-next').style.display = "block";
                document.getElementById('pg-boton-continuar').style.display = "none";
            } else {
                clearGame();
                document.getElementById('pg-registro-next').style.display = "none";
                document.getElementById('pg-boton-continuar').style.display = "block";
            }
            document.getElementById('pg-nombre-error').style.display = "none";
            document.getElementById('pg-ubicacion-error').style.display = "none";
            document.getElementById('pg-fecha-error').style.display = "none";
            document.getElementById('pg-hora-error').style.display = "none";
            document.getElementById('pg-periodo-error').style.display = "none";
        }

        if(activePage === 'detalle-jugador'){
            swipe('#detalle-jugador','#menu_perfil','right');
            document.getElementById('dt-nombre').innerHTML =  sessionStorage.getItem('dt_nombre');
            document.getElementById('dt-posicion').innerHTML = 'Posición: '+sessionStorage.getItem('dt_posicion');
            var stat = new estadisticas;
            stat.evento = sessionStorage.getItem('evento');
            stat.equipo = localStorage.getItem('equipo');
            stat.usuario = sessionStorage.getItem('jugador');
            stat.getEstadisticasByJugador();
            //sessionStorage.removeItem('dt_nombre');
            //sessionStorage.removeItem('dt_posicion');
        }

        if(activePage === 'historial-stat'){
            $.mobile.loading('show');
            var partidos = new eventos();
            partidos.equipo = localStorage.getItem('equipo');
            partidos.bool = true;
            partidos.getHistorialPartidos();
            delete partidos;

            document.getElementById('botones-estadisticos').style.display = "none";
            document.getElementById('stat-back-rel').style.display = "block";
            document.getElementById('stat-forward-rel').href = "#menu_perfil";
            document.getElementById('stat-forward-rel').innerHTML = "<div class='icono-menu-right'></div>";
            document.getElementById('stat-back-rel').href = '#historial-stat';
            document.getElementById('tyc-back').href = '#'+activePage;
           swipe('#historial-stat','#menu_perfil','right');        
        }

        if(activePage === 'jugadores-equipo'){
            var jg = new jugadores();
            jg.id_equipo = localStorage.getItem('equipo');
            jg.getJugadoresEquipo();
            jg.getDeleteFunction();
            swipe('#jugadores','#menu_perfil','right');
            document.getElementById('jg-rel-back').href = '#'+activePage;
            document.getElementById('tyc-back').href = '#'+activePage;
            document.getElementById('jug-nom-eq').innerHTML = String(localStorage.getItem('nombre_equipo'));
            delete jg;
            //swipe('#jugadores-equipo','#menu_perfil','right');
        }

        if(activePage === 'editar-jugador'){
            var jg = new jugadores();
            jg.id_jugador = sessionStorage.getItem('jg_session');
            jg.rol_usuario = sessionStorage.getItem('rol_session');
            jg.id_equipo = localStorage.getItem('equipo');
            jg.getJugador();
            jg.getPosicionesJugador();
            delete jg;
        }

        if(activePage === 'panel-juego'){
            swipe('#panel-juego','#menu_perfil','right');        
        }

        if(activePage === 'acciones'){
            document.getElementById('botones-estadisticos').style.display = "block";
            document.getElementById('stat-back-rel').style.display = "none"; 
            document.getElementById('stat-forward-rel').innerHTML = "<div class='fl-derecha'></div>";
            document.getElementById('stat-forward-rel').href = '#panel-juego';
        }

        if(activePage === 'seleccionar-titulares'){
           document.getElementById('jg-rel-back').href = "#seleccionar-titulares"; 
        }

        if(activePage === 'add-jugadores'){
           swipe('#add-jugadores','#menu_perfil','right'); 
        }

        if(activePage === 'cambio-jugador'){
            var jg = new jugadores();
            jg.getJugadoresReserva();
            delete jg;
        }

        if(activePage === 'mis-equipos'){
            var eq = new equipos();
            eq.setSwipe();
            eq.getMisEquipos();
            delete eq;
            //swipe('#mis-equipos','#menu_perfil','right');
        }

        if(activePage === 'editar-equipo'){
            var eq = new equipos();
            eq.getEquipo();
            delete eq;
            swipe('#editar-equipo','#menu_perfil','right');
        }

        if(activePage === 'como-usar'){
            swipe('#como-usar','#menu_perfil','right');
        }

        if(activePage === 'acerca'){
            swipe('#acerca','#menu_perfil','right');
        }
        //if(activePage === 'prueba-cancha'){
            //$('map').imageMapResize();
        //}
        if(activePage === 'chart'){
        }
        if(activePage === 'detalle-jugador-prueba'){
            var radarChartData = {
                    labels: ["Asistencia", "Quites", "Tiros de esquina", "Tiros libres", "Tiros al arco"],
                    datasets: [
                        {
                            label: "Desempeño Promedio",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [65,59,90,81,56]
                        },
                        {
                            label: "Desempeño Actual",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28,48,40,19,96]
                        }
                    ]
                };
                window.onload = function(){
                    window.myRadar = new Chart(document.getElementById("radar").getContext("2d")).Radar(radarChartData, {
                        responsive: true
                    });
                }
        }
        if(activePage === 'grafico-pie'){
            var doughnutData = [
                        {
                            value: 30,
                            color:"#F7464A",
                            highlight: "#FF5A5E",
                            label: "Jugador1"
                        },
                        {
                            value: 50,
                            color: "#46BFBD",
                            highlight: "#5AD3D1",
                            label: "Jugador2"
                        },
                        {
                            value: 100,
                            color: "#FDB45C",
                            highlight: "#FFC870",
                            label: "Jugador3"
                        },
                        {
                            value: 40,
                            color: "#949FB1",
                            highlight: "#A8B3C5",
                            label: "Jugador4"
                        },
                        {
                            value: 120,
                            color: "#4D5360",
                            highlight: "#616774",
                            label: "Jugador5"
                        }
                    ];
                    window.onload = function(){
                        var ctx = document.getElementById("chart-area").getContext("2d");
                        window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive : true});
                    };
        }
        if(activePage === 'seguimiento-jugador-prueba'){
            var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
            var lineChartData = {
                labels : ["January","February","March","April","May","June","July"],
                datasets : [
                    {
                        label: "My First dataset",
                        fillColor : "rgba(220,220,220,0.2)",
                        strokeColor : "rgba(220,220,220,1)",
                        pointColor : "rgba(220,220,220,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(220,220,220,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    },
                    {
                        label: "My Second dataset",
                        fillColor : "rgba(151,187,205,0.2)",
                        strokeColor : "rgba(151,187,205,1)",
                        pointColor : "rgba(151,187,205,1)",
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : "rgba(151,187,205,1)",
                        data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
                    }
                ]
            }
            window.onload = function(){
                var ctx = document.getElementById("jugada").getContext("2d");
                window.myLine = new Chart(ctx).Line(lineChartData, {
                    responsive: true
                });
            }
        }
        if(activePage === 'est-jugador-prueba'){
            var radarChartData = {
                    labels: ["Asistencia", "Quites", "Tiros de esquina", "Tiros libres", "Tiros al arco"],
                    datasets: [
                        {
                            label: "Desempeño Actual",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: [28,48,40,19,96]
                        }
                    ]
                };
                window.onload = function(){
                    window.myRadar = new Chart(document.getElementById("radar2").getContext("2d")).Radar(radarChartData, {
                        responsive: true
                    });
                }
        }


    });