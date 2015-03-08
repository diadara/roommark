var map;

function initialize() {
  var mapOptions = {
      zoom: 8,
      panControl: false,
      mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: false



  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

$("#btn-login").click(function(){
    var userName = $(".form-login #userName").val()
    var pass = $(".form-login #userPassword").val()
    $.ajax({
        url: "api/token",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#myModal").modal("hide");
            $("#modal-alert").hide();
            update_navbar(userName);
        },
        error: function(){
            $("#modal-alert").html("Error occured, check username and password again.").addClass("alert alert-warning").show();
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Basic "+btoa(userName+":"+pass));
        },

    })



})

$("#btn-signup").click(function(){
    var userName = $(".form-signup #userName").val();
    var pass = $(".form-signup #userPassword").val();
    var data = {"username": userName,
                "password": pass};
    console.log(data);
    console.log(userName);
    $.ajax({
        url: "api/users",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),

        success: function(data){
            console.log(data);
            $("#myModal").modal("hide");
            $("#modal-alert").hide();
            update_navbar(userName);
        },
        error: function(){
            $("#modal-alert").html("Username already exists.").addClass("alert alert-warning").show();
        },


    });



});


function update_navbar(username){
    $("#lors").hide();
    $("#lout").show();
    $("#lusername").html("<a>"+username+"</a>").show();
}


function logout(){
    $("#lors").show();
    $("#lout").hide();
    $("#lusername").hide();
    window.location = "/";
}

$("#lout").click(logout);
