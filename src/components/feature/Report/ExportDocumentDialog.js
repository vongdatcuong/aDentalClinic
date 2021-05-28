import React, { useState, useEffect, useCallback} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
import lists from '../../../configs/lists';
import figures from '../../../configs/figures';

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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

// React-select
import AsyncSelect from 'react-select/async';

// Icons

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';

let popoverWidth = 500;
const useStyles = makeStyles((theme) => {
    //popoverWidth = theme.appointExportDialogWidth;
    return {
        paper: {
            width: theme.appointExportDialogWidth,
            maxWidth: '100%',
            maxHeight: theme.appointExportDialogMaxHeight,
            [theme.breakpoints.down('sm')]: {
                width: theme.appointExportDialogWidthSm,
            },
            '& .MuiTypography-root': {
                fontWeight: 500,
                color: theme.blackColor
            }
        },
        dialogTitle: {
            fontWeight: 700,
            textAlign: 'center'
        },
        radioBtnFormControl: {
            width: '100%',
            textAlign: 'center',
            '& div.MuiFormGroup-root': {
                display: 'inline-block'
            }
        },
        dialogContent: {

        },
        formMessageSuccess: {
            textAlign: "left",
            fontSize: "12px",
            color: theme.successColor[0],
            marginBottom: theme.spacing(1)
        },
        formMessageFail: {
            textAlign: "left",
            fontSize: "12px",
            color: theme.dangerColor[0],
            marginTop: '4px',
            marginLeft: theme.spacing(1.5),
            marginBottom: theme.spacing(1.5)
        },
        note: {
            fontSize: '0.9em',
            color: '#666666'
        }
    }
});

const ExportDocumentDialog = ({
  open, fromDate, toDate,
  onClose, onExport
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Select style
  const selectStyle = {
    menu: ({top, ...provided}, state) => ({
      ...provided,
      position: 'fixed',
      maxWidth: popoverWidth
    }),
  };

  const noneOption = {value: "", label: t(strings.none)};

  // States
  const [exportType, setExportType] = useState(lists.exportObj.type.appointment);   //0: appoint, 1: treatment, 2: referral
  const [patient, setPatient] = useState({...noneOption});
  const [assistant, setAssistant] = useState({...noneOption});
  const [provider, setProvider] = useState({...noneOption});
  const [staff, setStaff] = useState({...noneOption});
  const [source, setSource] = useState({...noneOption});

  // Appointment Document Target
  const [targetType, setTargetType] = useState(0);  //0: all, 1: patient, 2: assistant, 3: provider, 4: staff (staff + provider), 5: source

  // Error Mesages
  const [errMsg, setErrMsg] = useState("");

  // use effect
  useEffect(async () => {
    
  }, [fromDate, toDate])

  const handleOnClose = () => {
    onClose();
  }

  const handleChangeExportType = useCallback((evt) => {
      let type = Number(evt.target.value);
      setTargetType(lists.exportObj.targetType.all);
      setExportType(type);
  }, []);

  const handleChangeTarget = useCallback((evt) => {
      let newTargetType = Number(evt.target.value);
      setTargetType(newTargetType);
      if (lists.exportObj.optionalTargetTypes.includes(newTargetType)){
          setErrMsg("");
      }
  }, []);

  const handleOnSelectPatient = useCallback((option) => {
    setPatient(option);
  }, []);

  // Autocomplete Patient
  const loadPatientOptions  = (inputValue) => {
    return new Promise(async (resolve) => {
        try {
            let options = [];
            const result = await api.httpGet({
                url: apiPath.patient.patient + apiPath.common.autocomplete,
                query: {
                    data: inputValue,
                    limit: figures.autocomplete.limit
                }
            });
            if (result.success){
                options = result.payload.map((option) => ({
                    value: option._id,
                    label: option.first_name + " " + option.last_name,
                }));
            }
            options.unshift({...noneOption});
            resolve(options);
        } catch(err){
            toast.error(err);
        }
      });
    };

    const handleOnSelectAssistant = useCallback((option) => {
        setAssistant(option);
    }, []);

    // Autocomplete Assistant
    const loadAssistantOptions = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                url: apiPath.staff.staff + apiPath.common.autocomplete,
                query: {
                    data: inputValue,
                    limit: figures.autocomplete.limit,
                    staffType: lists.staff.staffType.staff,
                },
                });
                if (result.success) {
                options = result.payload.map((option) => ({
                    value: option._id,
                    label: `${option.first_name} ${option.last_name} (${option.display_id})`,
                }));
                }
                options.unshift({...noneOption});
                resolve(options);
            } catch (err) {
                toast.error(err);
            }
        });
    };

    const handleOnSelectProvider = useCallback((option) => {
        setProvider(option);
    }, []);

    // Autocomplete Provider
    const loadProviderOptions = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                url: apiPath.staff.staff + apiPath.common.autocomplete,
                query: {
                    data: inputValue,
                    limit: figures.autocomplete.limit,
                    staffType: lists.staff.staffType.provider,
                },
                });
                if (result.success) {
                options = result.payload.map((option, index) => {
                    return {
                    value: option._id,
                    label: `${option.first_name} ${option.last_name} (${option.display_id})`,
                    };
                });
                }
                options.unshift({...noneOption});
                resolve(options);
            } catch (err) {
                toast.error(err);
            }
        });
    };

    const handleOnSelectStaff = useCallback((option) => {
        setStaff(option);
    }, []);

    // Autocomplete Staff
    const loadStaffOptions = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                url: apiPath.staff.staff + apiPath.common.autocomplete,
                query: {
                    data: inputValue,
                    limit: figures.autocomplete.limit,
                },
                });
                if (result.success) {
                options = result.payload.map((option, index) => {
                    return {
                    value: option._id,
                    label: `${option.first_name} ${option.last_name} (${option.display_id})`,
                    };
                });
                }
                options.unshift({...noneOption});
                resolve(options);
            } catch (err) {
                toast.error(err);
            }
        });
    };

    const handleOnSelectSource = useCallback((option) => {
        setSource(option);
    }, []);

    // Autocomplete Source
    const loadSourceOptions = (inputValue) => {
        return new Promise(async (resolve) => {
            try {
                let options = [];
                const result = await api.httpGet({
                url: apiPath.referralSource.referralSource + apiPath.referralSource.autocomplete,
                query: {
                    data: inputValue,
                    limit: figures.autocomplete.limit,
                },
                });
                if (result.success) {
                options = result.payload.map((option, index) => {
                    return {
                    value: option._id,
                    label: `${option.name}`,
                    };
                });
                }
                options.unshift({...noneOption});
                resolve(options);
            } catch (err) {
                toast.error(err);
            }
        });
    };

    const handleExport = useCallback(() => {
        let isValid = true;

        // Patient
        if (targetType === lists.exportObj.targetType.patient && !patient.value){
            setErrMsg(t(strings.patientErrMsg));
            isValid = false;
        }
        // Assistant 
        else if (targetType === lists.exportObj.targetType.assistant && !assistant.value){
            setErrMsg(t(strings.assistantErrMsg));
            isValid = false;
        }
        // Provider
        else if (targetType === lists.exportObj.targetType.provider && !provider.value){
            setErrMsg(t(strings.appointProviderErrMsg));
            isValid = false;
        } 
        // Staff
        else if (targetType === lists.exportObj.targetType.staff && !staff.value){
            setErrMsg(t(strings.staffErrMsg));
            isValid = false;
        }
        // Source
        else if (targetType === lists.exportObj.targetType.source && !source.value){
            setErrMsg(t(strings.referralSourceErrMsg));
            isValid = false;
        }
        else {
            setErrMsg("");
        }

        if (isValid){
            let targetObj = {};
            switch(targetType){
                // All
                case lists.exportObj.targetType.all:
                    break;
                // Patient
                case lists.exportObj.targetType.patient:
                    targetObj.patient_id = patient.value;
                    break;
                // Assistant
                case lists.exportObj.targetType.assistant:
                    targetObj.assistant_id = assistant.value;
                    break;
                // Provider
                case lists.exportObj.targetType.provider:
                    targetObj.provider_id = provider.value;
                    break;
                // Patient All
                case lists.exportObj.targetType.patientAll:
                    targetObj.patient_id = "1";
                    break;
                // Staff
                case lists.exportObj.targetType.staff:
                    targetObj.staff_id = staff.value;
                    break;
                // Source
                case lists.exportObj.targetType.source:
                    targetObj.source_id = source.value;
                    break;
            }
            onExport(exportType, targetObj, fromDate, toDate);
        }
    }, [exportType, targetType, patient, assistant, provider, staff, source, fromDate, toDate]);

    const renderSelectMode = (exportType) => {
        switch(exportType){
            case 0:
            case 1:
                return <RadioGroup 
                            row aria-label="position" 
                            name="position" 
                            defaultValue="top" 
                            value={targetType}
                            onChange={handleChangeTarget}
                        >
                            <FormControlLabel value={lists.exportObj.targetType.all} control={<Radio color="secondary" />} label={t(strings.all)} />
                            <FormControlLabel value={lists.exportObj.targetType.patient} control={<Radio color="secondary" />} label={t(strings.patient)} />
                            <FormControlLabel value={lists.exportObj.targetType.assistant} control={<Radio color="secondary" />} label={t(strings.assistant)} />
                            <FormControlLabel value={lists.exportObj.targetType.provider} control={<Radio color="secondary" />} label={t(strings.provider)} />
                        </RadioGroup>
            case 2:
                return <RadioGroup 
                            row aria-label="position" 
                            name="position" 
                            defaultValue="top" 
                            value={targetType}
                            onChange={handleChangeTarget}
                        >
                            <FormControlLabel value={lists.exportObj.targetType.all} control={<Radio color="secondary" />} label={t(strings.all)} />
                            <FormControlLabel value={lists.exportObj.targetType.patientAll} control={<Radio color="secondary" />} label={t(strings.patient)} />
                            <FormControlLabel value={lists.exportObj.targetType.staff} control={<Radio color="secondary" />} label={t(strings.staffs)} />
                            <FormControlLabel value={lists.exportObj.targetType.source} control={<Radio color="secondary" />} label={t(strings.source)} />
                        </RadioGroup>
        }
    }

  return (
    <Paper className={classes.paper}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
        aria-labelledby="export-dialog-title"
        classes={{ 
          paper: classes.paper,
        }}
      >
        <DialogTitle id="export-dialog-title" className={classes.dialogTitle}>{t(strings.select) + " " + t(strings.document)}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
            <DialogContentText>
                <FormControl component="fieldset" className={classes.radioBtnFormControl}>
                    <RadioGroup 
                        row aria-label="position" 
                        name="position" 
                        defaultValue="top" 
                        value={exportType}
                        onChange={handleChangeExportType}
                    >
                        <FormControlLabel value={lists.exportObj.type.appointment} control={<Radio color="secondary" />} label={t(strings.appointment)} />
                        <FormControlLabel value={lists.exportObj.type.treatment} control={<Radio color="secondary" />} label={t(strings.treatment)} />
                        <FormControlLabel value={lists.exportObj.type.referral} control={<Radio color="secondary" />} label={t(strings.referral)} />
                    </RadioGroup>
                </FormControl>
                
                <FormControl component="fieldset" className={classes.radioBtnFormControl}>
                    {renderSelectMode(exportType)}
                </FormControl>
                {/* Patient Autocomplete */}
                <div style={{display: (targetType === lists.exportObj.targetType.patient)? 'block' : 'none'}}>
                    <AsyncSelect 
                        item
                        cacheOptions 
                        defaultOptions 
                        loadOptions={loadPatientOptions}
                        defaultValue={noneOption}
                        styles={selectStyle}
                        placeholder={t(strings.select) + " " + t(strings.patient)}
                        noOptionsMessage={() => t(strings.noOptions)}
                        onChange={handleOnSelectPatient}
                        value={patient}
                    />
                </div>
                {/* Assistant Autocomplete */}
                <div style={{display: (targetType === lists.exportObj.targetType.assistant)? 'block' : 'none'}}>
                    <AsyncSelect 
                        item
                        cacheOptions 
                        defaultOptions 
                        loadOptions={loadAssistantOptions}
                        defaultValue={noneOption}
                        styles={selectStyle}
                        placeholder={t(strings.select) + " " + t(strings.assistant)}
                        noOptionsMessage={() => t(strings.noOptions)}
                        onChange={handleOnSelectAssistant}
                        value={assistant}
                    />
                </div>
                {/* Provider Autocomplete */}
                <div style={{display: (targetType === lists.exportObj.targetType.provider)? 'block' : 'none'}}>
                    <AsyncSelect 
                        item
                        cacheOptions 
                        defaultOptions 
                        loadOptions={loadProviderOptions}
                        defaultValue={noneOption}
                        styles={selectStyle}
                        placeholder={t(strings.select) + " " + t(strings.assistant)}
                        noOptionsMessage={() => t(strings.noOptions)}
                        onChange={handleOnSelectProvider}
                        value={provider}
                    />
                </div>
                {/* Staff Autocomplete */}
                <div style={{display: (targetType === lists.exportObj.targetType.staff)? 'block' : 'none'}}>
                    <AsyncSelect 
                        item
                        cacheOptions 
                        defaultOptions 
                        loadOptions={loadStaffOptions}
                        defaultValue={noneOption}
                        styles={selectStyle}
                        placeholder={t(strings.select) + " " + t(strings.staffs)}
                        noOptionsMessage={() => t(strings.noOptions)}
                        onChange={handleOnSelectStaff}
                        value={staff}
                    />
                </div>
                {/* Source Autocomplete */}
                <div style={{display: (targetType === lists.exportObj.targetType.source)? 'block' : 'none'}}>
                    <AsyncSelect 
                        item
                        cacheOptions 
                        defaultOptions 
                        loadOptions={loadSourceOptions}
                        defaultValue={noneOption}
                        styles={selectStyle}
                        placeholder={t(strings.select) + " " + t(strings.source)}
                        noOptionsMessage={() => t(strings.noOptions)}
                        onChange={handleOnSelectSource}
                        value={source}
                    />
                </div>
                {Boolean(errMsg) && 
                    <FormHelperText
                        className={classes.formMessageFail}
                        error={true}
                    >
                        {errMsg}
                    </FormHelperText>
                }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleExport} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default ExportDocumentDialog;