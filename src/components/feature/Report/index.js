import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  useParams,
  useHistory
} from "react-router-dom";
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import styles from "./jss";
import strings from '../../../configs/strings';
import figures from '../../../configs/figures';
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

// @material-ui/core Component
import Container from "@material-ui/core/Container"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

// @material-ui/core/icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// Component
import Footer from '../../../layouts/Footer';

// Charjs
import Chart from "chart.js";
import { Divider } from '@material-ui/core';

// Theme

const useStyles = makeStyles(styles);


const generateLineChart = (elId, title, fromDateM, toDateM, yLabel, color) => {
  const chartEl = document.getElementById(elId);
  const numDay = toDateM.diff(fromDateM, 'days');
  const labels = [fromDateM.format("DD/MM")];
  for (let i = 0; i < numDay; i++){
    labels.push(fromDateM.add(1, 'days').format("DD/MM"));
  }
    
  new Chart(chartEl, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        { 
          data: [186,1124,1406,1066,5107,111,133,221,783,2478],
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
          }
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

    // States
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

    // Circular Report
    const circularReport = [
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
          unit: t(strings.patients),
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
          unit: t(strings.percent),
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

    useEffect(() => {
        // Chart
        // Finances Chart
        generateLineChart(financeChartId, t(strings.finances), moment(applyFromDate), moment(applyToDate), t(strings.CURRENCY_CHART), themeState.theme.infoColor[0]);
        // Appointment Chart
        generateLineChart(appointmentChartId, t(strings.appointment), moment(applyFromDate), moment(applyToDate), t(strings.appointment), themeState.theme.infoColor[0]);

        // Circular Report
        circularReport.forEach((report, index) => {
          generateCircularChart(report.chartId, report.content.value + ' ' +  report.content.unit.toUpperCase(), themeState.theme.circularProgressChart);
        });

        // Disabled Date type
        fromRef.current.input.disabled = true;
        toRef.current.input.disabled = true;
    }, [applyFromDate, applyToDate]);

    // Card Report

    const [cardReport, setCardReport] = useState([
      {
        label: t(strings.payment),
        value: '$69'
      },
      {
        label: t(strings.appointments),
        value: '0'
      },
      {
        label: t(strings.procedures),
        value: '0'
      },
      {
        label: t(strings.tasks),
        value: '0'
      },
      {
        label: t(strings.invoices),
        value: '0'
      },
      {
        label: t(strings.bookings),
        value: '0'
      }
    ])

    const handleFromChange = (from) => {
      if (from && from != fromDate){
        setFromDate(from);
      }
    }
  
    const handleToChange = (to) => {
      if (to && to != toDate){
        setToDate(to);
      }
    }

    const handleLoadStatistics = (evt) => {
      const start = moment(fromDate).startOf('day');
      const end = moment(toDate).endOf('day');
      if (start._isValid && end._isValid){
        setApplyFromDate(start._d);
        setApplyToDate(end._d);
      } else {
        toast.error(t(strings.dateRangeInvalid) + '!!!');
      }
    }

    return (
      <Container className={classes.dummyContainer}>
          <Typography className={classes.title} variant="h5" component="h5">
            {t(strings.report)}
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
            >{t(strings.apply)}</Button>
          </Typography>
        <Container className={classes.container}>
          {/* Card Report */}
          <Grid container spacing={2} p-y={2} justify="center" className={classes.cardReport}>
            {cardReport.map((card, index) => {
              return (
                <Grid key={index} item md={2} sm={4} xs={6}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <div className={classes.cardValue}>{card.value}</div>
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
                <CardActions>
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
                </CardActions>
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
                <CardActions>
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
                </CardActions>
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
                <CardActions>
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
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Footer/>
        </Container>
      </Container>
    )
}

export default Report;