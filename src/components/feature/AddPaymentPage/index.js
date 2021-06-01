import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import style from "./jss";
import strings from "../../../configs/strings";
import figures from "../../../configs/figures";
import lists from "../../../configs/lists";

// moment
import moment from "moment";

// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Component
import {
  TextField,
} from "@material-ui/core";
import TreatmentMenu from "../../../layouts/TreatmentMenu";

// Toast
import { toast } from "react-toastify";

// Stepping
import Typography from "@material-ui/core/Typography";

// API
import TransactionService from "../../../api/transaction/transaction.service";

// Context
import { loadingStore } from "../../../contexts/loading-context";

// Utils
import ConvertDateTimes from "../../../utils/datetimes/convertDateTimes";


const useStyles = makeStyles(style.styles);

const AddTreatmentPage = ({ patientID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  // Others
  const emptyStr = "...";
  
  // States
  const [treatments, setTreatments] = useState([]);
  const [pay, setPay] = useState(0);
  const [note, setNote] = useState("");

  // Ref
  const payRef = useRef(null);
  const noteRef = useRef(null);

  const TAX_RATE = 0.07;
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  
  function priceRow(qty, unit) {
    return qty * unit;
  }
  
  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }
  
  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  
  // fetch category
  useEffect(async () => {
    try {
      const result = await TransactionService.getPatientPaymentInfo(patientID);
      if (result.success) { console.log(result.payload.treatment_list);
        setTreatments(result.payload.treatment_list);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error(t(strings.loadTreatmentErrMsgs));
    } finally {
      dispatchLoading({ type: strings.setLoading, isLoading: false });
    }
  }, []);
  

  
  const handleOnPayChange = (evt) => {
    setPay(evt.target.value);
  }

  const handleOnNoteChange = (evt) => {
    setNote(evt.target.value);
  }

  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        {/* <PopupChat></PopupChat> */}
        <Typography className={classes.title} variant="h5" component="h5">{t(strings.payment)}</Typography>
        <Grid
          container xs={12} sm={12} md={12} spacing={2}
          className={classes.gridContainer}
        >
          <Grid item md={9} sm={9} xs={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={classes.titleColumn}>#</TableCell>
                    <TableCell align="center" className={classes.titleColumn}>{t(strings.procedureCode)}</TableCell>
                    <TableCell align="center" className={classes.titleColumn}>{t(strings.date)}</TableCell>
                    <TableCell align="center" className={classes.titleColumn}>{t(strings.description)}</TableCell>
                    <TableCell align="center" className={classes.titleColumn}>{t(strings.fee)}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {treatments.map((treatment, index) => (
                    <TableRow key={treatment._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="right">{treatment.procedure_code || emptyStr}</TableCell>
                      <TableCell align="right">{(treatment.treatment_date)? ConvertDateTimes.formatDate(treatment.treatment_date, strings.defaultDateFormat) : emptyStr}</TableCell>
                      <TableCell align="right">{treatment.description || emptyStr}</TableCell>
                      <TableCell align="right">{Number(treatment.fee?.$numberDecimal) || emptyStr}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>{t(strings.total)}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container item md={3} sm={3} xs={4}>
            <Paper className={classes.inputPaperWrapper}>
              {/* Pay */}
              <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                  {/* Group title */}
                  <Grid item md={12} sm={12} xs={12}>
                      <TextField
                          label={t(strings.payment) + " ($)"}
                          id="appointment-note"
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="number"
                          onBlur={handleOnPayChange}
                          inputRef={payRef}
                          InputProps={
                            { 
                              inputProps: { 
                                step: 0.01
                              } 
                            }
                          }
                          InputLabelProps={{
                              shrink: true
                          }}
                      />
                  </Grid>
              </Grid>
              <br/>
              {/* Note */}
              <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                  {/* Group title */}
                  <Grid item md={12} sm={12} xs={12}>
                      <TextField
                          label={t(strings.note)}
                          id="payment-note"
                          className={classes.textField}
                          margin="dense"
                          variant="outlined"
                          size="small"
                          fullWidth
                          type="text"
                          multiline
                          rows={6}
                          onBlur={handleOnNoteChange}
                          inputRef={noteRef}
                          InputLabelProps={{
                              shrink: true
                          }}
                      />
                  </Grid>
              </Grid>
              {/* Button */}
              <Grid container item md={12} sm={12} xs={12} spacing={1} className={classes.formGroup}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addBtn}
                  >
                    {t(strings.add)}
                  </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default AddTreatmentPage;
