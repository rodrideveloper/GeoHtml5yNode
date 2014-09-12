
		//Si se puedo geolocalizar al usuario, se crea el mapa y envian las coordenadas al resto de los usuario
		function sucess(position){
			coordenadas.lat=position.coords.latitude;
			coordenadas.lon=position.coords.longitude;	          
			construirMapa();
			socket.emit('nuevoUser',{
				nick:nickname,
				lat:coordenadas.lat,
				lon:coordenadas.lon
			});

			socket.on('posicion',function(data){
				showUser(data.nick,data.lat,data.lon);
			})

			

		}

		
		//Indica que no se pudo geoLocalizar al user
		function nofound (position){
			alert('error al ubicarte');
		}

		//Construye el mapa y lo posiciona en las coordenadas del user
		function construirMapa(){
			 var mapOptions = {
			        zoom: 6,
			        center: new google.maps.LatLng(coordenadas.lat, coordenadas.lon),      

			        mapTypeId: google.maps.MapTypeId.ROADMAP

    			}
    		 	 map = new google.maps.Map($("#mapa").get(0), mapOptions);
    		 	
    			showUser(nickname,coordenadas.lat,coordenadas.lon);

		}

		 //Agregue un marcador en las coordenadas correspondientes
		function showUser(nick,latitude,longitude){
			var infowindow = new google.maps.InfoWindow({
      			content: '<p><b>'+nick+'</b></p>'
 				 });			


			  var coorMarcador = new google.maps.LatLng(latitude,longitude);
			  var marcador = new google.maps.Marker({
	                position: coorMarcador,
	                map: map,
	                title:'aqui'
	            });

			   google.maps.event.addListener(marcador,'click', function() {
   				 infowindow.open(map,marcador);
 				 });
			    infowindow.open(map,marcador);
			};
