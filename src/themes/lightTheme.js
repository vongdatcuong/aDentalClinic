/* Default theme properties 
    (Not Allowed Names) 
*/
// breakpoints
// direction
// mixins
// overrides
// palette
// props
// shadows
// typography
// spacing
// transitions
// zIndex

import {hexToRgb} from '../utils/colors';
  
  // Width Height
  const drawerLeftWidth = 120;
  const drawerRightWidth = 240;
  const drawerRightCloseWidth = 50;
  const notificationPopoverWidth = 420;
  const notificationPopoverMinHeight = 300;
  const notificationPopoverMaxHeight = 600;
  const filterChairPopoverWidth = 200;
  const filterChairPopoverMaxWidth = 300;
  const filterPatientPopoverWidth = 500;
  const filterPatientPopoverMaxWidth = 700;
  const filterPatientPopoverHeight = 300;
  const filterPatientPopoverMaxHeight = 800;
  const appointmentRecallTableHeight = 200;
  const appointmentTreatmentTableHeight = 300;
  const appointRecallDialogWidth = '70%';
  const appointTreatmentDialogWidth = '80%';
  const appointAddTreatmentDialogWidth = '50%';
  const confirmDialogMinWidth = 350;

  // Z-index
  const miniLeftSidebarZIndex = 999;
  const loadingZIndex = 9999;
  const menuBarZIndex = 998;
  const selectedToothZIndex = 900;

  const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
  };
  
  const fontColor = "#ffffff";
  const primaryColor = ["#4042E2", "#5658e5", "#6c6ee9", "#8284ec"];
  const secondaryColor = ["#dc004e", "#f50057", "#ff1065", "#ff2975"];
  const warningColor = ["#ff9800", "#ffa726", "#fb8c00", "#ffa21a"];
  const dangerColor = ["#f44336", "#ef5350", "#e53935", "#f55a4e"];
  const successColor = ["#4caf50", "#66bb6a", "#43a047", "#5cb860"];
  const infoColor = ["#00acc1", "#26c6da", "#00acc1", "#00d3ee"];
  const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#eb3573"];
  const grayColor = [
    "#999",
    "#777",
    "#3C4858",
    "#AAAAAA",
    "#D2D2D2",
    "#DDD",
    "#b4b4b4",
    "#555555",
    "#333",
    "#a9afbb",
    "#eee",
    "#e7e7e7"
  ];
  const hoverBrightColor = ["#1991a7", "#1ca0b8", "#1eaec9", "#21bdda"];
  const hoverDarkColor = ["#551796", "#5e19a7", "#681cb8", "#711ec9"];
  const blackColor = "#000000";
  const whiteColor = "#ffffff";
  const circularProgressChart = '#8529e6';
  const coldColor = "#dde9ef";
  const percussionColor = "#ccffcc";
  const palpationColor = "#ffd9b3";
  const heatColor = "#ffc2b3";
  const electricityColor = "#ffffcc";

  const tableInsertLinkIconColor = "#bb001b";
  const tableAddIconColor = "#34a853";

  // Google map
  const mapMinWidth = 500;
  const mapMinHeight = 500;

  // opacity
  const secondaryOpacity = 0.54;
  
  const boxShadow = {
    boxShadow:
      "0 10px 30px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.42), 0 4px 25px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)"
  };
  
  const primaryBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(primaryColor[0]) +
      ",.4)"
  };
  const infoBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.4)"
  };
  const successBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.4)"
  };
  const warningBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.4)"
  };
  const dangerBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.4)"
  };
  const roseBoxShadow = {
    boxShadow:
      "0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.14), 0 7px 10px -5px rgba(" +
      hexToRgb(roseColor[0]) +
      ",.4)"
  };
  
  const warningCardHeader = {
    background:
      "linear-gradient(60deg, " + warningColor[1] + ", " + warningColor[2] + ")",
    ...warningBoxShadow
  };
  const successCardHeader = {
    background:
      "linear-gradient(60deg, " + successColor[1] + ", " + successColor[2] + ")",
    ...successBoxShadow
  };
  const dangerCardHeader = {
    background:
      "linear-gradient(60deg, " + dangerColor[1] + ", " + dangerColor[2] + ")",
    ...dangerBoxShadow
  };
  const infoCardHeader = {
    background:
      "linear-gradient(60deg, " + infoColor[1] + ", " + infoColor[2] + ")",
    ...infoBoxShadow
  };
  const primaryCardHeader = {
    background:
      "linear-gradient(60deg, " + primaryColor[1] + ", " + primaryColor[2] + ")",
    ...primaryBoxShadow
  };
  const roseCardHeader = {
    background:
      "linear-gradient(60deg, " + roseColor[1] + ", " + roseColor[2] + ")",
    ...roseBoxShadow
  };
  
  const defaultBoxShadow = {
    border: "0",
    borderRadius: "3px",
    boxShadow:
      "0 10px 20px -12px rgba(" +
      hexToRgb(blackColor) +
      ", 0.42), 0 3px 20px 0px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    padding: "10px 0",
    transition: "all 150ms ease 0s"
  };

  const title = {
    color: grayColor[2],
    textDecoration: "none",
    fontWeight: "300",
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  };
  
export default {
  hexToRgb,
  // Width Height
  drawerLeftWidth,
  drawerRightWidth,
  drawerRightCloseWidth,
  notificationPopoverWidth,
  notificationPopoverMinHeight,
  notificationPopoverMaxHeight,
  filterChairPopoverWidth,
  filterChairPopoverMaxWidth,
  filterPatientPopoverWidth,
  filterPatientPopoverHeight,
  filterPatientPopoverMaxWidth,
  filterPatientPopoverMaxHeight,
  appointmentRecallTableHeight,
  appointmentTreatmentTableHeight,
  appointRecallDialogWidth,
  appointTreatmentDialogWidth,
  appointAddTreatmentDialogWidth,
  confirmDialogMinWidth,
  // Z-index
  miniLeftSidebarZIndex,
  loadingZIndex,
  menuBarZIndex,
  selectedToothZIndex,
  // ???
  transition,
  boxShadow,
  fontColor,
  primaryColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  whiteColor,
  circularProgressChart,
  coldColor,percussionColor,palpationColor,heatColor,electricityColor, //Endodontic test color
  hoverBrightColor,
  hoverDarkColor,
  tableInsertLinkIconColor,
  tableAddIconColor,
  // Google Map
  mapMinWidth,
  mapMinHeight,
  // Opacity
  secondaryOpacity,
  //
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  defaultBoxShadow,
  title,
};  