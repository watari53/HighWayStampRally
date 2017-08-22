// This is a JavaScript file

var DUMMY_IMAGE = "./images/no-image.jpg";

ons.bootstrap()
    .factory('DataService', function($http) {
        var service = {};
        //                 service.data = {
        //                     "Facilities": [{
        //                         "id": 0,
        //                         "name": "海老名SA",
        //                         "expressway": "東名高速道路",
        //                         "lat": 35.431248,
        //                         "lng": 139.401082,
        //                         "address": '神奈川県川崎市中原区宮内1-3-3',
        //                         "image_url": "./images/no-image.jpg",
        //                         "memo": "メロンパンが名物",
        //                         "visited": null,
        //                         "load_id": 0
        //                     }, {
        //                         "id": 1,
        //                         "name": "足柄SA",
        //                         "expressway": "東名高速道路",
        //                         "lat": 35.313659,
        //                         "lng": 138.966701,
        //                         "address": '神奈川県川崎市中原区宮内1-3-3',
        //                         "image_url": "./images/dummy-image.jpg",
        //                         "memo": "カレーパンが名物",
        //                         "visited": "2017-6-20",
        //                         "load_id": 1
        //                     }, {
        //                         "id": 2,
        //                         "name": "談合坂SA",
        //                         "expressway": "中央自動車道",
        //                         "lat": 35.628314,
        //                         "lng": 139.046914,
        //                         "address": '神奈川県川崎市中原区宮内1-3-3',
        //                         "image_url": "./images/no-image.jpg",
        //                         "memo": "こっぺパンが名物",
        //                         "visited": null,
        //                         "load_id": 0
        //                     }, {
        //                         "id": 3,
        //                         "name": "石川PA",
        //                         "expressway": "中央自動車道",
        //                         "lat": 35.677597,
        //                         "lng": 139.37142,
        //                         "address": '神奈川県川崎市中原区宮内1-3-3',
        //                         "image_url": "./images/dummy-image.jpg",
        //                         "memo": "レーズンパンが名物",
        //                         "visited": "2017-6-23",
        //                         "load_id": 1
        //                     }],
        // 
        //                     "Loads": [{
        //                         "id": 0,
        //                         "name": "東名高速道路",
        //                         "all_facility": 100,
        //                         "visited_num": 20,
        //                         "image_url": "./dummy-image.jpg"
        //                     }, {
        //                         "id": 1,
        //                         "name": "中央自動車道",
        //                         "all_facility": 100,
        //                         "visited_num": 20,
        //                         "image_url": "./dummy-image.jpg"
        //                     }]
        //                 };
        $http.get("data.json").then(function(response) {
            service.data = response.data;
            console.log(response.data);
        });

        service.getFacilityData = function() {
            return this.data.Facilities;
        };

        service.updateFacilityData = function(facility) {
            console.log("updateFacilityData");
            console.log(facility);
            this.data.Facilities[facility.id] = facility;
            return this.data.Facilities[facility.id];
        };

        service.getFacilityById = function(facility_id) {
            var facility = null;
            var facility_id = facility_id;
            for (key in this.data.Facilities) {
                if (this.data.Facilities[key].id == facility_id) {
                    facility = this.data.Facilities[key];
                    break;
                }
            }
            return facility;
        };

        service.getLoadData = function() {
            return this.data.Loads;
        };

        service.getFacilitiesByLoadId = function(id) {
            console.log('get facilities by load_id');
            var facilities = [];
            var load_id = id;
            for (key in this.data.Facilities) {
                if (this.data.Facilities[key].load_id == load_id) {
                    facilities.push(this.data.Facilities[key]);
                }
            }
            return facilities;
        };

        return service;
    })
    .controller('AppController', function($scope) {
        this.load = function(page) {
            $scope.splitter.content.load(page);
            $scope.splitter.left.close();
        };

        this.toggle = function() {
            $scope.splitter.left.toggle();
        };
    })
    .controller('HomeController', function($scope, DataService) {
        console.log("HomeController");

        $scope.check_in = function() {
            console.log("check in");
            getLocationModal.show();
            getMapLocation();
        };

        // Get geo coordinates
        function getMapLocation() {

            navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {
                enableHighAccuracy: true
            });
        }

        // Success callback for get geo coordinates
        var onMapSuccess = function(position) {
            getLocationModal.hide();

            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;

            console.log("lat:" + Latitude + ":lng:" + Longitude);
            nav.pushPage('check_in.html', {
                data: {
                    lat: Latitude,
                    lng: Longitude
                }
            })
        };

        // Error callback
        function onMapError(error) {
            getLocationModal.hide();
            alert("位置情報を取得できませんでした");

            getLocationModal.hide();
            alert("位置情報を取得できませんでした");

            console.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
    })
    .controller('CollectionController', function($scope, DataService) {
        // alert(DataService.getData().Facilities[0].name);
        $scope.facilities = DataService.getFacilityData(); //SA.PAデータ
        // alert(DataService.getLoadData()[0].name);
        $scope.loads = DataService.getLoadData(); //高速道路データ
    })
    .controller('FacilitiesController', function($scope, DataService) {
        console.log("facilities controller");
        $scope.facilities = [];

        $scope.load = $scope.nav.topPage.data.load;
        $scope.facilities = DataService.getFacilitiesByLoadId($scope.load.id);
        // $scope.load_id = options.load_id;
    })
    // require facility object
    // ex pushPage
    // nav.pushPage('facility_detail.html', {data: {facility: facility}})
    // data
    // facility: facility object
    // when_visit_flg: true or blank
    .controller('FacilityDetailController', function($scope, DataService) {
        $scope.facility = $scope.nav.topPage.data.facility;
        // Stamp取得のdialogを取得
        if ($scope.nav.topPage.data.when_visit_flg) {
            ons.createDialog('press_stamp.html').then(function(dialog) {
                dialog.show();
            });
        }
    })
    .controller('CheckInController', function($scope, DataService) {
        console.log("check in controller");
        $scope.facility = null;

        var lat = $scope.nav.topPage.data.lat; // your position
        var lng = $scope.nav.topPage.data.lng; // your potision
        var INIT_PLACE = [lat, lng];

        var map = L.map('check-in-map').setView(INIT_PLACE, 14);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        console.log("set markers");
        var facilities = DataService.getFacilityData();
        for (var i = 0; i < facilities.length; i++) {
            f = facilities[i];
            L.marker([f.lat, f.lng], {
                    id: f.id,
                }).addTo(map)
                .on('click', activate_checkin)
                .bindPopup(f.name);
        }

        function activate_checkin(e) {
            // get id which clicked facility
            var f_id = this.options.id;
            console.log("click marker: facility id=" + f_id);
            $scope.facility = DataService.getFacilityById(f_id)
            console.log($scope.facility);
            var checkin_btn_elm = document.getElementById("check-in-btn");
            checkin_btn_elm.removeAttribute("disabled");
        }

        // register picture
        $scope.image_url = DUMMY_IMAGE; //<TODO>

        var getPictureFromGallery = function(onSuccess) {
            var options = {
                quality: 50,
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                destinationType: Camera.DestinationType.FILE_URI,
            };
            navigator.camera.getPicture(function(imageURI) {
                onSuccess(imageURI);
            }, onFail, options);
        };
        var getPictureFromCamera = function(onSuccess) {
            var options = {
                sourceType: Camera.PictureSourceType.CAMERA,
                // saveToPhotoAlbum: true,
                correctOrientation: true,
                destinationType: Camera.DestinationType.FILE_URI,
            };
            navigator.camera.getPicture(function(imageURI) {
                onSuccess(imageURI);
            }, onFail, options);
        };

        var onSuccess = function(pictureUrl) {
            console.log('onSuccess');
            //ファイルエントリー作成
            window.resolveLocalFileSystemURL(pictureUrl, function success(fileEntry) {
                console.log("origin:" + pictureUrl);

                // Do something with the FileEntry object, like write to it, upload it, etc.
                // writeFile(fileEntry, imgUri);
                console.log("got file: " + fileEntry.fullPath);
                // displayFileData(fileEntry.nativeURL, "Native URL");

            }, function() {
                // If don't get the FileEntry (which may happen when testing
                // on some emulators), copy to a new FileEntry.
                console.log("dont: " + pictureUrl);
            });
            // $scope.nav.pushPage('image.html', {
            //     data: {
            //         pictureUrl: pictureUrl
            //     }
            // });
            $scope.image_url = pictureUrl;
            $scope.$apply(); //画像を反映
        };

        function onFail() {
            console.log("写真を取得できませんでした。")
        }

        $scope.stamp_camera = function() {
            getPictureFromCamera(onSuccess);
        };

        $scope.stamp_gallery = function() {
            getPictureFromGallery(onSuccess);
        };


        // update facility data
        $scope.checkin_submit = function() {
            var date = new Date();
            $scope.facility.visited = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            $scope.facility.image_url = $scope.image_url;
            DataService.updateFacilityData($scope.facility);
            nav.pushPage('facility_detail.html', {
                data: {
                    facility: $scope.facility,
                    when_visit_flg: true
                }
            })
        }
    })
    .controller('MapController', function(DataService) {
        // map
        var map;
        var MAP_INIT_FLG = 0;
        var INIT_PLACE = [35.681167, 139.767052]
        if (MAP_INIT_FLG == 0) {
            console.log("map init");
            MAP_INIT_FLG = 1;

            map = L.map('map').setView(INIT_PLACE, 10);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            console.log("set markers");
            var facilities = DataService.getFacilityData();
            for (var i = 0; i < facilities.length; i++) {
                f = facilities[i];
                L.marker([f.lat, f.lng]).addTo(map)
                    .bindPopup(f.name);
            }
        }
    });