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
    width: theme.appointRecallDialogWidth,
    maxWidth: '100%',
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

const RecallDialog = ({
  loadedRecalls, open, patientID, selectedDate,
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
      flex: 0.15
    },
    {
      field: 'code',
      headerName: t(strings.code),
      type: 'number',
      flex: 0.15
    },
    {
      field: 'note',
      headerName: t(strings.note),    
      sortable: false,
      flex: 0.7
    },
  ];
  const [recalls, setRecalls] = useState([]);
  const [selectedRecalls, setSelectedRecalls] = useState([]); // Only ID
  const [originalSelectedRecalls, setOriginalSelectedRecalls] = useState([]);

  let noneStr = t(strings.none);
  const [lastPatientID, setLastPatientID] = useState("");
  const [lastSelectedDate, setLastSelectedDate] = useState("");

  // use effect
  useEffect(async () => {
    
  }, [loadedRecalls])

  const handleLoadRecalls = useCallback(async () => {
    let loadedRecallIDs = loadedRecalls.map((recall) => recall.id);
    setOriginalSelectedRecalls([...loadedRecallIDs]);
    if (patientID){
      const selectedDateStr = ConvertDateTimes.formatDate(selectedDate, strings.defaultDateFormat);
      if (patientID != lastPatientID || selectedDateStr != lastSelectedDate){
        try {
          setIsLoading(true);
          const promises = [
              api.httpGet({
                  url: apiPath.recall.recall + apiPath.patient.patient + '/' + patientID,
                  query: {
                    date: ConvertDateTimes.formatDate(selectedDate, strings.apiDateFormat),
                  }
              }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
            setLastPatientID(patientID);
            setLastSelectedDate(selectedDateStr);
            const columnss = result[0].payload.map((recall) => ({
              id: recall._id,
              date: (recall.recall_date)? ConvertDateTimes.formatDate(new Date(recall.recall_date), strings.defaultDateFormat) : noneStr,
              code: recall.procedure || noneStr,
              note: recall.note || noneStr
            }));
            setRecalls(columnss);
            setSelectedRecalls(loadedRecallIDs);
          } else {
              toast.error(result.message);
              setRecalls([]);
              setSelectedRecalls([]);
              setOriginalSelectedRecalls([]);
              setLastPatientID("");
              setLastSelectedDate("");
          }
        } catch(err){
            toast.error(t(strings.loadRecallErrMsg));
            setRecalls([]);
            setSelectedRecalls([]);
            setOriginalSelectedRecalls([]);
            setLastPatientID("");
            setLastSelectedDate("");
        } finally {
          setIsLoading(false);
        }
      } // Else if nothing change
      
    } else {
      setRecalls([]);
      setSelectedRecalls([]);
      setOriginalSelectedRecalls([]);
      setLastPatientID("");
      setLastSelectedDate("");
    }
  }, [selectedRecalls, patientID, selectedDate, loadedRecalls])

  const handleOnCheckRecalls = (newSelection) => {
    setSelectedRecalls(newSelection.selectionModel);
  }

  const handleOnSetRecalls = () => {
    const newRecalls = recalls.filter((recall) => selectedRecalls.indexOf(recall.id) != -1);
    onSelect(newRecalls);
    onClose();
  }

  const handleOnClose = () => {
    setSelectedRecalls(originalSelectedRecalls);
    onClose();
  }

  return (
    <Paper>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleOnClose}
        aria-labelledby="recall-dialog-title"
        classes={{ 
          paper: classes.paper,
        }}
        onEntering={handleLoadRecalls}
      >
        <DialogTitle id="recall-dialog-title" className={classes.dialogTitle}>{t(strings.select) + " " + t(strings.recall)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DataGrid 
                autoHeight
                disableColumnSelector
                disableColumnMenu
                density="compact"
                rows={recalls} 
                columns={columns} 
                pageSize={10} 
                checkboxSelection 
                className={classes.dataGrid}
                loading={isLoading}
                components={{
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
                selectionModel={selectedRecalls}
                onSelectionModelChange={handleOnCheckRecalls}
                />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOnClose} color="secondary" variant="outlined" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnSetRecalls} color="primary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default RecallDialog;