import React,{useState,useEffect} from 'react';
import { makeStyles  } from "@material-ui/core/styles";
//api
import ProcedureService from "../../../api/procedure/procedure.service";
//translation
import { useTranslation } from 'react-i18next';

// @material-ui/core Component
import { 
    FormControl,
    InputLabel,
    Button,
    TextField,
    Select,
    MenuItem,
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




const UpdateProcedure = (props) => {
    const {t, i18n } = useTranslation();
    const classes = useStyles();
    
    //state
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
    }


    const handleChangeDescription=(e)=>{
        setDescription(e.target.value);
    }
    const onClickUpdateProcedure=async(e)=>{
        if(category==='' || abbreviation==='' || procedureCode==='' || procedureFee==='' || procedureTime===''
            || procedureType==='' || toothSelect==='' || toothType==='' || description==='')
        {
            toast.error(t(strings.errorInput));

        }
        else
        {
            if(category!==null && abbreviation!==null && procedureCode!==null && procedureFee!==null && procedureTime!==null
                && procedureType!==null && toothSelect!==null && toothType!==null && description!==null && props.editable===true)
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
                const result=await ProcedureService.update(props.id,data);
                if(result.success)
                {
                    toast.success(t(strings.updateSuccess));
                    props.handleChangeIsUpdate();
                }
                else
                {
                    toast.error(t(strings.updateFail));
                }
            }
            else
            {
                toast.error(t(strings.errorInput));
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
        const searchProcedure=async()=>{
            const result=await ProcedureService.search(props.id);
            if(result.success)
            {
                setAbbreviation(result.data.payload.abbreviation);
                setProcedureCode(result.data.payload.procedure_code);
                setProcedureFee(result.data.payload.procedure_fee["$numberDecimal"]);
                setProcedureTime(result.data.payload.procedure_time["$numberDecimal"]);
                setProcedureType(result.data.payload.procedure_type);
                setToothType(result.data.payload.tooth_type);
                setToothSelect(result.data.payload.tooth_select);
                setDescription(result.data.payload.description);
                setCategory(result.data.payload.category);

                
            }
        }
        if(props.id && description===null)
        {
            searchProcedure();

        }
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
                            <InputLabel shrink>
                                {t(strings.abbreviation)}
                            </InputLabel>
                            <TextField className={classes.inputControl} 
                                        variant="outlined" 
                                        onChange={handleChangeAbbreviation}
                                        value={abbreviation}
                                        inputProps={{ readOnly: !props.editable }}
                                        /> 
                        </FormControl>
                        
                        
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.procedureCode)}
                            </InputLabel>
                            <TextField className={classes.inputControl}
                                        variant="outlined"
                                        onChange={handleChangeProcedureCode}
                                        value={procedureCode}
                                        inputProps={{ readOnly: !props.editable }}

                                        />
                             
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.procedureTime)}
                            </InputLabel>
                            <TextField className={classes.inputControl}
                                        variant="outlined"
                                        onChange={handleChangeProcedureTime}
                                        value={procedureTime}
                                        inputProps={{ readOnly: !props.editable }}

                                        />
                             
                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.procedureFee)}
                            </InputLabel>
                            <TextField className={classes.inputControl}
                                        variant="outlined"
                                        onChange={handleChangeProcedureFee}
                                        value={procedureFee}
                                        inputProps={{ readOnly: !props.editable }}

                                        />
                             
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
                                    inputProps={{ readOnly: !props.editable }}

                                    >
                                    <MenuItem value={category}>{t(strings.category)}</MenuItem>
                                    {renderListCategory()}
                                </Select>
                                :
                                <FormControl></FormControl>
                            }
                           

                        </FormControl>
                        
                        
                    </Grid>
                    <Grid item xs={6} className={classes.rightContent}>
                        
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.description)}
                            </InputLabel>
                            <TextField className={classes.inputControl}
                                        variant="outlined"
                                        onChange={handleChangeDescription}
                                        value={description}
                                        inputProps={{ readOnly: !props.editable }}

                                        /> 

                        </FormControl>
                        <FormControl className={classes.item}>
                            <InputLabel shrink>
                                {t(strings.toothSelect)}
                            </InputLabel>
                            <TextField className={classes.inputControl}
                                        variant="outlined"
                                        onChange={handleChangeToothSelect}
                                        value={toothSelect}
                                        inputProps={{ readOnly: !props.editable }}

                                        />
                             
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
                                    inputProps={{ readOnly: !props.editable }}
                                    className={classes.inputCombobox}
                                    
                                    >
                                    <MenuItem value={toothType}>{t(strings.toothType)}</MenuItem>
                                    {renderListToothType()}
                                </Select>
                                :
                                <FormControl></FormControl>
                            }
                           

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
                                inputProps={{ readOnly: !props.editable }}

                                >
                                <MenuItem value={procedureType}>{t(strings.procedureType)}</MenuItem>
                                {renderListProcedureType()}
                            </Select>
                            :
                            <FormControl></FormControl>
                            }
                            
                             
                        </FormControl>
                        
                    </Grid>
                </Grid>
                {props.editable ?
                <div>
                    <Button variant="contained" color="primary" className={classes.updateButton} onClick={onClickUpdateProcedure} disabled={!props.editable}>
                        {t(strings.update)}
                    </Button>
                </div>
                :
                <div></div>
                }
                
        </div>
    </div>
    )
}

export default UpdateProcedure;