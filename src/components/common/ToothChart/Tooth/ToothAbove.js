import React from "react";
import PropTypes from "prop-types";

const ToothAbove = function (props) {
  const { id, svgString, ...other } = props;

  function pickTooth() {
    props.callback(id);
  }

  return (
    <React.Fragment>
      <span id={id} onClick={() => pickTooth()}>
        {svgString}
      </span>
    </React.Fragment>
  );
};
ToothAbove.propTypes = {
  svgString: PropTypes.node,
  id: PropTypes.string,
  ///onChangePage: PropTypes.func.isRequired,
};

export default ToothAbove;
