import React, {useEffect, useRef, useState} from 'react';
// import places from '../data/places';
import axios from "axios";
function RouteWalk() {
    const mapRef = useRef(null);
    const meRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState([]);

    const [places, setPlaces] = useState([]);

    const initialLocation = {
        "x": 37.484498,
        "y": 127.035068
    };

    // 현재 위치를 서버로 보내는 함수
    const sendCurrentLocationToServer = async (location) => {
        try {
            console.log(location);
            // const response = await axios.post('/find', {
            //     axisX: location._lat,
            //     axisY: location._lng
            // });
            const response = await axios.get('/find', {
                params: {
                    meter: 50,
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
        console.log("places updated: ", places);
        places.map((place) => {
            let iconPath = "";
            let iconSize = 0;
            let zidx = 0;

            const distance = calculateDistance(currentLocation, place);

            if (place.size===1) {
                iconPath = `
                  <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 48px; /* 아이콘 너비 */
                    height: 89.93523px; /* 아이콘 높이 */
                    flex-shrink: 0;
                    background-image: url('/icon_pin_medium.png'); /* 마커 이미지 */
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
                      ${Math.round(distance * 1000)} m
                    </div>
                  </div>
                `;

                iconSize = new window.Tmapv3.Size(48, 89.93523);
                zidx = 1003;
            } else if (place.size === 2) {
                iconPath = `
                    <div style="
                        width: 28px; /* 기본 아이콘 너비 */
                        height: 40px; /* 기본 아이콘 높이 */
                        background-image: url('/icon_pin_regular.png'); /* 기본 마커 이미지 */
                        background-size: cover; /* 이미지가 div를 꽉 채우도록 */
                        ">
                    </div>
                `;
                iconSize = new window.Tmapv3.Size(28, 40);
                zidx = 1002;
            } else if (place.size === 3) {
                iconPath = `
                    <div style="
                        width: 24px; /* 기본 아이콘 너비 */
                        height: 24px; /* 기본 아이콘 높이 */
                        background-image: url('/deact_coffe.png'); /* 기본 마커 이미지 */
                        background-size: cover; /* 이미지가 div를 꽉 채우도록 */
                        ">
                    </div>
                `;
                iconSize = new window.Tmapv3.Size(24, 24);
                zidx = 1001;
            }

            const marker = new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(place.axisY, place.axisX),
                iconHTML: iconPath,
                iconSize: iconSize,
                zIndex: zidx,
                map: mapRef.current,
            });

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

            // 초기 위치에 마커 생성
            setCurrentLocation(new window.Tmapv3.LatLng(initialLocation.x, initialLocation.y));
            new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(initialLocation.x, initialLocation.y),
                icon: "/Ellipse304.png",
                map: map,
            });

            // 현재 위치를 서버로 보내기
            sendCurrentLocationToServer(new window.Tmapv3.LatLng(initialLocation.y, initialLocation.x));
            
        }
        
        // // 현재 위치 가져오기
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         const loc = new window.Tmapv3.LatLng(position.coords.latitude, position.coords.longitude);
        //         setCurrentLocation(loc);
        //
        //         // 현재 위치에 마커 생성
        //         if (!meRef.current) {
        //             meRef.current = new window.Tmapv3.Marker({
        //                 position: loc,
        //                 icon: "/Ellipse304.png",
        //                 map: mapRef.current
        //             });
        //         }
        //
        //         // 지도 중심을 현재 위치로 이동
        //         mapRef.current.setCenter(loc);
        //
        //         // 현재 위치를 서버로 보내기
        //         sendCurrentLocationToServer(loc);
        //     }, error => {
        //         console.error("Geolocation error: " + error.message);
        //     }, {
        //         enableHighAccuracy: false,
        //         timeout: 10000,
        //         maximumAge: 60000
        //     });
        // } else {
        //     console.error("Geolocation is not supported by this browser.");
        // }
    }, []);


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

    // 도보 경로 요청
    const getPedestrianRoute = async () => {
        if (currentLocation && mapRef.current) {
            // 랜덤 3개 수집
            const selectedPlaces = selectRandomPlaces(places, 3);

            // places 배열을 거리에 따라 정렬
            const sortedPlaces = selectedPlaces.sort((a, b) => {
                return calculateDistance(currentLocation, a) - calculateDistance(currentLocation, b);
            });

            selectedPlaces.unshift({
                axisX: currentLocation._lng,
                axisY: currentLocation._lat
            })

            console.log("selectedPlaces", selectedPlaces);

            const headers = {
                appKey: process.env.REACT_APP_API_KEY // 여기에 발급받은 Appkey 입력
            };

            //console.log(process.env.REACT_APP_API_KEY);

            try {
                const allRouteData = [];
                for (let i = 0; i < selectedPlaces.length - 1; i++) {
                    const response = await axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result", {
                        startX: selectedPlaces[i].axisX,
                        startY: selectedPlaces[i].axisY,
                        endX: selectedPlaces[i + 1].axisX,
                        endY: selectedPlaces[i + 1].axisY,
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

        if (routePolyline) {
            routePolyline.setMap(null);
        }

        const linePath = [];
        routeData.map((feature, index) => {

            if(feature.geometry.type==="Point") {
                const lon = feature.geometry.coordinates[0];
                const lat = feature.geometry.coordinates[1];
                console.log("lat, lon : ", lat, lon);
                linePath.push(new window.Tmapv3.LatLng(lat, lon));
            }
        });

        const newPolyline = new window.Tmapv3.Polyline({
            path: linePath,
            strokeColor: "#FF8058",
            strokeWeight: 6,
            map: mapRef.current
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
