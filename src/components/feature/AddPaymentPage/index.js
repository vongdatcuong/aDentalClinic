import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// @material-ui/core Component
import Container from "@material-ui/core/Container";
import style from "./jss";
import strings from "../../../configs/strings";

// moment

// use i18next
import { useTranslation, Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// Component
import { TextField } from "@material-ui/core";
import TreatmentMenu from "../../../layouts/TreatmentMenu";
import NoDataIcon from "../../common/NoDataIcon";

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

// Route
import path from "../../../routes/path.js";

const useStyles = makeStyles(style.styles);

const AddTreatmentPage = ({ patientID }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { loadingState, dispatchLoading } = useContext(loadingStore);

  // Others
  const emptyStr = "...";

  // States
  const [transaction, setTransaction] = useState({});
  const [changeAmount, setChangeAmount] = useState(0);
  const [pay, setPay] = useState(0);
  const [note, setNote] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [payType, setPayType] = useState("CASH");

  const [payErrMsg, setPayErrMsg] = useState("");

  const handleChangePayType = (event) => {
    setPayType(event.target.value);
  };
  // fetch category
  useEffect(async () => {
    try {
      const result = await TransactionService.getPatientPaymentInfo(patientID);
      if (result.success) {
        setTransaction(result.payload);
        if (
          result.payload.treatment_list &&
          result.payload.treatment_list.length > 0
        ) {
          setSubmitDisabled(false);
        }
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
    let newPay = Number(evt.target.value);
    setPay(newPay);
    let newChangeAmount = Math.round((newPay - (transaction.amount || 0) + Number.EPSILON) * 100) / 100;
    setChangeAmount(newChangeAmount > 0 ? newChangeAmount : 0);
  };

  const handleOnNoteChange = (evt) => {
    setNote(evt.target.value);
  };

  const handleOnAddPayment = useCallback(
    async (evt) => {
      evt.preventDefault();

      let isValid = true;
      // Pay
      if (!pay && payType === "CASH") {
        setPayErrMsg(t(strings.payErrMsg));
        isValid = false;
      }
      // Pay amount > transaction amount
      else if (pay < transaction.amount && payType === "CASH") {
        setPayErrMsg(t(strings.payNotEnoughErrMsg));
        isValid = false;
      } else {
        setPayErrMsg("");
      }

      if (isValid) {
        setSubmitDisabled(true);
        try {
          dispatchLoading({ type: strings.setLoading, isLoading: true });
          const result = await TransactionService.addPatientPayment({
            ...transaction,
            paid_amount: pay || 0,
            note: note || "",
            mode: payType || "CASH",
          });
          if (result.success) {
            toast.success(
              t(strings.makePaymentSuccess) + " 5 " + t(strings.seconds),
              {
                hideProgressBar: false,
                autoClose: 5000,
                onClose: () => {
                  history.push(
                    path.patientProfilePath.replace(":patientID", patientID)
                  );
                },
              }
            );
          } else {
            toast.error(result.message);
            setSubmitDisabled(false);
          }
        } catch (err) {
          toast.error(t(strings.makePaymentErrMsg));
          setSubmitDisabled(false);
        } finally {
          dispatchLoading({ type: strings.setLoading, isLoading: false });
        }
      }
    },
    [transaction, pay, note, payType]
  );

  return (
    <React.Fragment>
      <TreatmentMenu patientID={patientID} />
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h5" component="h5">
          {t(strings.payment)}
        </Typography>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          spacing={2}
          className={classes.gridContainer}
        >
          <Grid item md={9} sm={9} xs={8}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className={classes.titleColumn}
                      width="5%"
                    >
                      #
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.titleColumn}
                      width="10%"
                    >
                      {t(strings.procedure)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.titleColumn}
                      width="15%"
                    >
                      {t(strings.date)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.titleColumn}
                      width="45%"
                    >
                      {t(strings.description)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.titleColumn}
                      width="15%"
                    >
                      {t(strings.fee)} ({t(strings.CURRENCY_PRE)})
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction.treatment_list &&
                  transaction.treatment_list.length > 0 ? (
                    <React.Fragment>
                      {transaction.treatment_list.map((treatment, index) => (
                        <TableRow key={treatment._id}>
                          <TableCell align="center" width="5%">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {treatment.ada_code || emptyStr}
                          </TableCell>
                          <TableCell align="center">
                            {treatment.treatment_date
                              ? ConvertDateTimes.formatDate(
                                  treatment.treatment_date,
                                  strings.defaultDateFormat
                                )
                              : emptyStr}
                          </TableCell>
                          <TableCell align="left">
                            {treatment.description || emptyStr}
                          </TableCell>
                          <TableCell align="center">
                            {treatment.fee?.$numberDecimal
                              ? Number(treatment.fee?.$numberDecimal)
                              : emptyStr}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={3} align="right">
                          <b>{t(strings.total)}</b>
                        </TableCell>
                        <TableCell align="center">
                          <b>{transaction.amount}</b>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className={classes.noDataWrapper}>
                        <NoDataIcon />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container item md={3} sm={3} xs={4}>
            <Paper className={classes.inputPaperWrapper}>
              {/* Pay */}
              <Grid item md={12} sm={12} xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{t(strings.type)}</FormLabel>
                  <RadioGroup
                    aria-label="payType"
                    name="payType"
                    value={payType}
                    onChange={handleChangePayType}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <FormControlLabel
                        value="CASH"
                        control={<Radio />}
                        label={t(strings.cash)}
                      />
                      <FormControlLabel
                        value="MOMO"
                        control={<Radio />}
                        label={t(strings.momo)}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <br />
              {payType === "CASH" ? (
                <Grid item md={12} sm={12} xs={12}>
                  <TextField
                    label={t(strings.payment) + " ($)"}
                    id="payment-amount"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="number"
                    onBlur={handleOnPayChange}
                    InputProps={{
                      inputProps: {
                        step: 0.01,
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={payErrMsg}
                    error={Boolean(payErrMsg)}
                  />
                </Grid>
              ) : null}
              {payType === "CASH" ? <br /> : null}
              {/* Note */}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* Return amount */}
              {payType === "CASH" ? (
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={1}
                  className={classes.formGroup}
                >
                  <span>
                    <b>{t(strings.changeMoney)}</b>: ${changeAmount || 0}
                  </span>
                </Grid>
              ) : null}
              {/* Button */}
              <Grid
                container
                item
                md={12}
                sm={12}
                xs={12}
                spacing={1}
                className={classes.formGroup}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addBtn}
                  onClick={handleOnAddPayment}
                  disabled={submitDisabled}
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
