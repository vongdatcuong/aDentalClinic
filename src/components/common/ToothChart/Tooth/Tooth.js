import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import styles from "./jss";
import Typography from "@material-ui/core/Typography";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const useStyles = makeStyles(styles);

const Tooth = function (props) {
  const classes = useStyles();
  const { id, svgString, jaw, viewType,isSelectedTooth, toothCondition, toothNote, toothSelectedSurfaces, ...other } = props;
  //const [isSelected, setIsSelected] = useState(false);
  const toothNumber = parseInt(id.replace("Tooth",""));
  let selectedFullTooth, facial, lingual, mesial, distal, top, root = false;
  if (viewType === "add-treatment" && toothSelectedSurfaces !== null) {
      facial = toothSelectedSurfaces.facial;
      lingual = toothSelectedSurfaces.lingual;
      mesial = toothSelectedSurfaces.mesial;
      distal = toothSelectedSurfaces.distal;
      top = toothSelectedSurfaces.top;
      root = toothSelectedSurfaces.root;
      selectedFullTooth = toothSelectedSurfaces.isSelected && !(facial || lingual || mesial || distal || top || root);
  }

  function handlePickToothOverview() {}

  function handlePickToothQuickselect() {
    //setIsSelected(!isSelected);
  }

  function clickTooth() {
    // if (isSelectedTooth) {
    //   props.onDeselectTooth(id);
    // } else {
    //   props.onSelectTooth(id);
    // }
    props.onSelectTooth(id);
    if (viewType === "overview") {
      handlePickToothOverview();
    } else if (viewType === "quickselect") {
      handlePickToothQuickselect();
    }
  }

  return (
    <React.Fragment>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{id}</Typography>
            {/* <em>{"And here's"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
            {"It's very engaging. Right?"} */}
            <div className="note" dangerouslySetInnerHTML={{__html: toothNote}}></div>
          </React.Fragment>
        }
        aria-label={id}
      >
        <span
          className={clsx(
            jaw === "upperJaw"
              ? classes.upperJawTooth
              : jaw === "lowerJaw"
              ? classes.lowerJawTooth
              : "",
              
              )
          }
        >
          <span
            id={id}
            onClick={() => clickTooth()}
            className={clsx(
              classes.toothContainer,
              isSelectedTooth ? classes.selectedTooth : classes.unSelectedTooth,
              toothCondition === "MISSING" ? classes.missingTooth : 
              toothCondition === "VENEER" ? classes.veneerTooth : 
              toothCondition === "PONTICS" ? classes.ponticsTooth : 
              toothCondition === "CROWN" ? classes.crownTooth : 
              toothCondition === "ENDOTESTS" ? classes.endotestsTooth : 
              classes.normalTooth,
              
              // display surface for treatment
              selectedFullTooth ? classes.selectedFullTooth : "",
              facial ? classes.facial : "",
              lingual ? classes.lingual : "",
              mesial ? (toothNumber <= 8 || toothNumber >= 25 ? classes.leftMesial : classes.rightMesial) : "",
              distal ? (toothNumber <= 8 || toothNumber >= 25 ? classes.leftDistal : classes.rightDistal) : "",
              top ? classes.top : "",
              root ? classes.root : "",
            )}
          >
            {svgString}
            {(viewType === "quickselect" || viewType === "add-treatment") ? (
              <CheckCircleIcon></CheckCircleIcon>
            ) : (
              ""
            )}
            <svg height="20" width="20" className="conditionLayer">
            </svg> 
            <svg height="20" width="20" className="maskLayer">
            </svg> 
            <svg height="20" width="20" className="surfaceFull">
            </svg> 
            <svg height="20" width="20" className="surfaceFacial">
            </svg> 
            <svg height="20" width="20" className="surfaceLingual">
            </svg> 
            <svg height="20" width="20" className="surfaceMesial">
            </svg> 
            <svg height="20" width="20" className="surfaceDistal">
            </svg> 
            <svg height="20" width="20" className="surfaceTop">
            </svg> 
            <svg height="20" width="20" className="surfaceRoot">
            </svg> 
          </span>
        </span>
      </HtmlTooltip>
    </React.Fragment>
  );
};
Tooth.propTypes = {
  svgString: PropTypes.node,
  id: PropTypes.string,
};

export default Tooth;
