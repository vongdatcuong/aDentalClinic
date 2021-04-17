import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";

import TwoLayer from "../../../assets/images/2-Layer.png";
import FourLayer from "../../../assets/images/4-Layer.png";
import DefaultMouthThumbnail from "../../../assets/mount-template/thumnail_default_mountemplate.png";
import FourBiteWings from "../../../assets/mount-template/four_bite_wings.png";
import TwoHx2V from "../../../assets/mount-template/2Hx2V.png";
import TwoVerticals from "../../../assets/mount-template/2Verticals.png";
import TwoxTwo from "../../../assets/mount-template/2x2.png";
import ThreeVerticals from "../../../assets/mount-template/3verticals.png";
import FourVerticals from "../../../assets/mount-template/4verticals.png";
import EightHorizontals from "../../../assets/mount-template/8Horizontals.png";
import EightVerticals from "../../../assets/mount-template/8verticals.png";
import Anterior from "../../../assets/mount-template/anterior.png";
import Checkup from "../../../assets/mount-template/checkup.png";
import Checkup1 from "../../../assets/mount-template/checkup1.png";
import FMX2 from "../../../assets/mount-template/FMX2.png";
import FMX3 from "../../../assets/mount-template/FMX3.png";
import FMX4 from "../../../assets/mount-template/FMX4.png";
import FMX5 from "../../../assets/mount-template/FMX5.png";
import FullMouthSeries from "../../../assets/mount-template/full_mouth_series.png";
import Ortho from "../../../assets/mount-template/ortho.png";
import Ortho2 from "../../../assets/mount-template/ortho_2.png";
import PedoCheckup from "../../../assets/mount-template/pedo_checkup.png";
import PosteriorEndo from "../../../assets/mount-template/posterior_endo.png";
import RecallPA from "../../../assets/mount-template/recall_PA.png";
import Recall from "../../../assets/mount-template/recall.png";
import TwoBiteWings from "../../../assets/mount-template/two_bite_wings.png";
import path from "../../../routes/path";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import { loadingStore } from "../../../contexts/loading-context";
import MouthService from "../../../api/xray/xray.service";
import { toast } from "react-toastify";
import Image from "react";
const useStyles = makeStyles(styles);
const imageTemplateData = {
  "four_bite_wings.png": FourBiteWings,
  "2Hx2V.png": TwoHx2V,
  "2Verticals.png": TwoVerticals,
  "2x2.png": TwoxTwo,
  "3verticals.png": ThreeVerticals,
  "4verticals.png": FourVerticals,
  "8Horizontals.png": EightHorizontals,
  "8verticals.png": EightVerticals,
  "anterior.png": Anterior,
  "checkup.png": Checkup,
  "checkup1.png": Checkup1,
  "FMX2.png": FMX2,
  "FMX3.png": FMX3,
  "FMX4.png": FMX4,
  "FMX5.png": FMX5,
  "full_mouth_series.png": FullMouthSeries,
  "ortho.png": Ortho,
  "ortho_2.png": Ortho2,
  "pedo_checkup.png": PedoCheckup,
  "posterior_endo.png": PosteriorEndo,
  "recall_PA.png": RecallPA,
  "recall.png": Recall,
  "two_bite_wings.png": TwoBiteWings,
};
const MouthTemplateRow = ({ patientID, template }) => {
  const [templateData, setTemplateData] = useState(template);
  const [mouthList, setMouthList] = useState([]);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const history = useHistory();

  const handleAddXRayImage = () => {
    if (templateData._id != null) {
      history.push(
        path.patientAddXRayImagesPath.replace(":patientID", patientID)
      );
    }
  };
  const handleViewXRayImage = () => {
    history.push(
      path.patientViewXRayImagesPath.replace(":patientID", patientID)
    );
  };
  const loadPatientMonth = async (patient_id, template_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await MouthService.getsByPatientAndTemplate(
        patient_id,
        template_id
      );
      if (data.success) {
        setMouthList(data.payload);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  };
  useEffect(() => {
    if (patientID && templateData && templateData._id) {
      loadPatientMonth(patientID, templateData._id);
    } else if (
      patientID &&
      templateData &&
      templateData._id === null &&
      templateData.name === "Others"
    ) {
      loadPatientMonth(patientID, "others");
    }
  }, []);
  return templateData._id === null && mouthList.length === 0 ? null : (
    <div>
      <b>{templateData.name}</b>
      <div className={classes.xRayImagesContainer}>
        {templateData._id ? (
          <Tooltip
            arrow
            placement="left"
            title={
              <img
                onClick={handleViewXRayImage}
                src={
                  imageTemplateData[templateData.thumbnail]
                    ? imageTemplateData[templateData.thumbnail]
                    : DefaultMouthThumbnail
                }
                alt={templateData.name}
                className={classes.xRayThumbnailImage}
              />
            }
            aria-label={templateData.name}
          >
            <Button
              onClick={handleAddXRayImage}
              variant="contained"
              className={classes.addXRayImage}
            >
              <AddBoxIcon></AddBoxIcon>
            </Button>
          </Tooltip>
        ) : null}

        <div className={classes.xRayImagesContainer}>
          {mouthList.map((mouth, index) => {
            return (
              <div
                className={classes.xRayThumbnail}
                style={{ flexDirection: "column" }}
              >
                <img
                  onClick={handleViewXRayImage}
                  src={
                    imageTemplateData[mouth.thumbnail]
                      ? imageTemplateData[mouth.thumbnail]
                      : DefaultMouthThumbnail
                  }
                  alt={mouth.name}
                  className={classes.xRayThumbnailImage}
                />
                <a
                  className={classes.xRayThumbnailImage}
                  style={{ paddingLeft: 5 }}
                >
                  {mouth.name.length <= 10
                    ? mouth.name
                    : mouth.name.substring(0, 10)}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MouthTemplateRow;
