import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
// import validators, {isPropValid} from '../../../utils/validators';
//api
import ProcedureService from "../../../api/procedure/procedure.service";
//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
 } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import styles from "./jss";
// import darkTheme from "../../../themes/darkTheme";
import { toast } from 'react-toastify';

//import configs
import strings from "../../../configs/strings";
//import image

//import icons


//import component

const useStyles = makeStyles(styles);




const InsertProcedure = (props) => {
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
    const [listSurface,setListSurface]=useState([
        "1",
        "1+",
        "2",
        "2+",
        "3",
        "3+",
        "4",
        "4+",
        "5"
    ])
    const [surface,setSurface]=useState(null);
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
    }
    const handleChangeSurface=(e)=>{
        setSurface(e.target.value);
    }

    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onClickInsertProcedure=async(e)=>{
        if(category!=='' && abbreviation!=='' && procedureCode!=='' && procedureFee!=='' && procedureTime!==''
        && procedureType!=='' && toothSelect!=='' && toothType!=='' && description!==''
        && surface!==null)
        {
            const data={
                abbreviation:abbreviation,
                procedure_code:procedureCode,
                procedure_fee:procedureFee,
                procedure_time:procedureTime,
                procedure_type:procedureType,
                category:category,
                tooth_select:toothSelect,
                tooth_type:toothType,
                description:description,
                surface_number:surface,
            }
            const result=await ProcedureService.insert(data);
            if(result.success)
            {
                toast.success(t(strings.insertSuccess));
                props.handleChangeIsInsert();

            }
            else
            {
                toast.error(t(strings.insertFail));
            }
        }
        else
        {
            toast.error(t(strings.errorInput));

        }
        setAbbreviation("");
        setProcedureCode("");
        setProcedureFee("");
        setProcedureTime("");
        setProcedureType("");
        setCategory("");
        setToothSelect("");
        setToothType("");
        setDescription("");
        setSurface("");
       
       
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
    const renderListSurface=()=>{
        return listSurface.map((sur,index)=>{
            return <MenuItem key={index} value={sur}>{sur}</MenuItem>
        })
    }
    useEffect(()=>{
        if(listCategory.length===0)
        {
            const getListCategory=async()=>{
                const res=await ProcedureService.getProcedureCategory();
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
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl} 
                                        label={t(strings.abbreviation)}  
                                        variant="outlined" 
                                        onChange={handleChangeAbbreviation}
                                        value={abbreviation}
                                        /> 
                        </FormControl>
                        
                        
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.procedureCode)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureCode}
                                        value={procedureCode}/>
                             
                        </FormControl>
                        
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.procedureFee)}  
                                        variant="outlined"
                                        type="number"
                                        onChange={handleChangeProcedureFee}
                                        value={procedureFee}/>
                             
                        </FormControl>
                        <FormControl className={classes.itemSelect}>   
                            <InputLabel shrink>
                                {t(strings.toothType)}
                            </InputLabel>
                            {listToothType.length!==0 ?

                                <Select
                                    value={toothType}
                                    onChange={handleChangeToothType}
                                    disableUnderline 
                                    displayEmpty
                                    className={classes.inputCombobox}
                                    
                                    >
                                    {renderListToothType()}
                                </Select>
                                :
                                <FormControl></FormControl>
                            }
                        </FormControl>
                        <FormControl className={classes.itemSelect}>
                            <InputLabel shrink>
                                {t(strings.category)}
                            </InputLabel>
                            {listCategory.length!==0 ?

                                <Select
                                    value={category}
                                    onChange={handleChangeCategory}
                                    disableUnderline 
                                    displayEmpty
                                    className={classes.inputCombobox}
                                    
                                    >
                                    {renderListCategory()}
                                </Select>
                                :
                                <FormControl></FormControl>
                            }
                           

                        </FormControl>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                     
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.description)}  
                                        variant="outlined"
                                        onChange={handleChangeDescription}
                                        value={description}/> 

                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        label={t(strings.toothSelect)}  
                                        variant="outlined"
                                        onChange={handleChangeToothSelect}
                                        value={toothSelect}/>
                             
                        </FormControl>
                        <FormControl className={classes.item}>
                            <TextField className={classes.inputControl}
                                        type="number"
                                        label={t(strings.procedureTime)}  
                                        variant="outlined"
                                        onChange={handleChangeProcedureTime}
                                        value={procedureTime}/>
                             
                        </FormControl>
                        

                        <FormControl className={classes.itemSelect}>
                            <InputLabel shrink>
                                {t(strings.procedureType)}
                            </InputLabel>
                            {listProcedureType.length!==0 ?
                                <Select
                                value={procedureType}
                                onChange={handleChangeProcedureType}
                                disableUnderline 
                                displayEmpty
                                className={classes.inputCombobox}
                                
                                >
                                {renderListProcedureType()}
                            </Select>
                            :
                            <FormControl></FormControl>
                            }
                           
                             
                        </FormControl>
                        <FormControl className={classes.itemSelect}>
                            <InputLabel shrink>
                                {t(strings.surface)}
                            </InputLabel>
                            <Select
                                value={surface}
                                onChange={handleChangeSurface}
                                disableUnderline 
                                displayEmpty
                                className={classes.inputCombobox}
                                
                                >
                                {renderListSurface()}
                            </Select>
                        </FormControl>
                        
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