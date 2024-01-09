import { useNavigate } from "react-router-dom";
import MapBackground from "../components/MapBackground";
import Tmap from "../components/Tmap";
import ExitButton from "../components/MapExitButton";
import MapSelect from "../components/MapSelect";

const Map = () => {
  const navigate = useNavigate();
  const curPos = "양재동";
  return (
    <div>
        <MapBackground/>
        <Tmap/>
        <div style = {{position : 'absolute', top : '50px', left : '20px'}}>
            <div id ="map-curposintro-text">지금 위치한 지역은</div>
        </div>
        <div style = {{position : 'absolute', top : '73px', left : '20px'}}>
            <div id ="map-curpos-text">{curPos}</div>
        </div>
        <div style = {{position : 'absolute', top : '50px', left : '300px'}}>
            <ExitButton/>
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '-280px'}}>
            <MapSelect />
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '32px'}}>
            <MapSelect />
        </div>
        <div style = {{position : 'absolute', top : '620px', left : '344px'}}>
            <MapSelect />
        </div>
    </div>
  );
};
  
  export default Map;