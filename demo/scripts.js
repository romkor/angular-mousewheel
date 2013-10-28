angular.module('Project', ['eveWheel']);

function MyCntrl($scope) {
    $scope.colors = [
        {name: 'black', shade: 'dark'},
        {name: 'white', shade: 'light'},
        {name: 'red', shade: 'dark'},
        {name: 'blue', shade: 'dark'},
        {name: 'yellow', shade: 'light'}
    ];
    $scope.color = $scope.colors[2]; // red

    $scope.changeValue = function ($delta) {

        var current = $scope.colors.indexOf($scope.color),
            lastColor = $scope.colors.length - 1;

        if ($delta > 0 && current === lastColor) {
            $scope.color = $scope.colors[0];
        } else if ($delta < 0 && current === 0) {
            $scope.color = $scope.colors[lastColor];
        } else {
            $scope.color = $scope.colors[current + $delta];
        }

    }

    $scope.getClass = function ($index) {
        if ($scope.colors.indexOf($scope.color) === $index) {
            return 'active';
        }
    }

    $scope.selectColor = function($index){
        $scope.color = $scope.colors[$index];
    }
}
