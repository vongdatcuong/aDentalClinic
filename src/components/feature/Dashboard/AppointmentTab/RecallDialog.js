import React, { useState, useEffect} from 'react';
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
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>{t(strings.noOptions)}</div>
    </GridOverlay>
  );
}

const RecallDialog = ({
  open, patientID,
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
  const [selectedRecalls, setSelectedRecalls] = useState([]);
  const [originalSelectedRecalls, setOriginalSelectedRecalls] = useState([]);

  const rows = [
    {
      id: 1,
      date: "2018-24-12",
      code: "D2392",
      note: "ABCDEFGH",
    },
    {
      id: 2,
      date: "2018-24-12",
      code: "D2392",
      note: "ABCDEFGH"
    },
    {
      id: 3,
      date: "2018-24-12",
      code: "D2392",
      note: "ABCDEFGH"
    },
  ];
  let noneStr = t(strings.none);
  let lastPatientID = "";

  // use effect
  useEffect(async () => {
    
  }, [recalls])

  const handleLoadRecalls = async () => {
    setOriginalSelectedRecalls([...selectedRecalls]);
    if (patientID){
      if (patientID != lastPatientID){
        try {
          setIsLoading(true);
          const promises = [
              api.httpGet({
                  url: apiPath.recall.recall + apiPath.patient.patient + '/' + patientID
              }),
          ];
          const result = await Promise.all(promises);
          if (result[0].success){
            lastPatientID = patientID;
            const columnss = result[0].payload.map((recall) => ({
              id: recall._id,
              date: (recall.recall_date)? ConvertDateTimes.formatDate(new Date(recall.recall_date), strings.defaultDateFormat) : noneStr,
              code: recall.procedure || noneStr,
              note: recall.note || noneStr
            }));
            setRecalls(columnss);
          } else {
              toast.error(result.message);
          }
        } catch(err){
            toast.error(t(strings.loadRecallErrMsg));
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setRecalls([]);
      setSelectedRecalls([]);
    }
  }

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
          <Button autoFocus onClick={handleOnClose} color="primary" variant="contained" autoFocus>
            {t(strings.cancel)}
          </Button>
          <Button onClick={handleOnSetRecalls} color="secondary" variant="contained">
            {t(strings.ok)}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default RecallDialog;