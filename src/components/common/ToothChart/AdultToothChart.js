import AdultToothData from "./AdultToothData.js"

import ToothAside from "./Tooth/ToothAside.js";
import ToothAbove from "./Tooth/ToothAbove.js";

const AdultToothChart = function (props) {


  return (
    <span id="Adult-Tooth-Chart">
      <div className="toothChartContainer">
        <div className="adultToothChart--upperJaw">
          {AdultToothData.toothAsideList.upperJaw.map((tooth, index) => {
            return (
              <ToothAside
                key={index}
                id={tooth.id}
                callback={props.callback}
                svgString={tooth.svgString}
              ></ToothAside>
            );
          })}
        </div>
        <div className="adultToothChart--lowerJaw"></div>
        {AdultToothData.toothAsideList.lowerJaw.reverse().map((tooth, index) => {
          return (
            <ToothAside
              key={index}
              id={tooth.id}
              callback={props.callback}
              svgString={tooth.svgString}
            ></ToothAside>
          );
        })}
      </div>
    </span>
  );
};

export default AdultToothChart;
