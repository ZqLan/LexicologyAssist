﻿var lexicologyApp = angular.module('lexicology', ["mobile-angular-ui",'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/main', {templateUrl: 'main.html',   controller: MainCtrl}).
            when('/select', {templateUrl: 'toc.html', controller: SelectCtrl}).
            when('/word', {templateUrl: 'word.html', controller: WordCtrl}).
            otherwise({redirectTo: '/main'});
    }]);

var noWords = "没有词根了哦";
var startingReview = "开始复习";

var selectAlphabet = [];

function WordCtrl($scope, $routeParams, $location) {
    $scope.morpheme = {name:"",explanation:"",examples:[]};
    $scope.nowIndex = -1;
    $scope.next = "无";
    $scope.show_message = true;

    if (haveOne()) {
        pickOne($scope);
    }
    else {
        getStorage();
        if (haveOne()) {
            pickOne($scope);
        }
        else {
            message($scope, noWords);
        }
    }

    $scope.passOne = function () {
        if (haveOne())
            pickOne($scope);
        else {
            startReview();
            if (haveOne())
                message($scope, startingReview);
            else
                message($scope, noWords);
        }
    };

    $scope.skipOne = function () {
        reviewList.push($scope.nowIndex);
        $scope.passOne();
    };

    $scope.continue = function () {
        if (haveOne()) {
            pickOne($scope);
        }
        else {
            $location.path('/main');
        }
    }

    $scope.return = function () {
        $location.path('/main');
    };
}

function init(list) {
    workingList = [];
    for (var i in list) {
        for (var j = morphemesIndex[list[i]]; j < morphemesIndex[list[i] + 1]; j++) {
            workingList.push(j);
        }
    }
}


function startReview() {
    workingList = reviewList;
    reviewList = [];
    saveStorage();
}

function haveOne() {
    return (workingList.length > 0);
}

function pickOne($scope) {
    saveStorage();
    var index = workingList.shift();
    $scope.morpheme = morphemes[index];
    $scope.nowIndex = index;
    if (workingList.length > 0) {
        $scope.next = morphemes[workingList[0]].name;
    }
    else {
        $scope.next = "无";
    }
    $scope.show_message = false;
}

function message($scope, msg) {
    $scope.message = msg;
    $scope.show_message = true;
}



function MainCtrl($scope, $routeParams, $location) {
    $scope.new = function () {
        $location.path('/select');
    };
    $scope.old = function () {
        getStorage();
        if (!workingList && workingList.length > 0)
            $location.path('/word');
        else
            alert("Sorry,未检测到您上次使用的信息.");
    };
}

function SelectCtrl($scope, $routeParams, $location) {
    var alphabet = [];
    for (var i = 0; i < 26; i++) {
        if (morphemesIndex[i] < morphemesIndex[i + 1]) {
            var obj = {index:i,name:String.fromCharCode(i + 65),select:false};
            alphabet.push(obj);
        }
    }
    $scope.alphabet = alphabet;

    $scope.return = function () {
        $location.path('/main');
    };
    $scope.switch = function () {
        for(var i in $scope.alphabet) {
            $scope.alphabet[i].select = !$scope.alphabet[i].select;
        }
    };
    $scope.next = function () {
        selectAlphabet = [];
        for(var i in $scope.alphabet) {
            if ($scope.alphabet[i].select)
                selectAlphabet.push(Number(i));
        }
        if (selectAlphabet.length > 0) {
            init(selectAlphabet);
            $location.path('/word');
        }
        else {
            alert("请选择后重试");
        }
    };
}