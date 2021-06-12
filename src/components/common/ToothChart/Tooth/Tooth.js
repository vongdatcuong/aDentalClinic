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
const ToothText = (id) => {
  return id.replace("Tooth", "Tooth ");
}
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
            <Typography color="inherit">{ToothText(id)}</Typography>
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
            <svg height="20" width="20" className="surfaceTop">
            </svg> 
            <svg height="20" width="20" className="surfaceRoot">
            </svg> 
            {toothNumber <= 8 && (<span>
            <svg stroke-width="7" className="surfaceFacial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>bottom_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M218.72,0a194.24,194.24,0,0,1-52.48,21.93,227,227,0,0,1-56.88,7.23A226.08,226.08,0,0,1,52.47,22c-2.32-.59-4.6-1.33-6.89-2S41,18.66,38.73,17.93c-4.5-1.58-9-3.28-13.39-5C21,11,16.66,9.05,12.39,7Q6.09,3.65,0,0,7,1.4,13.79,3.07C18.4,4,23,4.93,27.48,5.9c4.58.78,9.12,1.62,13.64,2.47,4.58.64,9.11,1.37,13.64,2.06a405.27,405.27,0,0,0,54.6,3.74A401.93,401.93,0,0,0,164,10.4c2.26-.36,4.54-.66,6.81-1s4.57-.63,6.82-1.07,4.54-.83,6.82-1.21l3.43-.57c1.14-.2,2.26-.49,3.4-.71l6.83-1.39,3.44-.66L204.91,3c2.27-.54,4.56-1,6.86-1.54l3.48-.71C216.4.5,217.55.23,218.72,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceLingual" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>top_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M0,29.16A194.74,194.74,0,0,1,52.48,7.23a228.32,228.32,0,0,1,113.77-.06c2.32.59,4.6,1.32,6.89,2s4.57,1.35,6.85,2.07c4.5,1.59,9,3.29,13.39,5,4.36,1.93,8.68,3.9,13,5.95q6.3,3.35,12.39,7c-4.67-.92-9.26-1.95-13.79-3.06-4.62-.88-9.16-1.86-13.69-2.83-4.58-.79-9.12-1.63-13.65-2.48-4.57-.64-9.1-1.37-13.63-2.05a399.29,399.29,0,0,0-109.19,0c-2.26.37-4.54.67-6.81,1s-4.57.63-6.82,1.07-4.54.83-6.82,1.21l-3.43.57c-1.14.19-2.26.49-3.4.7L20.66,24.7l-3.44.67-3.41.78C11.54,26.69,9.25,27.2,7,27.7l-3.48.71C2.32,28.67,1.16,28.93,0,29.16Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceDistal" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>left_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M31.47,0c-1.11,4.94-2.34,9.78-3.62,14.57-1,4.89-2.21,9.69-3.31,14.49L21.66,43.54C20.93,48.4,20,53.2,19.28,58a391.31,391.31,0,0,0,.11,116.17c.39,2.4.73,4.83,1.09,7.25l.27,1.82.35,1.8.69,3.61,1.34,7.24c.19,1.23.46,2.42.74,3.62l.81,3.6,1.55,7.26c.49,2.44,1.21,4.8,1.76,7.23s1.17,4.84,1.74,7.28,1.22,4.88,1.74,7.35c-1.33-2.15-2.6-4.31-3.85-6.5s-2.38-4.43-3.54-6.67l-1.74-3.37c-.57-1.12-1.17-2.24-1.66-3.4l-3-6.95-1.48-3.5c-.5-1.17-1-2.34-1.4-3.53l-2.52-7.17c-1.77-4.77-3.07-9.67-4.41-14.58A238.19,238.19,0,0,1,7.77,55.64c.27-1.24.65-2.45,1-3.67l1.11-3.64c.74-2.43,1.48-4.86,2.26-7.27,1.67-4.79,3.55-9.5,5.38-14.21,2.05-4.63,4.21-9.2,6.4-13.73C26.34,8.67,28.87,4.29,31.47,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceMesial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>right_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M0,232.26c1.11-4.94,2.34-9.78,3.62-14.57,1-4.89,2.21-9.69,3.31-14.5L9.8,188.72c.74-4.86,1.66-9.66,2.39-14.49a392.22,392.22,0,0,0,4.28-58.09,394.86,394.86,0,0,0-4.39-58.08c-.39-2.41-.73-4.83-1.09-7.25L10.72,49l-.35-1.8-.69-3.61L8.34,36.33c-.19-1.22-.46-2.41-.74-3.61l-.81-3.6L5.24,21.86c-.49-2.44-1.21-4.8-1.76-7.23S2.31,9.79,1.74,7.34.52,2.47,0,0C1.33,2.14,2.6,4.31,3.84,6.5s2.39,4.43,3.55,6.67l1.74,3.36c.57,1.13,1.17,2.25,1.66,3.41l3,7,1.48,3.5c.5,1.17,1,2.34,1.39,3.53l2.53,7.17c1.77,4.77,3.07,9.67,4.41,14.57a236.52,236.52,0,0,1,7.84,60.47,237.44,237.44,0,0,1-7.77,60.49c-.27,1.23-.65,2.45-1,3.67l-1.11,3.64c-.74,2.43-1.48,4.86-2.26,7.27-1.67,4.79-3.55,9.5-5.38,14.21-2.05,4.63-4.21,9.2-6.4,13.73C5.12,223.59,2.6,228,0,232.26Z"/></g></g></svg>
            </span>)}
            {toothNumber >= 9 && toothNumber <= 16 && (<span>
            <svg stroke-width="7" className="surfaceFacial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>bottom_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M218.72,0a194.24,194.24,0,0,1-52.48,21.93,227,227,0,0,1-56.88,7.23A226.08,226.08,0,0,1,52.47,22c-2.32-.59-4.6-1.33-6.89-2S41,18.66,38.73,17.93c-4.5-1.58-9-3.28-13.39-5C21,11,16.66,9.05,12.39,7Q6.09,3.65,0,0,7,1.4,13.79,3.07C18.4,4,23,4.93,27.48,5.9c4.58.78,9.12,1.62,13.64,2.47,4.58.64,9.11,1.37,13.64,2.06a405.27,405.27,0,0,0,54.6,3.74A401.93,401.93,0,0,0,164,10.4c2.26-.36,4.54-.66,6.81-1s4.57-.63,6.82-1.07,4.54-.83,6.82-1.21l3.43-.57c1.14-.2,2.26-.49,3.4-.71l6.83-1.39,3.44-.66L204.91,3c2.27-.54,4.56-1,6.86-1.54l3.48-.71C216.4.5,217.55.23,218.72,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceLingual" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>top_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M0,29.16A194.74,194.74,0,0,1,52.48,7.23a228.32,228.32,0,0,1,113.77-.06c2.32.59,4.6,1.32,6.89,2s4.57,1.35,6.85,2.07c4.5,1.59,9,3.29,13.39,5,4.36,1.93,8.68,3.9,13,5.95q6.3,3.35,12.39,7c-4.67-.92-9.26-1.95-13.79-3.06-4.62-.88-9.16-1.86-13.69-2.83-4.58-.79-9.12-1.63-13.65-2.48-4.57-.64-9.1-1.37-13.63-2.05a399.29,399.29,0,0,0-109.19,0c-2.26.37-4.54.67-6.81,1s-4.57.63-6.82,1.07-4.54.83-6.82,1.21l-3.43.57c-1.14.19-2.26.49-3.4.7L20.66,24.7l-3.44.67-3.41.78C11.54,26.69,9.25,27.2,7,27.7l-3.48.71C2.32,28.67,1.16,28.93,0,29.16Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceMesial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>left_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M31.47,0c-1.11,4.94-2.34,9.78-3.62,14.57-1,4.89-2.21,9.69-3.31,14.49L21.66,43.54C20.93,48.4,20,53.2,19.28,58a391.31,391.31,0,0,0,.11,116.17c.39,2.4.73,4.83,1.09,7.25l.27,1.82.35,1.8.69,3.61,1.34,7.24c.19,1.23.46,2.42.74,3.62l.81,3.6,1.55,7.26c.49,2.44,1.21,4.8,1.76,7.23s1.17,4.84,1.74,7.28,1.22,4.88,1.74,7.35c-1.33-2.15-2.6-4.31-3.85-6.5s-2.38-4.43-3.54-6.67l-1.74-3.37c-.57-1.12-1.17-2.24-1.66-3.4l-3-6.95-1.48-3.5c-.5-1.17-1-2.34-1.4-3.53l-2.52-7.17c-1.77-4.77-3.07-9.67-4.41-14.58A238.19,238.19,0,0,1,7.77,55.64c.27-1.24.65-2.45,1-3.67l1.11-3.64c.74-2.43,1.48-4.86,2.26-7.27,1.67-4.79,3.55-9.5,5.38-14.21,2.05-4.63,4.21-9.2,6.4-13.73C26.34,8.67,28.87,4.29,31.47,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceDistal" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>right_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M0,232.26c1.11-4.94,2.34-9.78,3.62-14.57,1-4.89,2.21-9.69,3.31-14.5L9.8,188.72c.74-4.86,1.66-9.66,2.39-14.49a392.22,392.22,0,0,0,4.28-58.09,394.86,394.86,0,0,0-4.39-58.08c-.39-2.41-.73-4.83-1.09-7.25L10.72,49l-.35-1.8-.69-3.61L8.34,36.33c-.19-1.22-.46-2.41-.74-3.61l-.81-3.6L5.24,21.86c-.49-2.44-1.21-4.8-1.76-7.23S2.31,9.79,1.74,7.34.52,2.47,0,0C1.33,2.14,2.6,4.31,3.84,6.5s2.39,4.43,3.55,6.67l1.74,3.36c.57,1.13,1.17,2.25,1.66,3.41l3,7,1.48,3.5c.5,1.17,1,2.34,1.39,3.53l2.53,7.17c1.77,4.77,3.07,9.67,4.41,14.57a236.52,236.52,0,0,1,7.84,60.47,237.44,237.44,0,0,1-7.77,60.49c-.27,1.23-.65,2.45-1,3.67l-1.11,3.64c-.74,2.43-1.48,4.86-2.26,7.27-1.67,4.79-3.55,9.5-5.38,14.21-2.05,4.63-4.21,9.2-6.4,13.73C5.12,223.59,2.6,228,0,232.26Z"/></g></g></svg>
            </span>)}
            {toothNumber >= 25 && (<span>
            <svg stroke-width="7" className="surfaceFacial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>bottom_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M0,29.16A194.74,194.74,0,0,1,52.48,7.23a228.32,228.32,0,0,1,113.77-.06c2.32.59,4.6,1.32,6.89,2s4.57,1.35,6.85,2.07c4.5,1.59,9,3.29,13.39,5,4.36,1.93,8.68,3.9,13,5.95q6.3,3.35,12.39,7c-4.67-.92-9.26-1.95-13.79-3.06-4.62-.88-9.16-1.86-13.69-2.83-4.58-.79-9.12-1.63-13.65-2.48-4.57-.64-9.1-1.37-13.63-2.05a399.29,399.29,0,0,0-109.19,0c-2.26.37-4.54.67-6.81,1s-4.57.63-6.82,1.07-4.54.83-6.82,1.21l-3.43.57c-1.14.19-2.26.49-3.4.7L20.66,24.7l-3.44.67-3.41.78C11.54,26.69,9.25,27.2,7,27.7l-3.48.71C2.32,28.67,1.16,28.93,0,29.16Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceLingual" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>top_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M218.72,0a194.24,194.24,0,0,1-52.48,21.93,227,227,0,0,1-56.88,7.23A226.08,226.08,0,0,1,52.47,22c-2.32-.59-4.6-1.33-6.89-2S41,18.66,38.73,17.93c-4.5-1.58-9-3.28-13.39-5C21,11,16.66,9.05,12.39,7Q6.09,3.65,0,0,7,1.4,13.79,3.07C18.4,4,23,4.93,27.48,5.9c4.58.78,9.12,1.62,13.64,2.47,4.58.64,9.11,1.37,13.64,2.06a405.27,405.27,0,0,0,54.6,3.74A401.93,401.93,0,0,0,164,10.4c2.26-.36,4.54-.66,6.81-1s4.57-.63,6.82-1.07,4.54-.83,6.82-1.21l3.43-.57c1.14-.2,2.26-.49,3.4-.71l6.83-1.39,3.44-.66L204.91,3c2.27-.54,4.56-1,6.86-1.54l3.48-.71C216.4.5,217.55.23,218.72,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceDistal" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>left_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M31.47,0c-1.11,4.94-2.34,9.78-3.62,14.57-1,4.89-2.21,9.69-3.31,14.49L21.66,43.54C20.93,48.4,20,53.2,19.28,58a391.31,391.31,0,0,0,.11,116.17c.39,2.4.73,4.83,1.09,7.25l.27,1.82.35,1.8.69,3.61,1.34,7.24c.19,1.23.46,2.42.74,3.62l.81,3.6,1.55,7.26c.49,2.44,1.21,4.8,1.76,7.23s1.17,4.84,1.74,7.28,1.22,4.88,1.74,7.35c-1.33-2.15-2.6-4.31-3.85-6.5s-2.38-4.43-3.54-6.67l-1.74-3.37c-.57-1.12-1.17-2.24-1.66-3.4l-3-6.95-1.48-3.5c-.5-1.17-1-2.34-1.4-3.53l-2.52-7.17c-1.77-4.77-3.07-9.67-4.41-14.58A238.19,238.19,0,0,1,7.77,55.64c.27-1.24.65-2.45,1-3.67l1.11-3.64c.74-2.43,1.48-4.86,2.26-7.27,1.67-4.79,3.55-9.5,5.38-14.21,2.05-4.63,4.21-9.2,6.4-13.73C26.34,8.67,28.87,4.29,31.47,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceMesial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>right_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M0,232.26c1.11-4.94,2.34-9.78,3.62-14.57,1-4.89,2.21-9.69,3.31-14.5L9.8,188.72c.74-4.86,1.66-9.66,2.39-14.49a392.22,392.22,0,0,0,4.28-58.09,394.86,394.86,0,0,0-4.39-58.08c-.39-2.41-.73-4.83-1.09-7.25L10.72,49l-.35-1.8-.69-3.61L8.34,36.33c-.19-1.22-.46-2.41-.74-3.61l-.81-3.6L5.24,21.86c-.49-2.44-1.21-4.8-1.76-7.23S2.31,9.79,1.74,7.34.52,2.47,0,0C1.33,2.14,2.6,4.31,3.84,6.5s2.39,4.43,3.55,6.67l1.74,3.36c.57,1.13,1.17,2.25,1.66,3.41l3,7,1.48,3.5c.5,1.17,1,2.34,1.39,3.53l2.53,7.17c1.77,4.77,3.07,9.67,4.41,14.57a236.52,236.52,0,0,1,7.84,60.47,237.44,237.44,0,0,1-7.77,60.49c-.27,1.23-.65,2.45-1,3.67l-1.11,3.64c-.74,2.43-1.48,4.86-2.26,7.27-1.67,4.79-3.55,9.5-5.38,14.21-2.05,4.63-4.21,9.2-6.4,13.73C5.12,223.59,2.6,228,0,232.26Z"/></g></g></svg>
            </span>)}
            {toothNumber >= 17 && toothNumber <= 24 && (<span>
            <svg stroke-width="7" className="surfaceFacial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>bottom_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M0,29.16A194.74,194.74,0,0,1,52.48,7.23a228.32,228.32,0,0,1,113.77-.06c2.32.59,4.6,1.32,6.89,2s4.57,1.35,6.85,2.07c4.5,1.59,9,3.29,13.39,5,4.36,1.93,8.68,3.9,13,5.95q6.3,3.35,12.39,7c-4.67-.92-9.26-1.95-13.79-3.06-4.62-.88-9.16-1.86-13.69-2.83-4.58-.79-9.12-1.63-13.65-2.48-4.57-.64-9.1-1.37-13.63-2.05a399.29,399.29,0,0,0-109.19,0c-2.26.37-4.54.67-6.81,1s-4.57.63-6.82,1.07-4.54.83-6.82,1.21l-3.43.57c-1.14.19-2.26.49-3.4.7L20.66,24.7l-3.44.67-3.41.78C11.54,26.69,9.25,27.2,7,27.7l-3.48.71C2.32,28.67,1.16,28.93,0,29.16Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceLingual" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 218.72 29.16"><title>top_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1.2,1)" d="M218.72,0a194.24,194.24,0,0,1-52.48,21.93,227,227,0,0,1-56.88,7.23A226.08,226.08,0,0,1,52.47,22c-2.32-.59-4.6-1.33-6.89-2S41,18.66,38.73,17.93c-4.5-1.58-9-3.28-13.39-5C21,11,16.66,9.05,12.39,7Q6.09,3.65,0,0,7,1.4,13.79,3.07C18.4,4,23,4.93,27.48,5.9c4.58.78,9.12,1.62,13.64,2.47,4.58.64,9.11,1.37,13.64,2.06a405.27,405.27,0,0,0,54.6,3.74A401.93,401.93,0,0,0,164,10.4c2.26-.36,4.54-.66,6.81-1s4.57-.63,6.82-1.07,4.54-.83,6.82-1.21l3.43-.57c1.14-.2,2.26-.49,3.4-.71l6.83-1.39,3.44-.66L204.91,3c2.27-.54,4.56-1,6.86-1.54l3.48-.71C216.4.5,217.55.23,218.72,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceMesial" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>left_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M31.47,0c-1.11,4.94-2.34,9.78-3.62,14.57-1,4.89-2.21,9.69-3.31,14.49L21.66,43.54C20.93,48.4,20,53.2,19.28,58a391.31,391.31,0,0,0,.11,116.17c.39,2.4.73,4.83,1.09,7.25l.27,1.82.35,1.8.69,3.61,1.34,7.24c.19,1.23.46,2.42.74,3.62l.81,3.6,1.55,7.26c.49,2.44,1.21,4.8,1.76,7.23s1.17,4.84,1.74,7.28,1.22,4.88,1.74,7.35c-1.33-2.15-2.6-4.31-3.85-6.5s-2.38-4.43-3.54-6.67l-1.74-3.37c-.57-1.12-1.17-2.24-1.66-3.4l-3-6.95-1.48-3.5c-.5-1.17-1-2.34-1.4-3.53l-2.52-7.17c-1.77-4.77-3.07-9.67-4.41-14.58A238.19,238.19,0,0,1,7.77,55.64c.27-1.24.65-2.45,1-3.67l1.11-3.64c.74-2.43,1.48-4.86,2.26-7.27,1.67-4.79,3.55-9.5,5.38-14.21,2.05-4.63,4.21-9.2,6.4-13.73C26.34,8.67,28.87,4.29,31.47,0Z"/></g></g></svg>
            <svg stroke-width="7" className="surfaceDistal" height="50" width="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.47 232.26"><title>right_tooth</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path transform="scale(1,1.2)" d="M0,232.26c1.11-4.94,2.34-9.78,3.62-14.57,1-4.89,2.21-9.69,3.31-14.5L9.8,188.72c.74-4.86,1.66-9.66,2.39-14.49a392.22,392.22,0,0,0,4.28-58.09,394.86,394.86,0,0,0-4.39-58.08c-.39-2.41-.73-4.83-1.09-7.25L10.72,49l-.35-1.8-.69-3.61L8.34,36.33c-.19-1.22-.46-2.41-.74-3.61l-.81-3.6L5.24,21.86c-.49-2.44-1.21-4.8-1.76-7.23S2.31,9.79,1.74,7.34.52,2.47,0,0C1.33,2.14,2.6,4.31,3.84,6.5s2.39,4.43,3.55,6.67l1.74,3.36c.57,1.13,1.17,2.25,1.66,3.41l3,7,1.48,3.5c.5,1.17,1,2.34,1.39,3.53l2.53,7.17c1.77,4.77,3.07,9.67,4.41,14.57a236.52,236.52,0,0,1,7.84,60.47,237.44,237.44,0,0,1-7.77,60.49c-.27,1.23-.65,2.45-1,3.67l-1.11,3.64c-.74,2.43-1.48,4.86-2.26,7.27-1.67,4.79-3.55,9.5-5.38,14.21-2.05,4.63-4.21,9.2-6.4,13.73C5.12,223.59,2.6,228,0,232.26Z"/></g></g></svg>
            </span>)}
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
