import React, { useState, useEffect, useCallback} from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import { GridOverlay, DataGrid } from '@material-ui/data-grid';

// Icons
import NoDataIcon from '../../../common/NoDataIcon';

// Context
import { loadingStore } from '../../../../contexts/loading-context';

// Utils
import ConvertDateTimes from '../../../../utils/datetimes/convertDateTimes';

// API
import api from '../../../../api/base-api';
import apiPath from '../../../../api/path';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.appointTreatmentDialogWidth,
    maxWidth: '100%',
    maxHeight: theme.appointTreatmentDialogMaxHeight
  },
  dialogTitle: {
    fontWeight: 700,
    textAlign: 'center'
  },
  dataGrid: {
    '& .MuiDataGrid-colCellTitle': {
      fontWeight: 600
    },
    '& .MuiDataGrid-colCellTitleContainer': {
      justifyContent: 'flex-start'
    }
  },
  tooltipCell: {
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    textOverflow: 'ellipsis',
    maxWidth: 169
  }
}));

const noRowsStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    flexDirection: 'column',
    '& .ant-empty-img-1': {
      fill: theme.palette.type === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.type === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.type === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.type === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.type === 'light' ? '0.8' : '0.08',
      fill: theme.palette.type === 'light' ? '#f5f5f5' : '#fff',
    },
  },
  label: {
    marginTop: theme.spacing(1),
  },
}));

const CustomNoRowsOverlay = () => {
  const classes = noRowsStyle();
  const [t, i18n] = useTranslation();

  return (
    <GridOverlay className={classes.root}>
      <NoDataIcon/>
      <div className={classes.label}>{t(strings.noOptions)}</div>
    </GridOverlay>
  );
}

const TreatmentDialog = ({
  open, patientID, selectedDate,
  onClose, onSelect
}) => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      field: 'date',
      headerName: t(strings.date),
      type: 'date',
      flex: 0.13
    },
    {
      field: 'code',
      headerName: t(strings.code),
      type: 'number',
      flex: 0.1
    },
    {
      field: 'tooth',
      headerName: t(strings.tooth),    
      sortable: false,
      flex: 0.1
    },
    {
      field: 'surface',
      headerName: t(strings.surface),    
      sortable: false,
      flex: 0.1
    },
    {
      field: 'provider',
      headerName: t(strings.provider),    
      sortable: false,
      flex: 0.15,
      renderCell: (params) =>  {
        return (
        <Tooltip title={params.value}>
          <span className={classes.tooltipCell}>{params.value}</span>
        </Tooltip>
      )},
    },
    {
      field: 'assistant',
      headerName: t(strings.assistant),    
      sortable: false,
      flex: 0.15,
      renderCell: (params) =>  {
        return (
        <Tooltip title={params.value}>
          <span className={classes.tooltipCell}>{params.value}</span>
        </Tooltip>
      )},
    },
    {
      field: 'status',
      headerName: t(strings.status),    
      sortable: false,
      flex: 0.15
    },
    {
      field: 'fee',
      headerName: t(strings.fee),    
      sortable: false,
      flex: 0.12
    },
  ];
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]); // Only ID
  const [originalSelectedTreatments, setOriginalSelectedTreatments] = useState([]);

  let noneStr = t(strings.none);
  let currencyStr = t(strings.CURRENCY_PRE);
  const [lastPatientID, setLastPatientID] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");

  // use effect
  useEffect(async () => {
    
  }, [treatments])

  const handleLoadTreatments = useCallback(async () => {
    setOriginalSelectedTreatments([...selectedTreatments]);
    if (patientID){
      const selectedDateStr = ConvertDateTimes.formatDate(selectedDate, strings.defaultDateFormat);
      if (1 || patientID != lastPatientID || selectedDateStr != lastSelectedDate){
        try {
          setIsLoading(true);
          const promises = [
              api.httpGet({
                  url: apiPath.treatment.treatment + apiPath.patient.patient + '/' + patientID,
                  query: {
                    get_staff: true,
                    query_date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                    link: true,
                  }
              }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
            //setLastPatientID(patientID);
            //setLastSelectedDate(selectedDateStr);
            const columnss = result[0].payload.map((treatment) => {
              const assistant = treatment.assistant?.user;
              const provider = treatment.provider?.user;
              return ({
                id: treatment._id,
                date: (treatment.treatment_date)? ConvertDateTimes.formatDate(new Date(treatment.treatment_date), strings.defaultDateFormat) : noneStr,
                code: treatment.ada_code || noneStr,
                tooth: treatment.tooth || noneStr,
                surface: treatment.surface || noneStr,
                provider: (provider)? (provider.first_name + " " + provider.last_name) : noneStr,
                assistant: (assistant)? (assistant.first_name + " " + assistant.last_name) : noneStr,
                status: treatment.status || noneStr,
                fee: (treatment.fee.$numberDecimal)? `${currencyStr}${Number(treatment.fee.$numberDecimal)}` : 0,
                description: treatment.description || noneStr
            })});
            setTreatments(columnss);
            setSelectedTreatments([]);
          } else {
              toast.error(result.message);
              setTreatments([]);
              setSelectedTreatments([]);
              setOriginalSelectedTreatments([]);
              //setLastPatientID("");
              //setLastSelectedDate("");
          }
        } catch(err){
            toast.error(t(strings.loadTreatmentErrMsg));
            setTreatments([]);
            setSelectedTreatments([]);
            setOriginalSelectedTreatments([]);
            //setLastPatientID("");
            //setLastSelectedDate("");
        } finally {
          setIsLoading(false);
        }
      }
      
    } else {
      setTreatments([]);
      setSelectedTreatments([]);
      setOriginalSelectedTreatments([]);
      //setLastPatientID("");
      //setLastSelectedDate("");
    }
  }, [selectedTreatments ,patientID, selectedDate]);

  const handleOnCheckTreatments = (newSelection) => {
    setSelectedTreatments(newSelection.selectionModel);
  }

  const handleOnSetTreatments = () => {
    const newTreatments = treatments.filter((treatment) => selectedTreatments.indexOf(treatment.id) != -1);
    onSelect(newTreatments);
    onClose();
  }

  const handleOnClose = () => {
    setSelectedTreatments(originalSelectedTreatments);
    onClose();
  }

  return (
    <Paper>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
        aria-labelledby="treatment-dialog-title"
        classes={{ 
          paper: classes.paper,
        }}
        onEntering={handleLoadTreatments}
      >
        <DialogTitle id="treatment-dialog-title" className={classes.dialogTitle}>{t(strings.select) + " " + t(strings.treatments)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DataGrid 
                autoHeight
                disableColumnSelector
                disableColumnMenu
                density="compact"
                rows={treatments} 
                columns={columns} 
                pageSize={10}
                checkboxSelection 
                className={classes.dataGrid}
                loading={isLoading}
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                selectionModel={selectedTreatments}
                onSelectionModelChange={handleOnCheckTreatments}
                />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnSetTreatments} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default TreatmentDialog;