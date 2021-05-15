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
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
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
  open,
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
  const [exportType, setExportType] = useState(lists.exportObj.type.appointment);
  const [patient, setPatient] = useState(noneOption);

  // Error Mesages
  const [patientErrMsg, setPatientErrMsg] = useState("");

  // use effect
  useEffect(async () => {
    
  }, [])

  const handleOnClose = () => {
    onClose();
  }

  const handleChangeExportType = useCallback((evt) => {
      setExportType(Number(evt.target.value));
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
            options.unshift({value: "", label: t(strings.none)});
            resolve(options);
        } catch(err){
            toast.error(err);
        }
      });
    };

    const handleOnSelectPatient = useCallback((option) => {
        setPatient(option);
    }, []);

    const handleExport = useCallback(() => {
        let isValid = true;

        // Patient
        if (exportType === lists.exportObj.type.patient && !patient.value){
            setPatientErrMsg(t(strings.patientErrMsg));
            isValid = false;
        } else {
            setPatientErrMsg("");
        }
        if (isValid){
            onExport(exportType, patient);
        }
    }, [patient, exportType])

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
        <DialogTitle id="export-dialog-title" className={classes.dialogTitle}>{t(strings.select) + " " + t(strings.recall)}</DialogTitle>
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
                        <FormControlLabel value={lists.exportObj.type.patient} control={<Radio color="secondary" />} label={t(strings.patientInformation)} />
                    </RadioGroup>
                </FormControl>

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
                {Boolean(patientErrMsg) && 
                    <FormHelperText
                        className={classes.formMessageFail}
                        error={true}
                    >
                        {t(patientErrMsg)}
                    </FormHelperText>
                }
                *<i className={classes.note}>{t(strings.noPatientLoadAllAppoints)}</i>
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