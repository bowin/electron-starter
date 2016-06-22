/**
 * Created by hubo on 16/6/22.
 */
console.log('in angular');

angular.module('starter', [])
  .controller('main', function ($scope, $http, $interval, $timeout) {
    const url = 'http://localhost:4000';
    console.log('in main ctrl');
    $scope.columns = '条码号|就诊类别|颜色|样本类型|项目|开单时间'.split('|');
    const setInteval = () => $interval(() => {
      $http.get(url).success(data => {
        $scope.data = data;
        if (data) {
          $interval.cancel(task);
          $timeout(() => {
            task = setInteval();
            $scope.data = {}
          }, 10 * 1000)
        }
      })
    }, 1000);
    let task = setInteval();
  });