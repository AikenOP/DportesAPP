function tablas(){


	this.getIndividualAcumulada = function(){
		//alert(sessionStorage.getItem('pi_jugador'));
        var xhr = new XMLHttpRequest();
        var send = new FormData();
        send.append('id',sessionStorage.getItem('pi_jugador'));
        send.append('id_equipo',localStorage.getItem('equipo'));
        xhr.open('POST', path + 'app/getIndividualAcumulada');
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(send);

        xhr.onprogress = function(e){
            $.mobile.loading('show');
        }
        
        xhr.onload = function(){
            if(this.status == 200){
                if(this.response && JSON.parse(this.response)){
                    var json = JSON.parse(this.response);

                    document.getElementById('ind-gol-f').innerHTML = json.goles;
                    document.getElementById('ind-gol-c').innerHTML = json.goles_c;
                    document.getElementById('ind-gol-efec').innerHTML = json.efectividad_gol + '%';
                    document.getElementById('ind-gol-b').innerHTML = json.gol_buena;
                    document.getElementById('ind-gol-m').innerHTML = json.gol_mala;

                    document.getElementById('ind-tiro-arco-f').innerHTML = json.tiro_arco;
                    document.getElementById('ind-tiro-arco-c').innerHTML = json.tiro_arco_c;
                    document.getElementById('ind-tiro-arco-efec').innerHTML = json.efectividad_tiro_arco + '%';
                    document.getElementById('ind-tiro-arco-b').innerHTML = json.tiro_arco_buena;
                    document.getElementById('ind-tiro-arco-m').innerHTML = json.tiro_arco_mala;

                    document.getElementById('ind-tiro-libre-f').innerHTML = json.tiro_libre;
                    document.getElementById('ind-tiro-libre-c').innerHTML = json.tiro_libre_c;
                    document.getElementById('ind-tiro-libre-efec').innerHTML = json.efectividad_tiro_libre + '%';
                    document.getElementById('ind-tiro-libre-b').innerHTML = json.tiro_libre_buena;
                    document.getElementById('ind-tiro-libre-m').innerHTML = json.tiro_libre_mala;

                    document.getElementById('ind-tiro-esquina-f').innerHTML = json.tiro_esquina;
                    document.getElementById('ind-tiro-esquina-c').innerHTML = json.tiro_esquina_c;
                    document.getElementById('ind-tiro-esquina-efec').innerHTML = json.efectividad_tiro_esquina + '%';
                    document.getElementById('ind-tiro-esquina-b').innerHTML = json.tiro_esquina_buena;
                    document.getElementById('ind-tiro-esquina-m').innerHTML = json.tiro_esquina_mala;

                    document.getElementById('ind-tiro-penal-f').innerHTML = json.tiro_penal;
                    document.getElementById('ind-tiro-penal-c').innerHTML = json.tiro_penal_c;
                    document.getElementById('ind-tiro-penal-efec').innerHTML = json.efectividad_tiro_penal + '%';
                    document.getElementById('ind-tiro-penal-b').innerHTML = json.tiro_penal_buena;
                    document.getElementById('ind-tiro-penal-m').innerHTML = json.tiro_penal_mala;

                    document.getElementById('ind-quite-f').innerHTML = json.quite;
                    document.getElementById('ind-quite-c').innerHTML = json.quite_c;
                    document.getElementById('ind-quite-efec').innerHTML = json.efectividad_quite + '%';
                    document.getElementById('ind-quite-b').innerHTML = json.quite_buena;
                    document.getElementById('ind-quite-m').innerHTML = json.quite_mala;

                    document.getElementById('ind-asistencia-f').innerHTML = json.asistencia;
                    document.getElementById('ind-asistencia-c').innerHTML = json.asistencia_c;
                    document.getElementById('ind-asistencia-efec').innerHTML = json.efectividad_asistencia + '%';
                    document.getElementById('ind-asistencia-b').innerHTML = json.asistencia_buena;
                    document.getElementById('ind-asistencia-m').innerHTML = json.asistencia_mala;

                    document.getElementById('ind-falta-f').innerHTML = json.falta;
                    document.getElementById('ind-falta-c').innerHTML = json.falta_c;
                    document.getElementById('ind-falta-efec').innerHTML = '';
                    document.getElementById('ind-falta-b').innerHTML = json.falta_buena;
                    document.getElementById('ind-falta-m').innerHTML = json.falta_mala;

                    document.getElementById('ind-efectividad-total').innerHTML = json.efectividad_total + '%';

                    var radarChartData = {
                            labels: ["Goles","Tiros al arco","Tiros libres","Tiros de esquina","Tiros penales","Quites","Asistencias"],
                            datasets: [
                                {
                                    label: "Desempeño Actual",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: [json.efectividad_gol,json.efectividad_tiro_arco,json.efectividad_tiro_libre,json.efectividad_tiro_esquina,json.efectividad_tiro_penal,json.efectividad_quite,json.efectividad_asistencia]
                                }
                            ]
                        };

                        
                        /*window.myRadar = new Chart(document.getElementById("radar2").getContext("2d")).Radar(radarChartData, {
                        responsive: true
                        });*/
                    var canvas = document.getElementById("radar2");
                    var ctx = canvas.getContext("2d");
                        
                    var newChart = new Chart(ctx).Radar(radarChartData);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    newChart.clear();
                    newChart.destroy();
                    //newChart = new Chart(ctx).Radar(radarChartData);  

                    $.mobile.loading('hide');
                }
            }
        }
	}
}