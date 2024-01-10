import React, {useEffect, useRef, useState} from 'react';
import places from '../data/places';

function Tmap() {
    const mapRef = useRef(null);
    const meRef = useRef(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // 지도 초기화
        if (!mapRef.current) {
            const map = new window.Tmapv3.Map("map_div", {
                center: new window.Tmapv3.LatLng(places[0].latitude, places[0].longitude),
                width: "360px",
                height: "800px",
                zoom: 14
            });
            mapRef.current = map;

            places.forEach(place => {
                new window.Tmapv3.Marker({
                    position: new window.Tmapv3.LatLng(place.latitude, place.longitude),
                    icon: "/pin_park_big.png",
                    iconSize: new window.Tmapv3.Size(42, 73),
                    map: map
                });
            });
        }

        // // 현재 위치 가져오기
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         const loc = new window.Tmapv3.LatLng(position.coords.latitude, position.coords.longitude);
        //         setCurrentLocation(loc);

        //         // 현재 위치에 마커 생성
        //         if (!meRef.current) {
        //             meRef.current = new window.Tmapv3.Marker({
        //                 position: loc,
        //                 icon: "/Ellipse 304.png",
        //                 map: mapRef.current
        //             });
        //         }

        //         // 지도 중심을 현재 위치로 이동
        //         mapRef.current.setCenter(loc);
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

    // 경로 요청
    // const getRoutePlan = () => {
    //     if (currentLocation && mapRef.current) {
    //         const s_latlng = currentLocation;
    //         const e_latlng = new window.Tmapv3.LatLng(places[0].latitude, places[0].longitude); // 첫 번째 장소로 경로 계산

    //         const optionObj = {
    //             reqCoordType: "WGS84GEO",
    //             resCoordType: "WGS84GEO",
    //             trafficInfo: "Y"
    //         };

    //         const tData = new window.Tmapv3.extension.TData();
    //         tData.getRoutePlanJson(s_latlng, e_latlng, optionObj, {
    //             onComplete: onComplete,
    //             onProgress: () => {},
    //             onError: () => { alert("Error on route planning"); }
    //         });
    //     }
    // };

    // // 경로 안내 완료 콜백
    // const onComplete = (responseData) => {
    //     // 경로 그리기
    //     const jsonObject = new window.Tmapv3.extension.GeoJSON();
    //     const jsonForm = jsonObject.rpTrafficRead(responseData._responseData);
    //     console.log("responseData._responseData: ", JSON.stringify(responseData._responseData));

    //     jsonObject.drawRouteByTraffic(mapRef.current, jsonForm, {
    //         trafficDefaultColor: "#000000",
    //         trafficType1Color: "#009900",
    //         trafficType2Color: "#7A8E0A",
    //         trafficType3Color: "#8E8111",
    //         trafficType4Color: "#FF0000"
    //     });
    // };

    return (
        <div>
            <div id="map_div" style={{width: "100%", height: "400px"}}/>
            {/* <button onClick={getRoutePlan}>경로 요청 실행</button> */}
        </div>
    );
}

export default Tmap;
