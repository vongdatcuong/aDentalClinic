import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from "prop-types";
import styles from "./jss";
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const useStyles = makeStyles(styles);

const Tooth = function (props) {
  const classes = useStyles();
  const { id, svgString, jaw, viewType, ...other } = props;
  const [isSelected, setIsSelected] = useState(false);

  function handlePickToothOverview() {
  }

  function handlePickToothQuickselect() {
    setIsSelected(!isSelected);
  }

  function pickTooth() {
    if (viewType === "overview") {
      handlePickToothOverview();
    } 
    else if (viewType === "quickselect") {
      handlePickToothQuickselect();
    }
    props.onClickTooth(id);
  }

  return (
    <React.Fragment>
      <HtmlTooltip title={
          <React.Fragment>
            <Typography color="inherit">{id}</Typography>
            <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
            {"It's very engaging. Right?"}
          </React.Fragment>
        } aria-label={id}>
        <span className={jaw==="upperJaw" ? classes.upperJawTooth : jaw==="lowerJaw" ? classes.lowerJawTooth : ""}>
            <span
                id={id}
                onClick={() => pickTooth()}
                className={clsx(classes.toothContainer,
                    isSelected ? classes.selectedTooth : classes.unSelectedTooth
                    )}
            >
                {svgString}
                {viewType === "quickselect" ? (<CheckCircleIcon></CheckCircleIcon>) : ""}
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
