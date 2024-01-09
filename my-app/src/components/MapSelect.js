import TimeIcon from "../assets/icon_timer.png"
import LoveIcon from "../assets/icon_heart.png"

const MapSelect = () => {
    return (
      <div id = "map-select-card">
        <div>
            <div id="map-select-card-text" style={{position : 'relative', top : '16px', left : '18px'}}>커피향이 솔솔나는 카페거리</div>
        </div>
        <div style={{display :'flex', alignItems: 'center'  }}>
            <div style={{display :'flex', alignItems: 'center' , position : 'relative', left : '18px' , top : '18px' }}>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">벚꽃 명소</div>
                </div>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">평지</div>
                </div>
                <div id="map-select-card-background">
                    <div id="map-select-card-theme-text">고요한</div>
                </div>
            </div>
            <div style = {{display :'flex', alignItems: 'center', position : 'relative', left : '44px' , top : '18px'}}>
                <img src={TimeIcon} style={{ width : '18px', height: '18px'}}/>
                <div id="map-select-card-small-text" style={{position : 'relative', left : '2px'}}>15분</div>
            </div>
            <div style = {{display :'flex', alignItems: 'center', position : 'relative', left : '54px' , top : '18px' }}>
                <img src={LoveIcon} style={{width : '18px', height: '18px'}}/>
                <div id="map-select-card-small-text" style={{position : 'relative', left : '2px'}}>3개</div>
            </div>
        </div>
        <div id="map-select-card-button" style = {{position : 'relative', left : '166px' , top : '45px', display:'flex', justifyContent :'center', alignItems :'center'}}>
            <div id="map-select-card-button-text">산책하러 가기</div>
        </div>
      </div>
    );
  };
    
export default MapSelect;