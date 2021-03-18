import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "./jss";

const useStyles = makeStyles(styles);

const Tooth = function (props) {
  const classes = useStyles();
  const { id, svgString, ...other } = props;
  const [isSelected, setIsSelected] = useState(false);

  function handlePickToothOverview() {
  }

  function handlePickToothQuickselect() {
    setIsSelected(!isSelected);
  }

  function pickTooth() {
    if (props.viewType === "overview") {
      handlePickToothOverview();
    } 
    else if (props.viewType === "quickselect") {
      handlePickToothQuickselect();
    }
    props.onClickTooth(id);
  }

  return (
    <React.Fragment>
      <span
        id={id}
        onClick={() => pickTooth()}
        className={isSelected ? classes.selectedTooth : classes.unSelectedTooth}
      >
        {svgString}
      </span>
    </React.Fragment>
  );
};
Tooth.propTypes = {
  svgString: PropTypes.node,
  id: PropTypes.string,
};

export default Tooth;
