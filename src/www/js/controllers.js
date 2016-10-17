angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicPopup) {
  if (localStorage.getItem("position")==null) localStorage.setItem("position","A4")
  $scope.position = localStorage.getItem("position")
  
  function deltaPosFromChar(c) {
    var str = "abcdefghijkl mnoprstuvxyz",
      pos = str.search(c),
      dx = Math.floor(pos/5) - 2,
      dy = pos%5 - 2
    ;
    return {x: dx, y:dy};
  }

  $scope.savePosition = function(pos) {
    localStorage.setItem("position",pos);
  }

  $scope.calc = function(pos, passw) {
    if(!pos || pos.length < 2) {
      $ionicPopup.alert({title: 'Neumíš psát?', template: 'Pozice musí být ve formátu <písmeno><číslo>!'});
      return $scope.position;
    }
    if(!passw || !passw.length) {
      $ionicPopup.alert({title: 'Bez hesla to nepůjde!', template: 'Nezadali jste heslo z šifry!'});
      return $scope.position;
    }
    pos=pos.toUpperCase();
    passw=passw.toLowerCase();

    var aCode = "A".charCodeAt(0);

    var posx = pos.charCodeAt(0) - aCode,
        posy = Number(pos.slice(1));

    for (var i = 0; i < passw.length; i++) {
      var delta = deltaPosFromChar(passw[i]);
      if (Math.min(posy,posy+delta.y)<=18 && Math.max(posy,posy+delta.y)>=18)
        if(delta.y<0) delta.y--;
        else if(delta.y>0) delta.y++;
      posx+=delta.x;
      posy+=delta.y;
    }

    if(posx<0 || posy<1) {
      $ionicPopup.alert({title: 'Safra, chyba!', template: 'Toto heslo vás dostane ven z mapy!'});
      return $scope.position;
    }
    $scope.position = String.fromCharCode(aCode+posx) + String(posy);
    $scope.savePosition($scope.position);
    return $scope.position;
  }
})