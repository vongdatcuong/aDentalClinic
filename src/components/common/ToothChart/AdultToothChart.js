import AdultToothData from "./AdultToothData.js"

import ToothAside from "./Tooth/ToothAside.js";
import ToothAbove from "./Tooth/ToothAbove.js";

const AdultToothChart = function (props) {


  return (
    <span id="Adult-Tooth-Chart">
      <div className="toothChartContainer">
        <div className="adultToothChart--upperJaw">
          {AdultToothData.adultToothList.upperJaw.map((tooth, index) => {
            return (
              <ToothAside
                key={index}
                id={tooth.fullTooth.id}
                callback={props.callback}
                svgString={tooth.fullTooth.svgString}
              ></ToothAside>
            );
          })}
        </div>
        <div className="adultToothChart--lowerJaw"></div>
        {AdultToothData.adultToothList.lowerJaw.reverse().map((tooth, index) => {
          return (
            <ToothAside
              key={index}
              id={tooth.fullTooth.id}
              callback={props.callback}
              svgString={tooth.fullTooth.svgString}
            ></ToothAside>
          );
        })}
      </div>
    </span>
  );
};

export default AdultToothChart;
