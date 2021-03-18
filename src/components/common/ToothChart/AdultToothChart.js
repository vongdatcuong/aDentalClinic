import AdultToothData from "./AdultToothData.js"

import ToothAside from "./Tooth/ToothAside.js";
import ToothAbove from "./Tooth/ToothAbove.js";
import Tooth from "./Tooth/Tooth.js";

const AdultToothChart = function (props) {


  return (
    <span id="Adult-Tooth-Chart">
      <div className="toothChartContainer">
        <div className="adultToothChart--upperJaw">
          {AdultToothData.adultToothList.upperJaw.slice().map((tooth, index) => {
            return (
              <Tooth
                viewType={props.viewType}
                key={index}
                id={tooth.fullTooth.id}
                onClickTooth={props.onClickTooth}
                svgString={tooth.fullTooth.svgString}
              ></Tooth>
            );
          })}
        </div>
        <br></br>
        <div className="adultToothChart--lowerJaw"></div>
        {AdultToothData.adultToothList.lowerJaw.slice().reverse().map((tooth, index) => {
          return (
            <Tooth
              viewType={props.viewType}
              key={index}
              id={tooth.fullTooth.id}
              onClickTooth={props.onClickTooth}
              svgString={tooth.fullTooth.svgString}
            ></Tooth>
          );
        })}
      </div>
    </span>
  );
};

export default AdultToothChart;
