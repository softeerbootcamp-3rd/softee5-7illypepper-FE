import React, {useEffect, useRef, useState} from 'react';
// import places from '../data/places';
import axios from "axios";
import { useEffectOnce } from './useEffectOnce';

function RouteWalk(props) {
    const mapRef = useRef(null);
    const markersRef = useRef(new Map());
    const overlayMarkerRef = useRef(null);

    const [currentLocation, setCurrentLocation] = useState([]);

    const [places, setPlaces] = useState([]);

    const initialLocation = {
        // 양재시민의숲역
        "x": 37.47000929951769,
        "y": 127.03852553920082
        // // 좀 위에
        // "x": 37.473326,
        // "y": 127.038392
    };

    const mapCenter = useRef({
        x: initialLocation.x,
        y: initialLocation.y
    });
    const zoomLevel = useRef(17);
    const [zl, setZl] = useState(16);

    // test용 반드시 경유하는 지점
    const certainLocation = {
        "x": 37.4675611293541,
        "y": 127.03750974228132
    };
    const destLocation = {
        "x": 37.46617240915168,
        "y": 127.04101042033751
    };

    // 현재 위치를 서버로 보내는 함수
    const sendCurrentLocationToServer = async (location) => {
        try {
            console.log(location);
            // const response = await axios.post('/find', {
            //     axisX: location._lat,
            //     axisY: location._lng
            // });
            const response = await axios.get('/findfind', {
                params: {
                    memberId: 1,
                    meter: 150,
                    count: 3,
                    x: location._lat,
                    y: location._lng
                }
            });
            console.log("Location sent to server: ", response.data);

            setPlaces(response.data);
        } catch (error) {
            console.error("Error sending location to server: ", error);
        }
    };

    useEffect(() => {
        // 지도 초기화
        if (!mapRef.current) {
            const map = new window.Tmapv3.Map("map_div", {
                // center: new window.Tmapv3.LatLng(37.4860034618704, 127.03449720489127),
                center: new window.Tmapv3.LatLng(initialLocation.x, initialLocation.y),
                width: "360px",
                height: "800px",
                zoom: 15.5
            });
            mapRef.current = map;
        }

        // 매 5초마다 지도의 중심 좌표와 줌 레벨 업데이트
        const interval = setInterval(() => {
            if (mapRef.current) {
                const center = mapRef.current.getCenter();
                const newZoomLevel = mapRef.current.getZoom();

                mapCenter.current = { x: center.lat(), y: center.lng() };
                zoomLevel.current = newZoomLevel;

                setZl(zoomLevel.current);
            }
        }, 300); // 5초 간격

        // 컴포넌트 언마운트 시 정리
        // return () => clearInterval(interval);

        // 초기 위치에 마커 생성
        setCurrentLocation(new window.Tmapv3.LatLng(initialLocation.x, initialLocation.y));
        new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(initialLocation.x, initialLocation.y),
            icon: "/mapWave.png",
            iconSize: new window.Tmapv3.Size(146, 146),
            offset: new window.Tmapv3.Point(0, 73),
            // draggable: true,
            map: mapRef.current,
        });

        // 도착지 마커 생성
        new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(destLocation.x, destLocation.y),
            icon: '/map_flag.png',
            iconSize: new window.Tmapv3.Size(30, 35),
            offset: new window.Tmapv3.Point(0, 20),
            zIndex: 300000,
            map: mapRef.current,
        });

        // 현재 위치를 서버로 보내기
        sendCurrentLocationToServer(new window.Tmapv3.LatLng(initialLocation.y, initialLocation.x));
    }, []);

    function getIconPathByCategory(categoryId, size) {
        if (size === "big") {
            switch (categoryId) {
                case 1:
                    return `/pin_camera_${size}.png`;
                case 9:
                    return `/pin_park_${size}.png`;
                case 16:
                    return `/pin_animal_${size}.png`;
                default:
                    return;
            }
        } else if(size === "regular") {
            switch (categoryId) {
                case 1:
                    return `/pin_camera_${size}.png`;
                case 9:
                    return `/pin_park_${size}.png`;
                case 16:
                    return `/pin_animal_${size}.png`;
                default:
                    return;
            }
        } else if (size === "small") {
            switch (categoryId) {
                default:
                    const smallIcons = [
                        '/pin_store_small.png',
                        '/pin_stair_small.png',
                        '/pin_lamp_small.png'
                    ];
                    const randIdx = Math.floor(Math.random() * smallIcons.length);
                    return smallIcons[randIdx];
            }
        }

    }

    useEffect(() => {
        console.log("places updated: ", places);
        places.map((place) => {
            let iconPath = "";
            let iconSize = 0;

            // 위도에 따른 z-index 계산
            const zidx = Math.round((40 - place.axisY) * 100000);
            // console.log("z-Index by lat", zidx);

            const distance = calculateDistance(currentLocation, place);

            // 거리와 카테고리로 이미지 종류 분기 (크기: 1, 2, 3) (카테고리: 2,3,5,6,8,9,12,13,14,15,16)
            // if (place.size===100) {
            //     iconPath = `
            //       <div style="
            //         display: flex;
            //         justify-content: center;
            //         align-items: center;
            //         width: 48px; /* 아이콘 너비 */
            //         height: 89.93523px; /* 아이콘 높이 */
            //         flex-shrink: 0;
            //         background-image: url('/pin_park_big.png'); /* 마커 이미지 */
            //         background-size: cover; /* 이미지가 div를 꽉 채우도록 */
            //         background-repeat: no-repeat;
            //         background-position: center;
            //         position: relative;
            //         ">
            //         <div style="
            //           color: black; /* 텍스트 색상 */
            //           font-size: 12px; /* 텍스트 크기 */
            //           /*padding: 2px 4px; !* 텍스트 패딩 *!*/
            //           background: rgba(255, 255, 255, 0); /* 텍스트 배경 반투명 흰색 */
            //           /*border-radius: 4px; !* 텍스트 배경 둥글게 *!*/
            //           /*box-shadow: 0px 2.133px 4.267px rgba(0, 0, 0, 0.2); !* 텍스트 배경 그림자 *!*/
            //           position: absolute; /* 절대 위치 */
            //           bottom: 10%; /* 상단에서 30px 위치 */
            //           left: 50%; /* 왼쪽에서 50% 위치 */
            //           transform: translate(-50%, 0%); /* 좌우 중앙 정렬 보정 */
            //           white-space: nowrap;
            //           ">
            //           ${Math.round(distance * 1000)} m
            //         </div>
            //       </div>
            //     `;
            //
            //     iconSize = new window.Tmapv3.Size(48, 89.93523);
            //     // zidx = 1003;
            // } else
            if (place.size === 1 || place.size === 2 || place.size === 3) {
                iconPath = `
                    <div style="
                        width: 28px; /* 기본 아이콘 너비 */
                        height: 40px; /* 기본 아이콘 높이 */
                        background-image: url('${getIconPathByCategory(place.categoryId, "regular")}'); /* 기본 마커 이미지 */
                        background-size: cover; /* 이미지가 div를 꽉 채우도록 */
                        ">
                    </div>
                `;
                iconSize = new window.Tmapv3.Size(28, 40);
                // zidx = 1002;
            } else if (place.size === 0) {
                iconPath = `
                    <div style="
                        width: 24px; /* 기본 아이콘 너비 */
                        height: 24px; /* 기본 아이콘 높이 */
                        background-image: url('${getIconPathByCategory(place.categoryId, "small")}'); /* 기본 마커 이미지 */
                        background-size: cover; /* 이미지가 div를 꽉 채우도록 */
                        ">
                    </div>
                `;
                // console.log(iconPath);
                iconSize = new window.Tmapv3.Size(24, 24);
                // zidx = 1001;
            }

            const marker = new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(place.axisY, place.axisX),
                iconHTML: iconPath,
                iconSize: iconSize,
                zIndex: zidx,
                map: mapRef.current,
            });
            markersRef.current.set(place.id, marker);

            // if (markerLabel) {
            //     const label = new window.Tmapv3.Label({
            //         content: markerLabel,
            //         position: marker.getPosition(),
            //         map: mapRef.current,
            //         style: {
            //             color: "black",
            //             backgroundColor: "orange",
            //             borderRadius: "4px",
            //             padding: "4px 8px",
            //             fontSize: "14px",
            //             border: "2px solid black"
            //         }
            //     });
            // }
        });
        getPedestrianRoute();
    }, [places, currentLocation, mapRef]);

    useEffect(() => {
        console.log("zoomlevel is updated!");
        if (zoomLevel.current >= 18) {
            let closestPlace = null;
            let minDist = Number.MAX_VALUE;

            places.forEach(place => {
                const distance = calculateDistance2(mapCenter.current, place);
                // console.log("distance: ", distance);
                if(distance < minDist) {
                    minDist = distance;
                    closestPlace = place;
                    // console.log("minDist: ", minDist);
                }
            });

            if(closestPlace && !overlayMarkerRef.current) {
                console.log("closestPlace: ", closestPlace);

                const iconPath = getIconPathByCategory(closestPlace.categoryId, "big");

                const iconPathFull = `
                  <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: 45px;
                    width: 48px; /* 아이콘 너비 */
                    height: 89.93523px; /* 아이콘 높이 */
                    flex-shrink: 0;
                    background-image: url('${iconPath}'); /* 마커 이미지 */
                    background-size: cover; /* 이미지가 div를 꽉 채우도록 */
                    background-repeat: no-repeat;
                    background-position: center;
                    position: relative;
                    ">
                    <div style="
                      color: black; /* 텍스트 색상 */
                      font-size: 12px; /* 텍스트 크기 */
                      /*padding: 2px 4px; !* 텍스트 패딩 *!*/
                      background: rgba(255, 255, 255, 0); /* 텍스트 배경 반투명 흰색 */
                      /*border-radius: 4px; !* 텍스트 배경 둥글게 *!*/
                      /*box-shadow: 0px 2.133px 4.267px rgba(0, 0, 0, 0.2); !* 텍스트 배경 그림자 *!*/
                      position: absolute; /* 절대 위치 */
                      bottom: 10%; /* 상단에서 30px 위치 */
                      left: 50%; /* 왼쪽에서 50% 위치 */
                      transform: translate(-50%, 0%); /* 좌우 중앙 정렬 보정 */
                      white-space: nowrap;
                      ">
                      ${Math.round(calculateDistance(currentLocation, closestPlace) * 1000)} m
                    </div>
                  </div>
                `;

                const iconSize = new window.Tmapv3.Size(48, 89.93523);


                const marker = new window.Tmapv3.Marker({
                    position: new window.Tmapv3.LatLng(closestPlace.axisY, closestPlace.axisX),
                    iconHTML: iconPathFull,
                    iconSize: iconSize,
                    zIndex: 300000,
                    map: mapRef.current,
                });
                overlayMarkerRef.current = marker;
                props.popupTrue();
            }
        } else {
            // 줌 레벨이 18 미만일 때 새 마커 제거
            if (overlayMarkerRef.current) {
                overlayMarkerRef.current.setMap(null);
                overlayMarkerRef.current = null;
            }
        }
    }, [zl]);

    const toCenter = () => {
        // 지도 중심을 초기 위치로 이동
        mapRef.current.setCenter(currentLocation);
    }

    // 장소 임의 선택
    const selectRandomPlaces = (places, count) => {
        const shuffled = places.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // 현재 위치와 장소 사이의 거리를 계산하는 함수
    const calculateDistance = (currentLocation, place) => {
        const radlat1 = Math.PI * currentLocation._lat / 180;
        const radlat2 = Math.PI * place.axisY / 180;
        const theta = currentLocation._lng - place.axisX;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist * 1.609344; // 킬로미터 단위
    };
    const calculateDistance2 = (currentLocation, place) => {
        const radlat1 = Math.PI * currentLocation.x / 180;
        const radlat2 = Math.PI * place.axisY / 180;
        const theta = currentLocation.y - place.axisX;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist * 1.609344; // 킬로미터 단위
    };

    // 도보 경로 요청
    const getPedestrianRoute = async () => {
        if (currentLocation && mapRef.current) {
            const nearPlaces = places.filter(place => place.size === 1);

            // 랜덤 3개 수집
            const selectedPlaces = selectRandomPlaces(nearPlaces, 1);

            // test 경유지 설정
            selectedPlaces.unshift({
                axisX: certainLocation.y,
                axisY: certainLocation.x
            })

            // places 배열을 거리에 따라 정렬
            const sortedPlaces = selectedPlaces.sort((a, b) => {
                return calculateDistance(currentLocation, a) - calculateDistance(currentLocation, b);
            });

            console.log("sortedPlaces: ", sortedPlaces);

            // 시작점 경로에 추가
            sortedPlaces.unshift({
                axisX: currentLocation._lng,
                axisY: currentLocation._lat
            });

            // test 목적지 설정
            sortedPlaces.push({
                axisX: destLocation.y,
                axisY: destLocation.x
            });

            console.log("Path: ", sortedPlaces);

            const headers = {
                appKey: process.env.REACT_APP_API_KEY // 여기에 발급받은 Appkey 입력
            };

            try {
                const allRouteData = [];
                for (let i = 0; i < sortedPlaces.length - 1; i++) {
                    const response = await axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result", {
                        startX: sortedPlaces[i].axisX,
                        startY: sortedPlaces[i].axisY,
                        endX: sortedPlaces[i + 1].axisX,
                        endY: sortedPlaces[i + 1].axisY,
                        reqCoordType: "WGS84GEO",
                        resCoordType: "WGS84GEO",
                        startName: "출발지",
                        endName: "도착지",
                    }, { headers });

                    allRouteData.push(...response.data.features);
                }

                drawPedestrianRoute(allRouteData);
            } catch (error) {
                console.error("Error on pedestrian route planning", error);
            }
        }
    };

    const [routePolyline, setRoutePolyline] = useState(null);

    // 도보 경로 그리기
    const drawPedestrianRoute = (routeData) => {
        console.log("drawPedestrianRoute()");
        // console.log("routeData: ", JSON.stringify(routeData, null, 2));
        console.log(routePolyline);
        if (routePolyline) {
            routePolyline.setMap(null);
        }

        const linePath = [];
        routeData.map((feature, index) => {

            if(feature.geometry.type==="Point") {
                const lon = feature.geometry.coordinates[0];
                const lat = feature.geometry.coordinates[1];
                // console.log("lat, lon : ", lat, lon);
                linePath.push(new window.Tmapv3.LatLng(lat, lon));
            }
        });

        const newPolyline = new window.Tmapv3.Polyline({
            path: linePath,
            strokeColor: "#FF8058",
            strokeOpacity: 1,
            strokeWeight: 5,
            map: mapRef.current,
            // direction: true
        });

        setRoutePolyline(newPolyline);
    };

    return (
        // <div>
        //     <div id="map_div" style={{width: "100%", height: "400px"}}/>
        //     <button onClick={toCenter}>지도 중앙으로</button>
        //     <button onClick={getPedestrianRoute}>경로 요청 실행</button>
        // </div>

        <div style={{position: 'relative', width: '100%', height: '100vh'}}>
            <div id="map_div" style={{width: '100%', height: '100%'}}/>
            <img
                src="/Frame1261154356.png" // '지도 중앙으로' 버튼 이미지 경로
                onClick={toCenter}
                style={{
                    position: 'absolute',
                    bottom: '500px',
                    left: '1%',
                    zIndex: 1000,
                    cursor: 'pointer' // 마우스 오버 시 포인터 모양 변경
                }}
                alt="지도 중앙으로"
            />
            <div onClick={getPedestrianRoute} style = {{ position : 'absolute', left : '320px' , top : '585px', display:'flex', width:'50px', height: '150px', zIndex :'300'}}/>
        </div>
    );
}

export default RouteWalk;
