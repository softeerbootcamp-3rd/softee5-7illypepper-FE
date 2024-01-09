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
            let iconPath = "";
            let iconSize = 0;
            let markerLabel = "";

            const distance = calculateDistance(currentLocation, place);

            if (place.size) {
                iconPath = "/icon_pin_medium.png";
                iconSize = new window.Tmapv3.Size(42, 73);
                markerLabel = `<span style='background-color: #46414E;color:white'>${distance.toFixed(2)*1000} m</span>`;
            } else {
                iconPath = "/icon_pin_regular.png";
                iconSize = new window.Tmapv3.Size(28, 40);
            }

            new window.Tmapv3.Marker({
                position: new window.Tmapv3.LatLng(place.axisY, place.axisX),
                icon: iconPath,
                iconSize: iconSize,
                map: mapRef.current,
                label: markerLabel
            });
        });

        getPedestrianRoute();
    }, [places]);

    useEffect(() => {
        // 지도 초기화
        if (!mapRef.current) {
            const map = new window.Tmapv3.Map("map_div", {
                center: new window.Tmapv3.LatLng(37.4860034618704, 127.03449720489127),
                width: "360px",
                height: "800px",
                zoom: 15.5
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
