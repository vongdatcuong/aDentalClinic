import React, { useState, useEffect, useContext} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../../configs/strings';
import figures from '../../../../configs/figures';

// i18next
import { useTranslation } from 'react-i18next';

// Toast
import { toast } from 'react-toastify';

// @material-ui/core Component
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

// Icons

// Context
import { loadingStore } from '../../../../contexts/loading-context';

// Utils
import ConvertDateTimes from '../../../../utils/datetimes/convertDateTimes';

// API
import api from '../../../../api/base-api';
import apiPath from '../../../../api/path';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.appointAddTreatmentDialogWidth,
    maxWidth: '100%',
  },
  dialogTitle: {
    fontWeight: 700,
    textAlign: 'center'
  },
  formMessageFail: {
    textAlign: "left",
    fontSize: "12px",
    color: theme.dangerColor[0],
    marginTop: '4px',
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
}));

const AddTreatmentDialog = ({
  open, patientID,
  onClose, onAdd
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const { loadingState, dispatchLoading } = useContext(loadingStore);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [selectedProcedureCate, setselectedProcedureCate] = useState(null);
  const [procedureCates, setProcedureCates] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [teeth, setTeeth] = useState([]);
  const [selectedTooth, setSelectedTooth] = useState([]);
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [surfaces, setSurfaces] = useState([]);
  const [selectedSurface, setSelectedSurface] = useState(null);

  // Tooth constraints
  const [allowMultipleTooth, setAllowMultipleTooth] = useState(false);
  const [allowNoTooth, setAllowNoTooth] = useState(false);
  const [allowedTeeth, setAllowedTeeth] = useState({});

  //
  const [procedureErrMsg, setProcedureErrMsg] = useState("");
  const [toothErrMsg, setToothErrMsg] = useState("");
  const [surfaceErrMsg, setSurfaceErrMsg] = useState("");

  let lastPatientID = "";
  let noneStr = t(strings.none);

  // use effect
  useEffect(async () => {
    try {
      dispatchLoading({ type: strings.setLoading, isLoading: true});
      const promises = [
          api.httpGet({
              url: apiPath.procedure.procedure + apiPath.procedure.category
          }),
      ];
      const result = await Promise.all(promises);
      if (result[0].success){
          const categories = result[0].payload.map((cate) => ({
              id: cate._id,
              name: cate.name
          }));
          setProcedureCates(categories);
      } else {
          toast.error(result.message);
      }
    } catch(err){
        toast.error(t(strings.loadProcedureCateErrMsg));
    } finally {
        dispatchLoading({ type: strings.setLoading, isLoading: false});
    }
  }, [selectedProcedureCate, procedures]);

  const handleLoadDialog = async () => {
    // Tooth
    if (patientID){
      if (patientID != lastPatientID){
        try {
          dispatchLoading({ type: strings.setLoading, isLoading: true});
          const promises = [
            api.httpGet({
              url: apiPath.tooth.tooth + apiPath.tooth.patient + '/' + patientID
            }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
            lastPatientID = patientID;
            const teethh = result[0].payload.map((tooth) => ({
              id: tooth._id,
              tooth_number: tooth.tooth_number,
              tooth_type: tooth.tooth_type,
              condition: tooth.condition
            }));
            setTeeth(teethh);
            setSurfaces([]);
            setSelectedTooth(null);
            setSelectedTeeth(null);
            setSelectedSurface(null);
            setAllowMultipleTooth(false);
            setAllowNoTooth(false);
            setAllowedTeeth({});
          } else {
              toast.error(result.message);
          }
        } catch(err){
            toast.error(t(strings.loadToothErrMsg));
        } finally {
            dispatchLoading({ type: strings.setLoading, isLoading: false});
        }
      }
    } else {
      // Set default 32 tooth
      const teeth = [];
      for (let i = 0; i < figures.patientMaxTooth; i++){
        teeth.push({
          id: i,
          tooth_number: i + 1
        });
      }
      setTeeth(teeth);
      setSurfaces([]);
      setSelectedTooth(null);
      setSelectedTeeth([]);
      setSelectedSurface(null);
      setAllowMultipleTooth(false);
      setAllowNoTooth(false);
      setAllowedTeeth({});
    }
  }
  const handleOnProcedureCateChange = async (evt) => {
    const newSelectedCate = evt.target.value;
      try {
          dispatchLoading({ type: strings.setLoading, isLoading: true});
          const promises = [
              api.httpGet({
                  url: apiPath.procedure.procedure + apiPath.procedure.category + '/' + newSelectedCate,
                  query: {
                      get_codes: true
                  }
              }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
              setselectedProcedureCate(newSelectedCate);
              const codes = result[0].payload.procedure_code.map((code) => ({
                  id: code._id,
                  procedure_code: code.procedure_code,
                  description: code.description
              }));
              setProcedures(codes);
              setSelectedProcedure(null);
              setSelectedTooth(null);
              setSelectedTeeth([]);
              setSelectedSurface(null);
              setAllowMultipleTooth(false);
              setAllowNoTooth(false);
              setAllowedTeeth({});
              setSurfaces([]);
          } else {
              toast.error(result.message);
          }
      } catch(err){
          toast.error(t(strings.loadProcedureCodeErrMsg));
      } finally {
          dispatchLoading({ type: strings.setLoading, isLoading: false});
      }
  }

  const handleOnProcedureChange = async (evt) => {
    const newSelectedProcedure = evt.target.value;
      try {
          dispatchLoading({ type: strings.setLoading, isLoading: true});
          const promises = [
              api.httpGet({
                  url: apiPath.procedure.procedure + '/' + newSelectedProcedure.id,
              }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
              setSelectedProcedure(newSelectedProcedure);
              const selectedTooth = result[0].payload.tooth_select;
              if (selectedTooth){
                const tokens = selectedTooth.split(":");
                if (tokens[0] == strings.selectNoneTooth){
                  setAllowNoTooth(true);
                  setAllowMultipleTooth(false);
                  setAllowedTeeth({});
                } else {
                  if (tokens[0] == strings.selectMultiTooth){
                    setAllowMultipleTooth(true);
                  } else {
                    setAllowMultipleTooth(false);
                  }
                  let isOpt = false;
                  if (tokens[tokens.length - 1] == "opt"){
                    setAllowNoTooth(true);
                    isOpt = true;
                  } else {
                    setAllowNoTooth(false);
                  }
                  // Allowed teeth
                  let newAllowedTeeth = {};
                  let toks;
                  for (let i = 1; i < tokens.length - isOpt; i++){
                    if (tokens[i].indexOf("-") != -1){
                      toks = tokens[i].split("-");
                      for (let j = Number(toks[0]); j <= Number(toks[1]); j++){
                        newAllowedTeeth[j] = true;
                      }
                    } else {
                      toks = tokens[i].split(",");
                      for (let j = 0; j < toks.length; j++){
                        newAllowedTeeth[toks[j]] = true;
                      }
                    }
                  }
                  setAllowedTeeth(newAllowedTeeth);
                }
              } else {
                setAllowMultipleTooth(false);
                setAllowNoTooth(false);
                setAllowedTeeth({});
              }
              setSelectedTooth(null);
              setSelectedTeeth([]);
              setSelectedSurface(null);
              setSurfaces([]);
          } else {
              toast.error(result.message);
          }
      } catch(err){
          toast.error(t(strings.loadProcedureCodeErrMsg));
      } finally {
          dispatchLoading({ type: strings.setLoading, isLoading: false});
      }
  }

  const handleOnToothChange = (evt) => {
    setSelectedTooth(evt.target.value);
  }

  const handleOnTeethChange = (evt) => {
    setSelectedTeeth(evt.target.value);
  }

  const handleOnSurfaceChange = (evt) => {
    setSelectedSurface(evt.target.value);
  }

  
  const handleOnClose = () => {
    onClose();
  }

  const handleOnAdd = () => {
    let flag = true;
    // Procedure
    if (!Boolean(selectedProcedure)){
        setProcedureErrMsg(t(strings.appointProcedureErrMsg));
        flag = false;
    } else {
      setProcedureErrMsg("");
    }

    // Tooth
    if (!allowNoTooth && ((!allowMultipleTooth && !Boolean(selectedTooth)) || (allowMultipleTooth && selectedTeeth.length == 0))){
      setToothErrMsg(t(strings.appointToothErrMsg));
      flag = false;
    } else {
      setToothErrMsg("");
    }

    // Surface
    if (!Boolean(selectedSurface)){
      setSurfaceErrMsg(t(strings.appointSurfaceErrMsg));
      flag = false;
    } else {
      setSurfaceErrMsg("");
    }
    if (flag){
      onAdd(selectedProcedure, selectedSurface, selectedTooth);
      onClose();
    }
  }

  return (
    <Paper>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
        aria-labelledby="add-treatment-dialog-title"
        classes={{ 
          paper: classes.paper,
        }}
        onEntering={handleLoadDialog}
      >
        <DialogTitle id="add-treatment-dialog-title" className={classes.dialogTitle}>{t(strings.add) + " " + t(strings.treatments)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
                {/* Select Treatment */}
                <Grid item md={4} sm={6} xs={12}>
                    <InputLabel shrink id="treatment-category">
                        {t(strings.category)}
                    </InputLabel>
                    <Select
                        labelId="treatment-category"
                        id="treatment-category"
                        className={classes.select}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={selectedProcedureCate || 0}
                        onChange={handleOnProcedureCateChange}
                    >
                    {(procedureCates.map((cate) => {
                        return (
                            <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
                        )
                    }))}
                    </Select>
                </Grid>
                {/* Select Procedure */}
                <Grid item md={8} sm={6} xs={12}>
                    <InputLabel shrink id="treatment-procedure">
                        {t(strings.procedure)}
                    </InputLabel>
                    <Select
                        labelId="treatment-procedure"
                        id="treatment-procedure"
                        className={classes.select}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={selectedProcedure || 0}
                        onChange={handleOnProcedureChange}
                        error={Boolean(procedureErrMsg)}
                        helperText={procedureErrMsg}
                    >
                    {(procedures.map((code) => {
                        return (
                            <MenuItem key={code.id} value={code}>{code.procedure_code} ({code.description})</MenuItem>
                        )
                    }))}
                    </Select>
                    {Boolean(procedureErrMsg) && 
                      <FormHelperText
                          className={classes.formMessageFail}
                          error={true}
                      >
                          {procedureErrMsg}
                      </FormHelperText>
                    }
                </Grid>
                {/* Select Tooth */}
                <Grid item md={4} sm={6} xs={12}>
                    <InputLabel shrink id="treatment-tooth">
                        {t(strings.tooth)}
                    </InputLabel>
                    <Select
                        labelId="treatment-tooth"
                        id="treatment-tooth"
                        className={classes.select}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={(allowMultipleTooth)? selectedTeeth || [] : selectedTooth || 0}
                        onChange={(allowMultipleTooth)? handleOnTeethChange : handleOnToothChange}
                        error={Boolean(toothErrMsg)}
                        multiple={allowMultipleTooth}
                    >
                    {(teeth.map((tooth) => {
                        return (
                            <MenuItem key={tooth.id} value={tooth} disabled={!allowedTeeth[tooth.tooth_number]}>{tooth.tooth_number}</MenuItem>
                        )
                    }))}
                    </Select>
                    {Boolean(toothErrMsg) && 
                      <FormHelperText
                          className={classes.formMessageFail}
                          error={true}
                      >
                          {toothErrMsg}
                      </FormHelperText>
                    }
                </Grid>
                {/* Select Surface */}
                <Grid item md={8} sm={6} xs={12}>
                    <InputLabel shrink id="treatment-surface">
                        {t(strings.surface)}
                    </InputLabel>
                    <Select
                        labelId="treatment-surface"
                        id="treatment-surface"
                        className={classes.select}
                        margin="dense"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={selectedSurface || 0}
                        onChange={handleOnSurfaceChange}
                        error={Boolean(surfaceErrMsg)}
                        helperText={surfaceErrMsg}
                    >
                    {(surfaces.map((surface) => {
                        return (
                            <MenuItem key={surface.id} value={surface}>{surface.procedure_code} ({surface.description})</MenuItem>
                        )
                    }))}
                    </Select>
                    {Boolean(surfaceErrMsg) && 
                      <FormHelperText
                          className={classes.formMessageFail}
                          error={true}
                      >
                          {surfaceErrMsg}
                      </FormHelperText>
                    }
                </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnAdd} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AddTreatmentDialog;