import React, {useState, useEffect, useContext, useRef, useCallback} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
import styles from "./jss";
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';
import lists from '../../../configs/lists';
import moment from "moment";

// use i18next
import { useTranslation } from 'react-i18next';

// Date Picker
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

// Toast
import { toast } from 'react-toastify';

// Context
import { themeStore } from '../../../contexts/theme-context';
import { loadingStore } from '../../../contexts/loading-context';

// @material-ui/core Component
import Container from "@material-ui/core/Container"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// @material-ui/core/icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

// Component
import Footer from '../../../layouts/Footer';
import LoadingPage from '../../../layouts/LoadingPage';
import ExportDocumentDialog from './ExportDocumentDialog';

// Charjs
import Chart from "chart.js";
import { Divider } from '@material-ui/core';

// Theme

// API
import api from '../../../api/base-api';
import apiPath from '../../../api/path';

// Utils
import ConvertDateTimes from '../../../utils/datetimes/convertDateTimes';

const useStyles = makeStyles(styles);


const generateLineChart = (elId, title, fromDateM, toDateM, yLabel, color, data, precision) => {
  const chartEl = document.getElementById(elId);
  if (!chartEl){
    return;
  }
  const numDay = toDateM.diff(fromDateM, 'days');
  const labels = [fromDateM.format("DD/MM")];
  for (let i = 0; i < numDay; i++){
    labels.push(fromDateM.add(1, 'days').format("DD/MM"));
  }
    
  return new Chart(chartEl, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        { 
          data: data,
          //label: t(strings.CURRENCY),
          backgroundColor: color,
          fill: true
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: title,
        fontSize: 18
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
            scaleLabel: {
              display: true,
              labelString: yLabel,
            },
            ticks: {
              beginAtZero: true,
              precision: precision || 0
            },
          }]
      }
    }
  });
}

const generateCircularChart = (id, text, color) => {
  const el = document.getElementById(id);
  if (!el) return;
  new Chart(el, {
      type: 'doughnut',
      data: {
        datasets: [{
          backgroundColor: [color],
          data: [100]
        }]
      },
      plugins: [{
        beforeDraw: function(chart) {
          const width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
      
          ctx.restore();
          const fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.fillStyle = color;
          ctx.opacity = 0;
          ctx.textBaseline = "middle";
      
          const textX = Math.round((width - ctx.measureText(text.toUpperCase()).width) / 2),
                textY = height / 2;
      
          ctx.fillText(text.toUpperCase(), textX, textY);
          ctx.save();
        }
      }],
        options: {
          tooltips: {
            enabled: false
          },
          legend: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 82
        }
    });
}

const Report = () => {
    const classes = useStyles();
    const {t, i18next} = useTranslation();
    const {themeState, dispatchTheme} = useContext(themeStore);
    const {loadingState, dispatchLoading} = useContext(loadingStore);

    // States
    const [isWillMount, setIsWillMount] = useState(true);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [fromDate, setFromDate] = useState(moment().add(-1 * figures.statisDayRangeDefault, 'days')._d);
    const [toDate, setToDate] = useState(new Date());
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const [applyFromDate, setApplyFromDate] = useState(fromDate);
    const [applyToDate, setApplyToDate] = useState(toDate);

    const dateModifiers = { start: fromDate, end: toDate };

    // Charts
    const financeChartId = 'finance-chart';
    const appointmentChartId = 'appointment-chart';
    const workHourChartId = "work-hour-chart";
    const newPatientChartId = "new-patient-chart";
    const treatmentPlanChartId = "treatment-plant-chart";

    // Card Report
    const [cardReport, setCardReport] = useState([]);
    const [cardValues, setCardValues] = useState([]);

    // Chart
    const [financeChartCanvas, setFinanceChartCanvas] = useState(null);
    const [appointChartCanvas, setAppointChartCanvas] = useState(null);

    // Circular Report
    const [circularReport, setCircularReport] = useState([
      {
        title: t(strings.workHour),
        content: {
          value: 20,
          unit: t(strings.hours),
          chartId: workHourChartId
        },
        action: [
          {
            value: 20,
            unit: t(strings.hourShort),
            group: t(strings.total)
          },
          {
            value: 0,
            unit: t(strings.hourShort),
            group: t(strings.busy)
          }
        ],
        chartId: workHourChartId
      },
      {
        title: t(strings.newPatient),
        content: {
          value: 5,
          unit: t(strings.patientsShort),
          chartId: newPatientChartId
        },
        action: [
          {
            value: 4,
            unit: "",
            group: t(strings.completed)
          },
          {
            value: 1,
            unit: "",
            group: t(strings.rejected)
          }
        ],
        chartId: newPatientChartId
      },
      {
        title: t(strings.treatmentPlan),
        content: {
          value: 10,
          unit: "",
          chartId: treatmentPlanChartId
        },
        action: [
          {
            value: 8,
            unit: t(strings.percent),
            group: t(strings.accept)
          },
          {
            value: 2,
            unit: t(strings.percent),
            group: t(strings.reject)
          }
        ],
        chartId: treatmentPlanChartId
      }
    ]);

    // Dialogs
    const [openExportDialog, setOpenExportDialog] = useState(false);
    

    useEffect(async () => {
      let newCircularReportVals = [];
      try {
        // Distinguish between will mount and did update
        if (!isWillMount){
          dispatchLoading({type: strings.setLoading, isLoading: true});
        } else {
          setIsWillMount(false);
        }
        const result = await api.httpGet({
          url: apiPath.report.report,
          query: {
            startDate: ConvertDateTimes.formatDate(applyFromDate, strings.apiDateFormat),
            endDate: ConvertDateTimes.formatDate(applyToDate, strings.apiDateFormat),
          }
        });
        if (result.success){
          const dat = result.payload;
          let totalAppointReq = 0;
          dat.appointment_request?.forEach((req) => {
            totalAppointReq+= req.count || 0;
          });
          // Card Reports
          setCardReport([
            {
              label: t(strings.payment),
              value: '$69',
              index: 0
            },
            {
              label: t(strings.appointments),
              value: '0',
              index: 1
            },
            {
              label: t(strings.procedures),
              value: '0',
              index: 2
            },
            {
              label: t(strings.treatments),
              value: '0',
              index: 3
            },
            {
              label: t(strings.patient),
              value: '0',
              index: 4
            },
            {
              label: t(strings.appointRequest),
              value: '0',
              index: 5
            }
          ]);
          const newCardValues = [
            // Payment
            "$" + dat.payment?.summary?.total_fee?.$numberDecimal || 0,
            // Appointments
            Number(dat.appointment?.count) || 0,
            // procedures
            Number(dat.procedure) || 0,
            // Tasks
            Number(dat.treatment?.total) || 0,
            // Patient
            Number(dat.patient?.patient_total) || 0,
            // Bookings
            totalAppointReq
          ];
          setCardValues(newCardValues);

          // Circular Reports
          const newCircularReport = [
            {
              title: t(strings.workHour),
              content: {
                value: 20,
                unit: t(strings.hours),
                chartId: workHourChartId
              },
              action: [
                {
                  value: 20,
                  unit: t(strings.hourShort),
                  group: t(strings.total)
                },
                {
                  value: 0,
                  unit: t(strings.hourShort),
                  group: t(strings.busy)
                }
              ],
              chartId: workHourChartId
            },
            {
              title: t(strings.newPatient),
              content: {
                value: 5,
                unit: t(strings.patientsShort),
                chartId: newPatientChartId
              },
              action: [
                {
                  value: 4,
                  unit: "",
                  group: t(strings.completed)
                },
                {
                  value: 1,
                  unit: "",
                  group: t(strings.rejected)
                }
              ],
              chartId: newPatientChartId
            },
            {
              title: t(strings.treatmentPlan),
              content: {
                value: 10,
                unit: "",
                chartId: treatmentPlanChartId
              },
              action: [
                {
                  value: 8,
                  unit: t(strings.percent),
                  group: t(strings.accept)
                },
                {
                  value: 2,
                  unit: t(strings.percent),
                  group: t(strings.reject)
                }
              ],
              chartId: treatmentPlanChartId
            }
          ];
          setCircularReport(newCircularReport);
          const startTime = dat.practice.start_time;
          const endTime = dat.practice.end_time;
          const workingHour = Number(endTime.slice(0, 2)) + Number(endTime.slice(2)) / 60 - Number(startTime.slice(0, 2)) + Number(startTime.slice(2)) / 60;
          newCircularReportVals = [
            {
              main: Math.round(workingHour * 100) / 100,
              actions: [0, 0]
            },
            {
              main: Number(dat.patient?.new_patient_total) || 0,
              actions: [0, 0]
            },
            {
              main: Number(dat.treatment?.plan_count),
              actions: [0, 0]
            }
          ];
          //setCircurlarReportValues(newCircularReportVals);

          // Chart
          const paymentData = dat.payment.chart.map((payment) => Number(payment.total_fee?.$numberDecimal) || 0);
          const appointmentData = dat.appointment.chart.map((appoint) => Number(appoint.count));

          // Finances Chart
          if (financeChartCanvas){
            financeChartCanvas.destroy();
          }
          const newFinanceCanvas = generateLineChart(financeChartId, t(strings.finances), moment(applyFromDate), moment(applyToDate), 'USD', themeState.theme.infoColor[0], paymentData, 2);
          setFinanceChartCanvas(newFinanceCanvas);
          // Appointment Chart
          if (appointChartCanvas){
            appointChartCanvas.destroy();
          }
          const newAppointCanvas = generateLineChart(appointmentChartId, t(strings.appointment), moment(applyFromDate), moment(applyToDate), t(strings.appointment), themeState.theme.infoColor[0], appointmentData, 0);
          setAppointChartCanvas(newAppointCanvas);

          // Circular Report
          newCircularReport.forEach((report, index) => {
            generateCircularChart(report.chartId, newCircularReportVals[index].main + " " + report.content.unit.toUpperCase(), themeState.theme.circularProgressChart);
          });
        } else {
          toast.error(result.message);
        }
      } catch(err){
        toast.error(t(strings.loadStatisticsErrMsg));
      } finally {
        // Distinguish between will mount and did update
        if (!isWillMount){
          dispatchLoading({type: strings.setLoading, isLoading: false});
        } else {
          setIsLoadingPage(false);
        }
      };
    }, [applyFromDate, applyToDate]);

    const handleFromChange = (from) => {
      if (from && from.getTime() !== fromDate.getTime()){
        setFromDate(from);
      }
    }
  
    const handleToChange = (to) => {
      if (to && to.getTime() !== toDate.getTime()){
        setToDate(to);
      }
    }

    const handleLoadStatistics = (evt) => {
      setApplyFromDate(fromDate);
      setApplyToDate(toDate);
      /*const start = moment(fromDate).utc().startOf('day');
      const end = moment(toDate).utc().endOf('day');
      if (start._isValid && end._isValid){
        setApplyFromDate(start._d);
        setApplyToDate(end._d);
      } else {
        toast.error(t(strings.dateRangeInvalid) + '!!!');
      }*/
    }

    // Export Dialog
    const handleOpenExportDialog = useCallback(() => {
      setOpenExportDialog(true);
    }, []);

    const handleCloseExportDialog = useCallback(() => {
      setOpenExportDialog(false);
    }, []);

    const handleOnExport = (type, targetObj, fromDate, toDate) => {
      if (type === lists.exportObj.type.appointment){
        handleViewAppointDocument(targetObj, fromDate, toDate);
      } else if (type === lists.exportObj.type.treatment){
        handleViewPatientDocument(targetObj, fromDate, toDate);
      } else if (type === lists.exportObj.type.referral){
        handleViewReferralDocument(targetObj, fromDate, toDate);
      }
    };

    // View appointment document
    const handleViewAppointDocument = useCallback(async (targetObj, fromDate, toDate) => {
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        let query = {
          startDate: ConvertDateTimes.formatDate(fromDate, strings.apiDateFormat),
          endDate: ConvertDateTimes.formatDate(toDate, strings.apiDateFormat),
          ...targetObj
        };
        const result = await api.httpGet({
          url: apiPath.report.report + apiPath.report.appointment,
          query: query
        });
        if (result.success){
          const file = new Blob(
            [Buffer.from(result.payload, 'base64')], 
            {type: 'application/pdf'});
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        } else {
          toast.error(result.message);
        }
      } catch(err){
        toast.error(t(strings.loadAppointDocErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }, []);

    // View treatment document
    const handleViewPatientDocument = useCallback(async (targetObj, fromDate, toDate) => {
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await api.httpGet({
          url: apiPath.report.report + apiPath.report.treatmentHistory,
          query: {            
            startDate: ConvertDateTimes.formatDate(fromDate, strings.apiDateFormat),
            endDate: ConvertDateTimes.formatDate(toDate, strings.apiDateFormat),
            ...targetObj
          }
        });
        if (result.success){
          const file = new Blob(
            [Buffer.from(result.payload, 'base64')], 
            {type: 'application/pdf'});
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        } else {
          toast.error(result.message);
        }
      } catch(err){
        toast.error(t(strings.loadPatientDocErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }, []);

    // View referral document
    const handleViewReferralDocument = useCallback(async (targetObj, fromDate, toDate) => {
      try {
        dispatchLoading({type: strings.setLoading, isLoading: true});
        const result = await api.httpGet({
          url: apiPath.report.report + apiPath.report.referral,
          query: {            
            startDate: ConvertDateTimes.formatDate(fromDate, strings.apiDateFormat),
            endDate: ConvertDateTimes.formatDate(toDate, strings.apiDateFormat),
            ...targetObj
          }
        });
        if (result.success){
          const file = new Blob(
            [Buffer.from(result.payload, 'base64')], 
            {type: 'application/pdf'});
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        } else {
          toast.error(result.message);
        }
      } catch(err){
        toast.error(t(strings.loadPatientDocErrMsg));
      } finally {
        dispatchLoading({type: strings.setLoading, isLoading: false});
      }
    }, []);

    return (
      <Container className={classes.dummyContainer}>
          <div style={{display: isLoadingPage? 'block' : 'none'}}><LoadingPage/></div>

          <div className={classes.reportWrapper} style={{visibility: !isLoadingPage? 'visible' : 'hidden'}}>
            <Grid container className={classes.titleGrid}>
              <Grid item md={6} sm={12} xs={12}>
                <Typography className={classes.title}  variant="h5" component="h5">
                  <span>{t(strings.report)}</span>
                <CalendarTodayIcon className={classes.calendarIcon}/>
                  <div className={classes.inputFrom}>
                    <DayPickerInput
                      ref={fromRef}
                      value={fromDate}
                      placeholder={t(strings.from)}
                      format="LL"
                      formatDate={formatDate}
                      parseDate={parseDate}
                      dayPickerProps={{
                        selectedDays: [fromDate, { fromDate, toDate }],
                        disabledDays: { after:  toDate},
                        dateModifiers,
                        month: toDate,
                        toMonth: toDate,
                        numberOfMonths: 1,
                        onDayClick: () => toRef.current.input.focus(),
                      }}
                      onDayChange={handleFromChange}
                    />{' '}
                    —{' '}
                    <span className={classes.inputTo}>
                      <DayPickerInput
                        ref={toRef}
                        value={toDate}
                        placeholder={t(strings.to)}
                        format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                          selectedDays: [toDate, { fromDate, toDate }],
                          disabledDays: { before: fromDate, after: new Date() },
                          dateModifiers,
                          month: fromDate,
                          fromMonth: fromDate,
                          numberOfMonths: 1,
                        }}
                        onDayChange={handleToChange}
                      />
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    className={classes.applyBtn}
                    onClick={handleLoadStatistics}
                  >
                    {t(strings.apply)}
                  </Button>
                </Typography>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <div className={classes.actionWrapper}>
                  <Tooltip title={t(strings.viewAppointDocument)} aria-label="view-appointment-document">
                    <IconButton color="primary" aria-label="appointment-pdf" onClick={handleOpenExportDialog}>
                      <SystemUpdateAltIcon /> &nbsp;{t(strings.documents)}
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
            <Container className={classes.container}>
              {/* Card Report */}
              <Grid container spacing={2} p-y={2} justify="center" className={classes.cardReport}>
                {cardReport.map((card, index) => {
                  return (
                    <Grid key={index} item md={2} sm={4} xs={6}>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <div className={classes.cardValue}>{cardValues[card.index]}</div>
                          <Divider className={classes.cardDivider}/>
                          <Typography component="div" color="textSecondary" className={classes.cardLabel}>{card.label}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
              {/* Card Report */}
              <Grid container spacing={2} p-y={2} justify="center" className={classes.chartGrid}>
                <Grid item md={6} sm={12}>
                  <canvas id={financeChartId} className={classes.chartCanvas}></canvas>
                </Grid>
                <Grid item md={6} sm={12}>
                  <canvas id={appointmentChartId} className={classes.chartCanvas}></canvas>
                </Grid>
              </Grid>
              {/* Card Circular Report */}
              <Grid container spacing={2} p-y={2} justify="center" className={classes.cardCircularReport}>
                {/* Working Hours */}
                <Grid item md={4} key={0} className={classes.cardCircularReportItem}>
                  <Card className={classes.cardCircularReportItemCard}>
                    <CardHeader className={classes.cardCircularHeader} title={circularReport[0].title}/>
                    <CardContent>                   
                      <canvas id={circularReport[0].chartId} className={classes.circularChartCanvas}></canvas>
                    </CardContent>
                    <Divider className={classes.circularCardDivider}/>
                    {/*<CardActions>
                      <Grid container justify="center" className={classes.circularAction} spacing={3}>
                        {circularReport[0].action.map((action, index) => {
                          return (
                            <Grid item md={12 / circularReport[0].action.length} key={index}>
                              <Typography className={classes.circularActionValue}>{action.value + " " + action.unit.toUpperCase()}</Typography>
                              <Typography className={classes.circularActionGroup} color="textSecondary">{action.group.toUpperCase()}</Typography>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </CardActions>*/}
                  </Card>
                </Grid>
                {/* New Patient */}
                <Grid item md={4} key={1} className={classes.cardCircularReportItem}>
                  <Card className={classes.cardCircularReportItemCard}>
                    <CardHeader className={classes.cardCircularHeader} title={circularReport[1].title}/>
                    <CardContent>                   
                      <canvas id={circularReport[1].chartId} className={classes.circularChartCanvas}></canvas>
                    </CardContent>
                    <Divider className={classes.circularCardDivider}/>
                    {/*<CardActions>
                      <Grid container justify="center" className={classes.circularAction} spacing={3}>
                        {circularReport[1].action.map((action, index) => {
                          return (
                            <Grid item md={12 / circularReport[1].action.length} key={index}>
                              <Typography className={classes.circularActionValue}>{action.value + " " + action.unit.toUpperCase()}</Typography>
                              <Typography className={classes.circularActionGroup} color="textSecondary">{action.group.toUpperCase()}</Typography>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </CardActions>*/}
                  </Card>
                </Grid>
                {/* Treatment Plan */}
                <Grid item md={4} key={2} className={classes.cardCircularReportItem}>
                  <Card className={classes.cardCircularReportItemCard}>
                    <CardHeader className={classes.cardCircularHeader} title={circularReport[2].title}/>
                    <CardContent>                   
                      <canvas id={circularReport[2].chartId} className={classes.circularChartCanvas}></canvas>
                    </CardContent>
                    <Divider className={classes.circularCardDivider}/>
                    {/*<CardActions>
                      <Grid container justify="center" className={classes.circularAction} spacing={3}>
                        {circularReport[2].action.map((action, index) => {
                          return (
                            <Grid item md={12 / circularReport[2].action.length} key={index}>
                              <Typography className={classes.circularActionValue}>{action.value + " " + action.unit.toUpperCase()}</Typography>
                              <Typography className={classes.circularActionGroup} color="textSecondary">{action.group.toUpperCase()}</Typography>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </CardActions>*/}
                  </Card>
                </Grid>
              </Grid>
              <Footer/>
            </Container>
          </div>
          <div style={{display: 'none'}}>
            {/* Dialogs */}
            <ExportDocumentDialog
                open={openExportDialog}
                applyFromDate={applyFromDate}
                applyToDate={applyToDate}
                onClose={handleCloseExportDialog}
                onExport={handleOnExport}
            />
          </div>
      </Container>
    )
}

export default Report;