<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCouTNLBXZ6b7RJD7PhHompNg713CXx0vI&callback=initMap" defer></script>
<script>
	//googleマップ
	function initMap() {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode(
			{'address': '<?=get_field('arean');?>'},
			function(results){
				map = new google.maps.Map(
					document.getElementById("map"),
					{
						zoom: 10,
						center: results[0].geometry.location,
						scrollwheel: false,
						zoomControl: true,
						mapTypeControl: false,
						scaleControl: true,
						streetViewControl: true,
						rotateControl: true,
						fullscreenControl: true
					}
				);
				let marker=[];
				let info=[];
				<?php
					foreach($area as $key=>$value):
				?>
					var geocoder = new google.maps.Geocoder();
					geocoder.geocode(
						{'address': '<?=$value;?>'},
						function(result){
							marker[<?=$key?>] = new google.maps.Marker({
								position: result[0].geometry.location,
								map: map,
								icon: '<?=get_template_directory_uri()?>/img/map-pin0.png'
							});
							info[<?=$key?>] = new google.maps.InfoWindow({
								content: '<a class="map-info" href=""><?=$meta['list_'.$key.'_list0'][0];?></a><p class="map-info"><?=$value?></p>'
							});
							marker[<?=$key?>].addListener('click', function() {
								info.forEach(function(ele) {
									ele.close();
								});
								info[<?=$key?>].open(map, marker[<?=$key?>]);
							});
						}
					);
				<?php endforeach; ?>
			}
		);
	}
</script>
