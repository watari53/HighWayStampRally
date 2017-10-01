    // This is a JavaScript file

    var DUMMY_IMAGE = "./images/no-image.jpg";

    var app = {};
    ons.bootstrap()

        .factory('DataService', function($http) {
            var service = {};
            service.data = {
                "Stamps": [{
                    "id"             : 0,
                    "name"           : "海老名SA",
                    "lat"            : 35.431248,
                    "lng"            : 139.401082,
                    "address"        : '神奈川県川崎市中原区宮内1-3-3',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "メロンパンが名物",
                    "get_date"       : null,
                    "stamp_book_id"  : 0,
                    "stamp_book_name": "東名高速道路",
                }, {
                    "id"             : 1,
                    "name"           : "足柄SA",
                    "lat"            : 35.313659,
                    "lng"            : 138.966701,
                    "address"        : '神奈川県川崎市中原区宮内1-3-3',
                    "image_url"      : "./images/dummy-image.jpg",
                    "memo"           : "カレーパンが名物",
                    "get_date"       : "2017-6-20",
                    "stamp_book_id"  : 0,
                    "stamp_book_name": "東名高速道路",
                }, {
                    "id"             : 2,
                    "name"           : "談合坂SA",
                    "lat"            : 35.628314,
                    "lng"            : 139.046914,
                    "address"        : '神奈川県川崎市中原区宮内1-3-3',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "こっぺパンが名物",
                    "get_date"       : null,
                    "stamp_book_id"  : 1,
                    "stamp_book_name": "中央自動車道",
                }, {
                    "id"             : 3,
                    "name"           : "石川PA",
                    "lat"            : 35.677597,
                    "lng"            : 139.37142,
                    "address"        : '神奈川県川崎市中原区宮内1-3-3',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "レーズンパンが名物",
                    "get_date"       : null,
                    "stamp_book_id"  : 1,
                    "stamp_book_name": "中央自動車道",
                }, {
                    "id"             : 4,
                    "name"           : "東京ラスク",
                    "lat"            : 35.688507,
                    "lng"            : 139.88102,
                    "address"        : '東京都千代田区1-3-3',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "レーズンパンが名物",
                    "get_date"       : "2017-09-10",
                    "stamp_book_id"  : 2,
                    "stamp_book_name": "これだけは行きたい！東京の旅",
                }, {
                    "id"             : 5,
                    "name"           : "東京ばなな",
                    "lat"            : 35.678597,
                    "lng"            : 139.38142,
                    "address"        : '東京千代田区1-3-3',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "レーズンパンが名物",
                    "get_date"       : null,
                    "stamp_book_id"  : 2,
                    "stamp_book_name": "これだけは行きたい！東京の旅",
                }, {
                    "id"             : 6,
                    "name"           : "東京いちご",
                    "lat"            : 35.608597,
                    "lng"            : 139.39142,
                    "address"        : '東京千代田区1-3-4',
                    "image_url"      : "./images/no-image.jpg",
                    "memo"           : "イチゴが名物",
                    "get_date"       : null,
                    "stamp_book_id"  : 2,
                    "stamp_book_name": "これだけは行きたい！東京の旅",
                }],

                "StampBooks": [{
                    "id"            : 0,
                    "name"          : "東名高速道路",
                    "all_stamps_num": 2,
                    "get_stamp_num" : 1,
                    "image_url"     : "./images/dummy-image.jpg",
                    "active_flg": true,
                }, {
                    "id"            : 1,
                    "name"          : "中央自動車道",
                    "all_stamps_num": 2,
                    "get_stamp_num" : 0,
                    "image_url"     : "./images/dummy-image.jpg",
                    "active_flg": false,
                }, {
                    "id"            : 2,
                    "name"          : "これだけは行きたい！東京の旅",
                    "all_stamps_num": 3,
                    "get_stamp_num" : 1,
                    "image_url"     : "./images/dummy-image.jpg",
                    "active_flg": true,
                }]
            };
            localStorage.setItem("Stamps", JSON.stringify(service.data.Stamps));
            localStorage.setItem("StampBooks", JSON.stringify(service.data.StampBooks));
            // set data
            // $http.get("data.json").then(function(response) {
            //     alert('read data');
            //     service.data = response.data;
            //     localStorage.setItem("Stamps", JSON.stringify(service.data.Stamps));
            //     localStorage.setItem("StampBooks", JSON.stringify(service.data.StampBooks));
            // });
            // test to set data
            // var stamps = localStorage.getItem("stamps");
            // alert(JSON.parse(stamps)[0].name);
            // var stamp_books = localStorage.getItem("StampBooks");
            // alert(JSON.parse(stamp_books)[0].name);

            service.getStampData = function() {
                console.log("getStampData");

                return JSON.parse(localStorage.getItem("Stamps"));
            };
            service.setStampData = function(stamps) {
                console.log("setStampData");
                localStorage.setItem("Stamps", JSON.stringify(stamps));
            }

            service.updateStampData = function(stamp) {
                console.log("updateStampData");

                // service.data.Stamps[stamp.id] = stamp;
                var stamps = service.getStampData();
                stamps[stamp.id] = stamp;
                service.setStampData(stamps);
                return stamps[stamp.id];
            };

            service.getActiveStampData = function() {
                console.log("getActiveStampData");
                var stamp_books = JSON.parse(localStorage.getItem("StampBooks"));
                var ret_stamps = [];
                for (var i = 0; i < stamp_books.length; i++) {
                    if (stamp_books[i].active_flg == true) {
                        var stamps = []
                        var stamps = service.getStampsByStampBookId(stamp_books[i].id);
                        jQuery.merge(ret_stamps, stamps);
                    }
                }
                return ret_stamps;
            }

            service.setStampBooksData = function(stamp_books) {
                localStorage.setItem("StampBooks", JSON.stringify(stamp_books));
            };

            service.updateStampBookData = function(stamp_book) {
                console.log("updateStampBookData");
                console.log("update: " + stamp_book.name);
                var stamp_books = service.getStampBooks();
                stamp_books[stamp_book.id] = stamp_book;
                service.setStampBooksData(stamp_books);
            };

            service.getStampById = function(stamp_id) {
                var stamp = null;
                var stamp_id = stamp_id;
                var stamps = service.getStampData();
                for (key in stamps) {
                    if (stamps[key].id == stamp_id) {
                        stamp = stamps[key];
                        break;
                    }
                }
                return stamp;
            };

            service.getStampBookById = function(stamp_book_id) {
                var stamp_book = null;
                var stamp_book_id = stamp_book_id;
                var stamp_books = service.getStampBooks();
                for (key in stamp_books) {
                    if (stamp_books[key].id == stamp_book_id) {
                        stamp_book = stamp_books[key];
                        break;
                    }
                }
                return stamp_book;
            };

            service.getStampBooks = function() {
                return JSON.parse(localStorage.getItem("StampBooks"));
            };

            service.getStampsByStampBookId = function(id) {
                console.log('get stamps by stamp_book_id');
                var ret_stamps = [];  //stamp_book_idを持つstamp群を代入
                var stamp_book_id = id;
                var stamps = service.getStampData();
                for (key in stamps) {
                    if (stamps[key].stamp_book_id == stamp_book_id) {
                        ret_stamps.push(stamps[key]);
                    }
                }
                return ret_stamps;
            };
            return service;
        })
        .factory('CommonService', function() {
            var service = {};

            service.goHome = function() {
                var home="home.html"
                document.getElementById('nav').resetToPage(home);
            };

            return service;
        })
        .controller('AppController', function($scope) {
            this.road = function(page) {
                $scope.splitter.content.road(page);
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
                console.log("error to get location");
                alert("位置情報を取得できませんでした");
                getLocationModal.hide();
                var INIT_PLACE = [35.681167, 139.767052]

                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');

                nav.pushPage('check_in.html', {
                    data: {
                        lat: INIT_PLACE[0],
                        lng: INIT_PLACE[1]
                    }
                })
            }
        })
        .controller('StampBooksController', function($scope, DataService) {
            var JOINABLE_STAMPRALLY = 0;
            var JOINED_STAMPRALLY = 1;
            $scope.stamps = DataService.getStampData(); //SA.PAデータ
            $scope.stamp_books = DataService.getStampBooks(); //高速道路データ

            $( 'input[name="segment"]:radio' ).change( function() {  
                if ($(this).val() == JOINABLE_STAMPRALLY) {
                    console.log("show joinable stamps");
                    $('#inactivated').css('display', 'none');
                    $('#activated').css('display', 'block');
                } else if ($(this).val() == JOINED_STAMPRALLY) {
                    console.log("show joined stamps");
                    $('#activated').css('display', 'none');
                    $('#inactivated').css('display', 'block');
                }
            });

            $scope.go_stamps = function(stamp_book) {
                var stamp_book = stamp_book;
                nav.pushPage('stamps.html', {data : {stamp_book: stamp_book}});
            };
        })
        .controller('StampBookDetailController', function($scope, DataService) {
            console.log("stamps controller");
            var JOINED = "参加中";
            var NOT_JOINED = "参加する";
            $scope.active_message = NOT_JOINED; // 参加中 or 参加する

            $scope.stamp_book = $scope.nav.topPage.data.stamp_book;
            $scope.stamps = DataService.getStampsByStampBookId($scope.stamp_book.id);

            if ($scope.stamp_book.active_flg == true) {
                $scope.active_message = JOINED;
            }

            $scope.select = function(stamp_book, e) {
                console.log("select join or not join");
                if(e.target.innerHTML == NOT_JOINED) {
                    join(stamp_book, e);
                } else if(e.target.innerHTML == JOINED) {
                    not_join(stamp_book, e);
                }
            }

            function join(stamp_book, e) {
                ons.notification.confirm({
                    message: stamp_book.name + '<br>' + 'このスタンプに参加しますか?',
                    callback: function(answer) {
                        if (answer == 1) { // yes
                            activate_stamp_book(stamp_book, e);
                        } else {  // no
                            console.log("canceled");
                        }
                    }
                });
            }

            function activate_stamp_book(stamp_book, e) {
                if (stamp_book.active_flg == false) {
                    var activated_status = JOINED;
                    console.log("activate stamp book: id=" + stamp_book.id);
                    e.target.innerHTML = activated_status;
                    stamp_book.active_flg = true;
                    DataService.updateStampBookData(stamp_book);
                }
            }

            function not_join(stamp_book, e) {
                ons.notification.confirm({
                    message: stamp_book.name + '<br>' + 'このスタンプを取り消しますか?',
                    callback: function(answer) {
                        if (answer == 1) { // yes
                            inactivate_stamp_book(stamp_book, e);
                        } else {  // no
                            console.log("canceled");
                        }
                    }
                });
            }

            function inactivate_stamp_book(stamp_book, e) {
                if (stamp_book.active_flg == true) {
                    var activated_status = NOT_JOINED;
                    console.log("activate stamp book: id=" + stamp_book.id);
                    e.target.innerHTML = activated_status;
                    stamp_book.active_flg = false;
                    DataService.updateStampBookData(stamp_book);
                }
            }

            // map
            var map;
            var bounds_array = [];
            var MAP_INIT_FLG = 0;
            var INIT_PLACE = [35.681167, 139.767052]
            if (MAP_INIT_FLG == 0) {
                console.log("map init");
                MAP_INIT_FLG = 1;

                map = L.map('stamp_book_detail_map').setView(INIT_PLACE, 10);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                console.log("set markers");
                var stamps = $scope.stamps;
                for (var i = 0; i < stamps.length; i++) {
                    f = stamps[i];
                    L.marker([f.lat, f.lng]).addTo(map)
                        .bindPopup(f.name);
                    bounds_array.push([f.lat, f.lng]);
                }
                map.fitBounds(bounds_array);
            }

        })
        // require stamp object
        // ex pushPage
        // nav.pushPage('stamp_detail.html', {data: {stamp: stamp}})
        // data
        // stamp: <stamp object>
        // when_visit_flg: <true or blank>
        .controller('StampDetailController', function($scope, DataService, CommonService) {
            $scope.stamp = $scope.nav.topPage.data.stamp;
            // Stamp取得のdialogを取得
            if ($scope.nav.topPage.data.when_visit_flg) {
                ons.createDialog('press_stamp.html').then(function(dialog) {
                    dialog.show();
                });
            }

            $scope.go_home = function() {
                alert("go home");
                CommonService.goHome();
            };
        })
        .controller('CheckInController', function($scope, DataService) {
            console.log("check in controller");
            var stamp = null;

            var lat = $scope.nav.topPage.data.lat; // your position
            var lng = $scope.nav.topPage.data.lng; // your potision
            var INIT_PLACE = [lat, lng];

            var map = L.map('check-in-map').setView(INIT_PLACE, 14);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            map.on('moveend', function(){
                // alert("map moveend");
            });

            console.log("set markers");
            var stamps = DataService.getStampData();
            var stamps = DataService.getActiveStampData();

            set_markers(stamps);

            function set_markers(stamps) {
                for (var i = 0; i < stamps.length; i++) {
                    f = stamps[i];
                    popup = '<ons-icon icon="fa-map-marker"></ons-icon>' + f.name + "<br>" + '<ons-icon icon="fa-book"></ons-icon>' + f.stamp_book_name;
                                
                    L.marker([f.lat, f.lng], {
                            id: f.id,
                        }).addTo(map)
                        .on('click', activate_checkin)
                        .bindPopup(popup);
                }
            }

            function activate_checkin(e) {
                // get id which clicked stamp point
                var s_id = this.options.id;
                console.log("click marker: stamp id=" + s_id);
                stamp = DataService.getStampById(s_id)
                console.log("check: " + stamp.name);
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

            function stamp_camera() {
                getPictureFromCamera(onSuccess);
            }

            function stamp_gallery() {
                getPictureFromGallery(onSuccess);
            }

            // update stamp data
            $scope.checkin_submit = function() {
                var date = new Date();
                if (stamp.get_date == null) {
                    var stamp_book = DataService.getStampBookById(stamp.stamp_book_id);
                    stamp_book.get_stamp_num++;
                    DataService.updateStampBookData(stamp_book);
                }
                stamp.get_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                stamp.image_url = $scope.image_url;
                DataService.updateStampData(stamp);
                nav.pushPage('stamp_detail.html', {
                    data: {
                        stamp: stamp,
                        when_visit_flg: true
                    }
                });
            };
            // action sheet which selet picture from camera or gallery
            var CAMERA_INDEX = 0;
            var GALLERY_INDEX = 1;
            app.showFromObject = function () {
              ons.openActionSheet({
                title: 'スタンプ用画像の撮影',
                cancelable: true,
                buttons: [
                  {
                      label: 'カメラで撮影',
                      icon: 'md-camera',
                  },
                  {
                    label: 'ギャラリーから選択',
                    icon: 'fa-picture-o',
                  },
                  {
                    label: 'Cancel',
                    icon: 'md-close'
                  }
                ]
              }).then(function (index) {
                  console.log('index: ' + index);
                  if (index == CAMERA_INDEX) {
                      stamp_camera();
                  } else if (index == GALLERY_INDEX) {
                      stamp_gallery();
                  }
              });
            };

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
                var stamps = DataService.getStampData();
                for (var i = 0; i < stamps.length; i++) {
                    f = stamps[i];
                    L.marker([f.lat, f.lng]).addTo(map)
                        .bindPopup(f.name);
                }
            }
        });