import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../configs/strings";
import Typography from "@material-ui/core/Typography";
// use i18next
import { useTranslation } from "react-i18next";
import path from "../../../routes/path";
// Component
import PopupChat from "../../common/Messenger/PopupChat";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import MouthTemplateRow from "./template.row";
import MouthTemplateService from "../../../api/xray/xray.template.service";
import MouthService from "../../../api/xray/xray.service";
import { loadingStore } from "../../../contexts/loading-context";
import { toast } from "react-toastify";
const useStyles = makeStyles(styles);

const PatientXRayImagesPage = ({ patientID }) => {
  const [templateList, setTemplateList] = useState([]);
  const [mouthList, setMouthList] = useState([]);
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  const history = useHistory();
  const handleAddXRayImage = () => {
    history.push(
      path.patientAddXRayImagesPath.replace(":patientID", patientID)
    );
  };
  const handleViewXRayImage = () => {
    history.push(
      path.patientViewXRayImagesPath.replace(":patientID", patientID)
    );
  };
  const loadPatientMonth = async (patient_id) => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true });
      const data = await MouthService.getsByPatientAndTemplate(
        patient_id,
        null
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
    const onLoad = async () => {
      try {
        dispatchLoading({ type: strings.setLoading, isLoading: true });
        const data = await MouthTemplateService.gets();
        if (data.success) {
          let payload = data.payload;
          payload.push({
            _id: null,
            name: "Others",
            thumbnail: null,
          });
          setTemplateList(payload);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
      } finally {
        dispatchLoading({ type: strings.setLoading, isLoading: false });
      }
    };
    onLoad();
    //loadPatientMonth(patientID);
  }, []);
  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        <PopupChat></PopupChat>
        <div className={classes.headerContainer}>
          <Typography
            component="h1"
            variant="h5"
            className={classes.loginTitle}
          >
            {t(strings.xRayImages)}
          </Typography>
        </div>
        <div className={classes.bodyContainer}>
          {templateList.map((template) => {
            return (
              <MouthTemplateRow key={template._id} template={template} patientID={patientID} />
            );
          })}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PatientXRayImagesPage;
