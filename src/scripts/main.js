'use strict';

angular.module('dansesCoApp')
.controller('MainCtrl',  function ($scope, $window, $http, $state) {

    $scope.autoscroll = false;
    var currentSchedule = 0;

    $scope.down_anim = true;
    $scope.up_anim = false;

    $http.get('data.json').then(function(res) {

        $scope.schedulesAll = res.data.season_schedule;

        //var now = moment('2015-09-21T18:00+0100');
        var now = moment();

        for (var i = 0;i < $scope.schedulesAll.length;i++) {

            var sched = $scope.schedulesAll[i];
            var cur = moment(sched['date']);

            if (now < cur) {
                currentSchedule = i;
                break;
            }
        }
        console.log('data loaded');

        updateDisplaySchedules(currentSchedule);
    });

    $scope.stateGo = function (state) {
        $state.go(state);
    };

    var updateDisplaySchedules = function (current) {
        $scope.schedules = [];

        for (var i = current;i < $scope.schedulesAll.length;i++) {

            var sched = $scope.schedulesAll[i];
            var cur = moment(sched['date']);

            var item = {
                dateFormated: cur.format('DD/MM/YYYY'),
                hourBegin: cur.format('HH[h]'),
                free: sched['free']
            };
            var dur = moment.duration(sched['duration']);
            item.hourEnd = cur.add(dur).format('HH[h]');
            if (sched['cours'] === 'portes_ouverte') {
                item.cours = 'Portes ouvertes';
                item.level = 'Tout niveau';
                item.uri = 'courses';
            } else if (sched['cours'] === 'soiree') {
                item.cours = 'Soirée';
                item.level = 'Tout niveau';
                item.uri = 'courses';
            } else if (sched['cours'] === 'std1') {
                item.cours = 'Danses standards';
                item.level = 'Niveau débutant';
                item.uri = 'courses.std';
            } else if (sched['cours'] === 'std2') {
                item.cours = 'Danses standards';
                item.level = 'Niveau avancé';
                item.uri = 'courses.std';
            } else if (sched['cours'] === 'latin1') {
                item.cours = 'Danses latines';
                item.level = 'Niveau débutant';
                item.uri = 'courses.latines';
            } else if (sched['cours'] === 'latin2') {
                item.cours = 'Danses latines';
                item.level = 'Niveau avancé';
                item.uri = 'courses.latines';
            } else if (sched['cours'] === 'zumba') {
                item.cours = 'Zumba';
                item.level = 'Tout niveau';
                item.uri = 'courses.zumba';
            }
            $scope.schedules.push(item);

            if ($scope.schedules.length >= 5)
                break;
        }

        $scope.previousButton = currentSchedule > 0;
        $scope.nextButton = currentSchedule + 5 < $scope.schedulesAll.length;
    }

    $scope.agendaPrevious = function () {
        if (currentSchedule <= 0)
            return;
        currentSchedule -= 5;
        if (currentSchedule <= 0)
            currentSchedule = 0;
        $scope.down_anim = true;
        $scope.up_anim = false;
        updateDisplaySchedules(currentSchedule);
    };

    $scope.agendaNext = function () {
        if (currentSchedule + 5 > $scope.schedulesAll.length)
            return;
        currentSchedule += 5;
        if (currentSchedule + 5 >= $scope.schedulesAll.length)
            currentSchedule = $scope.schedulesAll.length - 5;
        $scope.down_anim = false;
        $scope.up_anim = true;
        updateDisplaySchedules(currentSchedule);
    };
});
