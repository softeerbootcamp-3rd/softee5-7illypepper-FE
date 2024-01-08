import React, {useEffect, useRef, useState} from 'react';
// import places from '../data/places';
import axios from "axios";
function RouteWalk() {
    const mapRef = useRef(null);
    const meRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState([]);

    const [places, setPlaces] = useState([]);

    // 현재 위치를 서버로 보내는 함수
    const sendCurrentLocationToServer = async (location) => {
        try {
            console.log(location);
            const response = await axios.post('/find', {
                axisX: location._lat,
                axisY: location._lng
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
            new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(place.axisY, place.axisX),
                icon: "/pin.png",
                iconSize: new window.Tmapv3.Size(42, 73),
                map: mapRef.current
            });
        });
    }, [places]);

    useEffect(() => {
        // 지도 초기화
        if (!mapRef.current) {
            const map = new window.Tmapv3.Map("map_div", {
                center: new window.Tmapv3.LatLng(37.4860034618704, 127.03449720489127),
                width: "360px",
                height: "800px",
                zoom: 14
            });
            mapRef.current = map;

            // 초기 위치에 마커 생성
            setCurrentLocation(new window.Tmapv3.LatLng(37.4860034618704, 127.03449720489127));
            new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(37.4860034618704, 127.03449720489127),
                icon: "/Ellipse304.png",
                map: map
            });

            // 현재 위치를 서버로 보내기
            sendCurrentLocationToServer(new window.Tmapv3.LatLng(127.03449720489127, 37.4860034618704));
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

    // 도보 경로 요청
    const getPedestrianRoute = async () => {
        if (currentLocation && mapRef.current) {
            const selectedPlaces = selectRandomPlaces(places, 3);

            selectedPlaces.unshift({
                axisX: currentLocation._lng,
                axisY: currentLocation._lat
            })

            console.log("selectedPlaces", selectedPlaces);

            const headers = {
                appKey: process.env.REACT_APP_API_KEY // 여기에 발급받은 Appkey 입력
            };

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
                    bottom: '30px',
                    left: '5%',
                    zIndex: 1000,
                    cursor: 'pointer' // 마우스 오버 시 포인터 모양 변경
                }}
                alt="지도 중앙으로"
            />
            <img
                src="/Frame3020.png" // '경로 요청 실행' 버튼 이미지 경로
                onClick={getPedestrianRoute}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)', // 가로 중앙 정확히 맞추기 위해
                    zIndex: 1000,
                    cursor: 'pointer'
                }}
                alt="경로 요청 실행"
            />
        </div>
    );
}

export default RouteWalk;
