import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// @material-ui/core Component
import Container from "@material-ui/core/Container";
import styles from "./jss";
import strings from "../../../../configs/strings";
// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Tabs,
  Tab,
  TextareaAutosize,
  TextField,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Autorenew from "@material-ui/icons/Autorenew";
import AcUnit from "@material-ui/icons/AcUnit";
import { FaHammer, FaHandPaper, FaFireAlt } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";

// Component
import PopupChat from "../../../common/Messenger/PopupChat";
import TabPanel from "../../../common/TabPanel";
// Toast
import { toast } from "react-toastify";

import ToothService from "../../../../api/patient/tooth.service";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EndodonticItem = (props) => { console.log(props);
  const classes = useStyles();
  return (
    <div className={classes.endodonticItem}>
      <span className={classes.endodonticTestIcon}>{props.icon}</span>
      <span className={classes.endodonticTestName}>{props.testName}</span>
      <span className={classes.endodonticTestStatus}>
        <span>{props.value}</span>
        <span>
          <ChevronRightIcon></ChevronRightIcon>
        </span>
      </span>
    </div>
  );
};

const useStyles = makeStyles(styles);
const ToothOverviewInfoTab = (props) => {
  const toothNumber = props.toothID
    ? parseInt(props.toothID.replace("Tooth", ""))
    : 0; // parse Tooth1 to 1
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [toothNote, setToothNote] = useState("");
  const [editToothNote, setEditToothNote] = useState(false);
  const [toothCold, setToothCold] = useState(-1);
  const [toothPercussion, setToothPercussion] = useState(-1);
  const [toothPalpation, setToothPalpation] = useState(-1);
  const [toothHeat, setToothHeat] = useState(-1);
  const [toothEletricity, setToothEletricity] = useState(-1);

  useEffect(() => {
    fetchToothData();
  }, []);

  const fetchToothData = async () => {
    try {
      const result = await ToothService.getSinglePatientTooth(
        props.patientID,
        toothNumber
      );
      if (result.success) {
        setToothNote(result.data[0].tooth_note);
        setToothCold(result.data[0].cold);
        setToothPercussion(result.data[0].percussion);
        setToothPalpation(result.data[0].palpation);
        setToothHeat(result.data[0].heat);
        setToothEletricity(result.data[0].electricity);
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.errorLoadData));
      return false;
    }
  };

  const endodonticList = [
    {
      testName: t(strings.cold),
      icon: <AcUnit></AcUnit>,
      testStatus: t(strings.existRootCanalTreatment),
    },
    {
      testName: t(strings.percussion),
      icon: <FaHammer></FaHammer>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.palpation),
      icon: <FaHandPaper></FaHandPaper>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.heat),
      icon: <FaFireAlt></FaFireAlt>,
      testStatus: t(strings.test),
    },
    {
      testName: t(strings.electricity),
      icon: <AiFillThunderbolt></AiFillThunderbolt>,
      testStatus: t(strings.test),
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickEditToothNote = async (e) => {
    setEditToothNote(!editToothNote);
    if (editToothNote) {
      try {
        const result = await ToothService.update(props.patientID, toothNumber, {
            tooth_note: toothNote,
        });
        if (result.success) {
          return true;
        }
        toast.error(result.message);
        return false;
      } catch (err) {
        toast.error(t(strings.updateFail));
        return false;
      }
    }
  };
  const handleChangeToothNote = (event) => {
    setToothNote(event.target.value);
  };

  async function updateTooth(
    toothCold,
    toothPercussion,
    toothPalpation,
    toothHeat,
    toothEletricity
  ) {
    try {
      const result = await ToothService.update(props.patientID, toothNumber, {
        cold: toothCold,
        percussion: toothPercussion,
        palpation: toothPalpation,
        heat: toothHeat,
        electricity: toothEletricity,
      });
      if (result.success) {
        //fetchNotes();
        return true;
      }
      toast.error(result.message);
      return false;
    } catch (err) {
      toast.error(t(strings.updateFail));
      return false;
    }
  }
  useEffect(() => {
    // apply when change status
    updateTooth(
      toothCold,
      toothPercussion,
      toothPalpation,
      toothHeat,
      toothEletricity
    );
  }, [toothCold, toothPercussion, toothPalpation, toothHeat, toothEletricity]);
  //   useEffect(() => {
  //     console.log("toothPercussion: ", toothPercussion);
  //   }, [toothPercussion]);
  //   useEffect(() => {
  //     console.log("toothPalpation: ", toothPalpation);
  //   }, [toothPalpation]);
  //   useEffect(() => {
  //     console.log("toothHeat: ", toothHeat);
  //   }, [toothHeat]);
  //   useEffect(() => {
  //     console.log("toothEletricity: ", toothEletricity);
  //   }, [toothEletricity]);

  return (
    <TabPanel
      value={props.value}
      index={props.index}
      className={classes.toothTabContainer}
    >
      <Grid container>
        <Grid item xs={2} sm={2} md={2} className={classes.toothImgContainer}>
          {props.toothSvgString}
        </Grid>
        <Grid
          container
          xs={10}
          sm={10}
          md={10}
          className={classes.toothInfoContainer}
        >
          <Grid item direction={"row"} className={classes.dentalContainer}>
            <Grid item className={classes.dentalHeaderContainer}>
              {t(strings.dental)}
              <span className={classes.dentalButtonsContainer}>
                {/* <Button simple>
                  <Autorenew></Autorenew>
                  {t(strings.reset)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.missing)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.pathology)}
                </Button>
                <Button simple>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  {t(strings.restoration)}
                </Button> */}

                <Button
                  color="primary"
                  onClick={handleClickEditToothNote}
                  className={classes.btnEdit}
                  simple
                >
                  {editToothNote ? t(strings.save) : t(strings.edit)}
                </Button>
              </span>
            </Grid>
            <Grid item className={classes.dentalBodyContainer}>
              {/* <div className="blankMessage">
                {t(strings.noTreatmentsPending)}
              </div> */}
              <TextField
                className={classes.editToothArea}
                id="outlined-multiline-static"
                multiline
                rows={5}
                rowsMax={10}
                value={toothNote}
                onChange={handleChangeToothNote}
                variant="outlined"
                disabled={!editToothNote}
              />
            </Grid>
          </Grid>
          <Grid container direction={"row"} className={classes.bottomContainer}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              className={classes.endodonticContainer}
            >
              <div className={classes.endodonticTitle}>
                {t(strings.endodontic)}
              </div>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {endodonticList.map((endodonticItem, index) => {
                  let value = 0;
                  switch (endodonticItem.testName){
                    case strings.cold:
                      value = toothCold;
                      break;
                    case strings.percussion:
                      value = toothPercussion;
                      break;
                    case strings.palpation:
                      value = toothPalpation;
                      break;
                    case strings.heat:
                      value = toothHeat;
                      break;
                    case strings.electricity:
                      value = toothEletricity;
                      break;
                    default:
                      value = 0;
                  }
                  return (
                    <Tab
                      label=<EndodonticItem
                        icon={endodonticItem.icon}
                        testName={endodonticItem.testName}
                        testStatus={endodonticItem.testStatus}
                        value={value}
                      />
                      {...a11yProps(index)}
                    />
                  );
                })}
                ;
              </Tabs>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              className={clsx(
                classes.testContainer,
                value === 0
                  ? classes.coldTestContainer
                  : value === 1
                  ? classes.percussionTestContainer
                  : value === 2
                  ? classes.palpationTestContainer
                  : value === 3
                  ? classes.heatTestContainer
                  : classes.electricityTestContainer
              )}
            >
              <TabPanel value={value} index={0}>
                <div className={classes.testTitle}>
                  <div>
                    {t(strings.cold)} {t(strings.test)}
                  </div>
                  <div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothCold(1);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothCold === 1 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.positive)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothCold(2);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothCold === 2 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.uncertain)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothCold(3);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothCold === 3 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.negative)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothCold(0);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothCold === 0 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.notApplicable)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothCold(-1);
                        }}
                        size="large"
                        className={classes.clearBtn}
                      >
                        {t(strings.clear)}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className={classes.testTitle}>
                  {t(strings.percussion)} {t(strings.test)}
                  <div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPercussion(1);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPercussion === 1 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.positive)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPercussion(2);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPercussion === 2 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.uncertain)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPercussion(3);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPercussion === 3 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.negative)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPercussion(0);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPercussion === 0 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.notApplicable)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPercussion(-1);
                        }}
                        size="large"
                        className={classes.clearBtn}
                      >
                        {t(strings.clear)}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className={classes.testTitle}>
                  {t(strings.palpation)} {t(strings.test)}
                  <div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPalpation(1);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPalpation === 1 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.positive)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPalpation(2);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPalpation === 2 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.uncertain)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPalpation(3);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPalpation === 3 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.negative)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPalpation(0);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothPalpation === 0 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.notApplicable)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothPalpation(-1);
                        }}
                        size="large"
                        className={classes.clearBtn}
                      >
                        {t(strings.clear)}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className={classes.testTitle}>
                  {t(strings.heat)} {t(strings.test)}
                  <div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothHeat(1);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothHeat === 1 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.positive)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothHeat(2);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothHeat === 2 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.uncertain)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothHeat(3);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothHeat === 3 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.negative)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothHeat(0);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothHeat === 0 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.notApplicable)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothHeat(-1);
                        }}
                        size="large"
                        className={classes.clearBtn}
                      >
                        {t(strings.clear)}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className={classes.testTitle}>
                  {t(strings.electricity)} {t(strings.test)}
                  <div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothEletricity(1);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothEletricity === 1 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.positive)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothEletricity(2);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothEletricity === 2 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.uncertain)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothEletricity(3);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothEletricity === 3 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.negative)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothEletricity(0);
                        }}
                        variant="contained"
                        size="large"
                        className={clsx(
                          classes.testBtns,
                          toothEletricity === 0 ? classes.selectedBtn : ""
                        )}
                      >
                        {t(strings.notApplicable)}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                          setToothEletricity(-1);
                        }}
                        size="large"
                        className={classes.clearBtn}
                      >
                        {t(strings.clear)}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default ToothOverviewInfoTab;
