import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
//api
import ProcedureService from "../../../api/procedure/procedure.service";
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,
    Fab,
    FormControlLabel,
    Checkbox,
    Button,
    TextField,
    Select,
    MenuItem,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
import darkTheme from "../../../themes/darkTheme";
//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertProcedure = () => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
    const [abbreviation,setAbbreviation]=useState(null);
    const [insuredPercent,setInsuredPercent]=useState(null);
    const [procedureCode,setProcedureCode]=useState(null);
    const [procedureFee,setProcedureFee]=useState(null);
    const [procedureTime,setProcedureTime]=useState(null);
    const [procedureType,setProcedureType]=useState(null);
    const [listProcedureType,setListProcedureType]=useState(["TREATMENT","CONDITION"]);
    const [toothSelect,setToothSelect]=useState(null);
    const [toothType,setToothType]=useState(null);
    const [listToothType,setListToothType]=useState(["CHILD","ADULT"]);
    const [category,setCategory]=useState(null);
    const [description,setDescription]=useState(null);
    const [listCategory,setListCategory]=useState([]);


    const handleChangeAbbreviation=(e)=>{
        setAbbreviation(e.target.value);
    }
    const handleChangeInsuredPercent=(e)=>{
        setInsuredPercent(e.target.value);
    }
    const handleChangeProcedureCode=(e)=>{
        setProcedureCode(e.target.value);
    }
    const handleChangeProcedureFee=(e)=>{
        setProcedureFee(e.target.value);
    }
    const handleChangeProcedureType=(e)=>{
        setProcedureType(e.target.value);
    }
    const handleChangeProcedureTime=(e)=>{
        setProcedureTime(e.target.value);
    }
    const handleChangeToothSelect=(e)=>{
        setToothSelect(e.target.value);
    }
    const handleChangeToothType=(e)=>{
        setToothType(e.target.value);
    };

    
    const handleChangeCategory=(e)=>{
        setCategory(e.target.value);
        console.log("Check choose category:",e.target.value);
    }


    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onClickInsertProcedure=async(e)=>{
        if(category!==null)
        {
            const data={
                abbreviation:abbreviation,
                // insuredPercent:insuredPercent,
                procedure_code:procedureCode,
                procedure_fee:procedureFee,
                procedure_time:procedureTime,
                procedure_type:procedureType,
                category:category,
                tooth_select:toothSelect,
                tooth_type:toothType,
                description:description,
            }
            const result=await ProcedureService.insert(data);
            if(result.success)
            {
                alert(t(strings.insertSuccess));
            }
            else
            {
                alert(t(strings.insertFail));
            }
        }
        
    }

    const renderListProcedureType=(e)=>{
        return listProcedureType.map((item,index)=>{
            return  <MenuItem value={item}>{item}</MenuItem>

        })
    }
    const renderListToothType=()=>{
        return listToothType.map((item,index)=>{
            return  <MenuItem value={item}>{item}</MenuItem>
 
        })
    }
    const renderListCategory=()=>{
        return listCategory.map((item,index)=>{
            return  <MenuItem value={item._id}>{item.name}</MenuItem>

        })
    }
    useEffect(()=>{
        if(listCategory.length===0)
        {
            const getListCategory=async()=>{
                const res=await ProcedureService.getProcedureCategory();
                console.log("Get procedure category in useEffect:",res.data);
                setListCategory(res.data);
            }
            getListCategory();
            
        }
    })
    return (
        <div className={classes.container}>     
            <div className={classes.content}>        
                <Grid container className={classes.input}>
                    <Grid item xs={6} className={classes.leftContent}>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        placeholder={t(strings.abbreviation)}  
                                        variant="outlined" 
                                        onChange={handleChangeAbbreviation}
                                        value={abbreviation}
                                        /> 
                        </div>
                        
                        
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.procedureCode)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureCode}
                                        value={procedureCode}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.procedureTime)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureTime}
                                        value={procedureTime}/>
                             
                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.procedureFee)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureFee}
                                        value={procedureFee}/>
                             
                        </div>
                        <div className={classes.item}>
                            {/* <TextField className={classes.inputControl}
                                        placeholder={t(strings.category)}  
                                        variant="outlined"
                                        onChange={handleChangeCategory}
                                        value={category}/> */}
                            {listCategory.length!==0 ?

                                <Select
                                    value={category}
                                    onChange={handleChangeCategory}
                                    disableUnderline 
                                    displayEmpty
                                    className={classes.inputCombobox}
                                    //defaultValue={listCategory[0]._id}
                                    //placeholder={t(strings.category)}
                                    >
                                    <MenuItem value={category}>{t(strings.category)}</MenuItem>
                                    {renderListCategory()}
                                </Select>
                                :
                                <div></div>
                            }
                           

                        </div>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        {/* <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.insuredPercent)}  
                                        variant="outlined"
                                        onChange={handleChangeInsuredPercent}
                                        value={insuredPercent}/>
                             
                        </div> */}
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.description)}  
                                        variant="outlined"
                                        onChange={handleChangeDescription}
                                        value={description}/> 

                        </div>
                        <div className={classes.item}>
                            <TextField className={classes.inputControl}
                                        placeholder={t(strings.toothSelect)}  
                                        variant="outlined"
                                        onChange={handleChangeToothSelect}
                                        value={toothSelect}/>
                             
                        </div>
                        <div className={classes.item}>
                            {/* <TextField className={classes.inputControl}
                                        placeholder={t(strings.category)}  
                                        variant="outlined"
                                        onChange={handleChangeCategory}
                                        value={category}/> */}
                            {listToothType.length!==0 ?

                                <Select
                                    value={toothType}
                                    onChange={handleChangeToothType}
                                    disableUnderline 
                                    displayEmpty
                                    className={classes.inputCombobox}
                                    //defaultValue={listCategory[0]._id}
                                    //placeholder={t(strings.category)}
                                    >
                                    <MenuItem value={toothType}>{t(strings.toothType)}</MenuItem>
                                    {renderListToothType()}
                                </Select>
                                :
                                <div></div>
                            }
                           

                        </div>
                        
                        <div className={classes.item}>
                            {listProcedureType.length!==0 ?
                                <Select
                                value={procedureType}
                                onChange={handleChangeProcedureType}
                                disableUnderline 
                                displayEmpty
                                className={classes.inputCombobox}
                                
                                >
                                <MenuItem value={procedureType}>{t(strings.procedureType)}</MenuItem>
                                {renderListProcedureType()}
                            </Select>
                            :
                            <div></div>
                            }
                            {/* <TextField className={classes.inputControl}
                                        placeholder={t(strings.procedureType)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureType}
                                        value={procedureType}/> */}
                             
                        </div>
                        
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" color="primary" className={classes.insertButton} onClick={onClickInsertProcedure}>
                        {t(strings.insert)}
                    </Button>
                </div>
        </div>
    </div>
    )

}

export default InsertProcedure;