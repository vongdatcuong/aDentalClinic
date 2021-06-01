import React,{useState,useEffect, useCallback, useContext} from 'react';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles  } from "@material-ui/core/styles";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import styles from "./jss";
import strings from '../../../configs/strings';
import logoADC from '../../../assets/images/logoADC.png'
// use i18next
import { useTranslation, Trans } from 'react-i18next';
import {toast} from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Tabs, Tab, TextField, IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LinearProgress from '@material-ui/core/LinearProgress';

// Component
import PopupChat from '../../common/Messenger/PopupChat';
import TabPanel from '../../common/TabPanel';
import TransactionItem from './TransactionItem.js';
import TreatmentMenu from '../../../layouts/TreatmentMenu';
import TreatmentItem from "./TreatmentItem.js";
import UpdatePaymentDialog from "./UpdatePaymentDialog";
import ConfirmDialog from '../../dialogs/ConfirmDialog';

// utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';
import PatientService from "../../../api/patient/patient.service";
import MacroCheckSelectDialog from './MacroCheckSelectDialog';
import path from "../../../routes/path";
import { FaScroll } from 'react-icons/fa';
import TreatmentService from "../../../api/treatment/treatment.service";
import TransactionService from "../../../api/transaction/transaction.service";

// Context
import {loadingStore} from '../../../contexts/loading-context';

const useStyles = makeStyles(styles);

const PatientProfilePage = ({ patientID }) => {
    const history = useHistory();
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    const {loadingState, dispatchLoading} = useContext(loadingStore);

    const [curTab, setCurTab] = React.useState(0);
    const [fullname, setFullname] = useState("unknown");
    const [gender, setGender] = useState("unknown");
    const [age, setAge] = useState("unknown");
    const [medicalIssues, setMedicalIssues] = useState("");
    const [plaqueIndex, setPlaqueIndex] = useState(0);
    const [bleedingIndex, setBleedingIndex] = useState(0);
    const [halitosis, setHalitosis] = useState(0);
    const [editMedicalIssues, setEditMedicalIssues] = useState(false);
    const [editOralHeath, setEditOralHeath] = useState(false);
    const [medOpen, setMedOpen] = useState(false);

    const [treatments, setTreatments] = useState([]);
    const [transactions, setTransactions] = useState([]);

    // Dialog
    const [openUpdatePayDialog, setOpenUpdatePayDialog] = useState(false);
    const [openDeletePayDialog, setOpenDeletePayDialog] = useState(false);
    const [selectedTransactionIdx, setSelectedTransactionIdx] = useState(0);

    const handleChangeTab = (event, newTab) => {
        setCurTab(newTab);
    };

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      };

    useEffect(async ()=>{
        await Promise.all[
          getPatientProfile(),
          fetchTreatments(),
          fetchTransactions()
        ]
    }, []);
    
    const getPatientProfile=async()=>{
        try {
            const result=await PatientService.getPatientProfile(patientID);
            if (result.success){
                setFullname(result.data.payload.user.first_name + " " + result.data.payload.user.last_name);
                setGender(result.data.payload.gender);
                const currentYear = new Date().getFullYear();
                setAge(currentYear - ConvertDateTimes.formatDate(result.data.payload.dob, "YYYY"));
                setMedicalIssues(result.data.payload.medical_alert);
                setPlaqueIndex(result.data.payload.plaque_index);
                setBleedingIndex(result.data.payload.bleeding_index);
                setHalitosis(result.data.payload.halitosis);
                return true;
            }
            toast.error(result.message);
            return false;
        } 
        catch(err)  {
            toast.error(t(strings.errorLoadData));    
            return false;
        }
    };

    const fetchTreatments = async () => {
        try {
          const result = await TreatmentService.getAllTreatmentsByPatient(patientID);
          //console.log(result.data);
          if (result.success) {
            setTreatments(result.data);
            //console.log(result.data);
            return true;
          }
          toast.error(result.data.message);
          return false;
        } catch (err) {
          toast.error(t(strings.errorLoadData));
          return false;
        }
      };

    const handleClickEditMedicalIssues=(e)=>{
        if (editMedicalIssues) {
            const updatePatientProfile=async()=>{
                try {
                    const data = { medical_alert: medicalIssues }
                    const result = await PatientService.update(patientID,data);
                    if (result.success){
                        return true;
                    }
                    toast.error(result.message);
                    return false;
                } 
                catch(err)  {
                    toast.error(t(strings.updateFail));    
                    return false;
                }
            };
            updatePatientProfile();
        }
        setEditMedicalIssues(!editMedicalIssues);
    };
    const handleClickEditOralHeath=(e)=>{
        if (editOralHeath) {
            const updatePatientProfile=async()=>{
                try {
                    const data = { plaque_index: parseInt(plaqueIndex), bleeding_index: parseInt(bleedingIndex), halitosis: parseInt(halitosis) }
                    const result = await PatientService.update(patientID,data);
                    if (result.success){
                        return true;
                    }
                    toast.error(result.message);
                    return false;
                } 
                catch(err)  {
                    toast.error(t(strings.updateFail));    
                    return false;
                }
            };
            updatePatientProfile();
        }
        setEditOralHeath(!editOralHeath);
    };
    const handleChangeMedicalIssues = (event) => {
        setMedicalIssues(event.target.value);
    }
    const handleChangePlaqueIndex = (event) => {
        setPlaqueIndex(event.target.value);
    }
    const handleChangeBleedingIndex = (event) => {
        setBleedingIndex(event.target.value);
    }

    const handleChangeHalitosis = (event) => {
        setHalitosis(event.target.value);
    }
    const onCloseMedAlertDialog = (newMedValue) => {
      setMedOpen(false);  
      if (newMedValue == null) {
        return;
      }
      setMedicalIssues(newMedValue);
    }

    // Transaction
    const fetchTransactions = async () => {
      try {
        const result = await TransactionService.getPatientTransaction(patientID, {
          get_staff: true,
          get_treatment: true
        });
        if (result.success) {
          let newTransactions = result.payload.map((transaction) => ({
            _id: transaction._id,
            transaction_date: transaction.transaction_date,
            amount: Number(transaction.amount?.$numberDecimal) || 0,
            provider: transaction.provider,
            paid_amount: Number(transaction.paid_amount?.$numberDecimal) || 0,
            return_amount: Number(transaction.return_amount?.$numberDecimal) || 0,
            note: transaction.note || "",
            treatment_list: transaction.treatment_list,
            is_delete: transaction.is_delete,
          }))
          setTransactions(newTransactions);
          return true;
        }
        toast.error(result.message);
        return false;
      } catch (err) {
        toast.error(t(strings.errorLoadData));
        return false;
      }
    };

    // Update Payment
    const handleOpenUpdatePayDialog = useCallback((index) => {
      setOpenUpdatePayDialog(true);
      setSelectedTransactionIdx(index);
    },[]);

    const handleCloseUpdatePayDialog = useCallback(() => {
      setOpenUpdatePayDialog(false);
    },[]);

    const handleUpdateTransaction = useCallback(async (transactionID, note) => {
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await TransactionService.updatePatientPayment(transactionID, {
          note: note
        });
        if (result.success) {
          let newTransactions = [...transactions];
          newTransactions[selectedTransactionIdx].note = note;
          setTransactions(newTransactions);
          handleCloseUpdatePayDialog();
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(t(strings.updatePaymentErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }, [transactions, selectedTransactionIdx]);

    // Delete Payment
    const handleOpenDeletePayDialog = useCallback((index) => {
      setOpenDeletePayDialog(true);
      setSelectedTransactionIdx(index);
    },[]);

    const handleCloseDeletePayDialog = useCallback(() => {
      setOpenDeletePayDialog(false);
    },[]);

    const handleDeleteTransaction = useCallback(async () => {
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await TransactionService.updatePatientPayment(transactions[selectedTransactionIdx]._id, {
          is_delete: true
        });
        if (result.success) {
          let newTransactions = [...transactions];
          newTransactions[selectedTransactionIdx].is_delete = true;
          setTransactions(newTransactions);
          handleCloseDeletePayDialog();
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(t(strings.deletePaymentErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }, [transactions, selectedTransactionIdx]);

    return (
      <React.Fragment>
        <TreatmentMenu patientID={patientID} />
        <Container className={classes.container}>
          {/* <PopupChat></PopupChat> */}
          <Grid container>
            <Grid item xs={9} sm={9} md={9} className={classes.leftGrid}>
              <Grid container className={classes.headerInfo}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.patientName}
                >
                  {fullname}
                </Typography>
                <div className={classes.patientAgeGender}>
                  {gender}, {age}y
                </div>
              </Grid>
              <Grid container className={classes.detailProfileContainer}>
                <Grid item>
                  <Tabs
                    value={curTab}
                    onChange={handleChangeTab}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      label={t(strings.treatmentPlan).toUpperCase()}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label={t(strings.payment).toUpperCase()}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                  <Grid item>
                    <TabPanel value={curTab} index={0}>
                      {treatments.length > 0 ? "" : t(strings.noTreatmentsPending)}
                        <div className={classes.containerAddRecord}>
                            <Button simple className={classes.btnAddRecord} onClick={() => history.push(path.addTreatmentPath.replace(':patientID', patientID))}>
                                <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
                                {t(strings.add)}
                            </Button>
                        </div>
                        <div className={classes.noteContainer}>
                        {treatments.map((treatmentItem, index) => {
                            return (
                            <TreatmentItem
                                key={index}
                                patientID={patientID}
                                treatmentID={treatmentItem._id}
                                treatmentTime={treatmentItem.treatment_date}
                                treatmentProvider={treatmentItem.provider?.user}
                                treatmentAssistant={treatmentItem.assistant?.user}
                                treatmentDescription={treatmentItem.description}
                                treatmentStatus={treatmentItem.status}
                                treatmentNote={treatmentItem.note}
                                treatmentToothShort={treatmentItem.tooth}
                                treatmentSelectedTooth={treatmentItem.selected_tooth_raw}
                                treatmentProcedure={treatmentItem.procedure_code.procedure_code}
                                // handleDeleteTreatment={() => {
                                // handleDeleteTreatment(treatmentItem._id);
                                // }}
                                // handleUpdateTreatment={() => {
                                // handleUpdateTreatment(
                                //     treatmentItem._id,
                                //     treatmentItem.title,
                                //     treatmentItem.tooth,
                                //     treatmentItem.surface,
                                //     treatmentItem.content
                                // );}}
                            ></TreatmentItem>
                            );
                        })}
                        </div>
                    </TabPanel>
                    <TabPanel value={curTab} index={1}>
                      {transactions.length > 0 ? "" : t(strings.noTransactionsPending)}
                      <div className={classes.containerAddRecord}>
                          <Button simple className={classes.btnAddRecord} onClick={() => history.push(path.addPaymentPath.replace(':patientID', patientID))}>
                              <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
                              {t(strings.add)}
                          </Button>
                      </div>
                      {transactions.map((transaction, index) => {
                          return (
                            <TransactionItem
                              key={index}
                              data={transaction}
                              onUpdate={() => handleOpenUpdatePayDialog(index)}
                              onDelete={() => handleOpenDeletePayDialog(index)}
                            />
                          )
                        })
                      }
                    </TabPanel>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sm={3} md={3} className={classes.rightGrid}>
              <Grid container className={classes.oralHeathContainer}>
                <Typography
                  component="h1"
                  variant="h6"
                  className={classes.oralHeathHeader}
                >
                  {t(strings.oralHealth)}
                  <Button
                    color="primary"
                    onClick={handleClickEditOralHeath}
                    className={classes.btnEdit}
                    simple
                  >
                    {editOralHeath ? t(strings.save) : t(strings.edit)}
                  </Button>
                </Typography>
                <span className={classes.indexInputWrapper}>
                  {t(strings.plaqueIndex).toUpperCase()}:
                  <input
                    type="number"
                    min="0"
                    max="5"
                    className={classes.inputOralHeath}
                    value={plaqueIndex}
                    onChange={handleChangePlaqueIndex}
                    disabled={!editOralHeath}
                  />
                </span>
                <br></br>
                <span className={classes.linearProgressBarContainer}>
                  <LinearProgress
                    variant="determinate"
                    value={plaqueIndex * 20}
                    className={classes.linearProgressBar}
                  ></LinearProgress>
                </span>

                <span className={classes.indexInputWrapper}>
                  {t(strings.bleedingIndex).toUpperCase()}:
                  <input
                    type="number"
                    min="0"
                    max="5"
                    className={classes.inputOralHeath}
                    value={bleedingIndex}
                    onChange={handleChangeBleedingIndex}
                    disabled={!editOralHeath}
                  />
                </span>
                <br></br>
                <span className={classes.linearProgressBarContainer}>
                  <LinearProgress
                    variant="determinate"
                    value={bleedingIndex * 20}
                    className={classes.linearProgressBar}
                  ></LinearProgress>
                </span>

                <span className={classes.indexInputWrapper}>
                  {t(strings.halitosis).toUpperCase()}:
                  <input
                    type="number"
                    min="0"
                    max="5"
                    className={classes.inputOralHeath}
                    value={halitosis}
                    onChange={handleChangeHalitosis}
                    disabled={!editOralHeath}
                  />
                </span>
                <br></br>
                <span className={classes.linearProgressBarContainer}>
                  <LinearProgress
                    variant="determinate"
                    value={halitosis * 20}
                    className={classes.linearProgressBar}
                  ></LinearProgress>
                </span>
              </Grid>
              <Grid container className={classes.medicalIssuesContainer}>
                <Typography
                  component="h1"
                  variant="h6"
                  className={classes.medicalIssuesHeader}
                >
                  {t(strings.medicalIssues)}{" "}
                  <div className={classes.medicalIssuesBtns}>
                    {editMedicalIssues ? (
                      <Tooltip title="Macro" aria-label="Macro">
                        <IconButton size="small" onClick={() => setMedOpen(true)}>
                          <FaScroll />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                    <Button
                      color="primary"
                      onClick={handleClickEditMedicalIssues}
                      className={classes.btnEdit}
                      simple
                    >
                      {editMedicalIssues ? t(strings.save) : t(strings.edit)}
                    </Button>
                  </div>
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={15}
                  rowsMax={20}
                  value={medicalIssues}
                  onChange={handleChangeMedicalIssues}
                  variant="outlined"
                  disabled={!editMedicalIssues}
                />
              </Grid>
            </Grid>
          </Grid>
          <MacroCheckSelectDialog
            onClose={onCloseMedAlertDialog}
            open={medOpen}
            title={t(strings.medicalIssues)}
            selected={medicalIssues}
          />
          <UpdatePaymentDialog
            open={openUpdatePayDialog}
            transaction={transactions[selectedTransactionIdx]}
            onClose={handleCloseUpdatePayDialog}
            onUpdate={handleUpdateTransaction}
          />
          <ConfirmDialog
            open={openDeletePayDialog}
            onClose={handleCloseDeletePayDialog}
            action={handleDeleteTransaction}
          >
            {t(strings.deleteConfirmMessage)}
          </ConfirmDialog>
        </Container>
      </React.Fragment>
    );
}

export default PatientProfilePage;