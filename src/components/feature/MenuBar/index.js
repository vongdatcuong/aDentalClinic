import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,Grid } from '@material-ui/core';

//import image
import DentalProvider from "../../../assets/images/dentalProvider.png";
import DentalPractice from "../../../assets/images/dentalPractice.png";
import DentalStaff from "../../../assets/images/dentalStaff.png";
import DentalProcedure from "../../../assets/images/dentalProcedure.png";
import DentalChair from "../../../assets/images/dentalChair.png";
import DentalReferral from "../../../assets/images/dentalReferral.png";
import DentalSchedule from "../../../assets/images/calendar.png";
import Authentication from "../../../assets/images/authentication.png";
import Document from "../../../assets/images/document.png";

import MenuBarItem from "./MenuBarItem";
import darkTheme from "../../../themes/darkTheme";
import strings from "../../../configs/strings";

import styles from "./jss";
const useStyles = makeStyles(styles);

const MenuBar=()=>{
    const classes = useStyles(darkTheme);
    return(
        <div className={classes.container}>
                <Grid container spacing={2}  >

                    <Grid item  className={classes.menuItemFirst}>
                        
                        <Container className={classes.menuItem} 

                            >
                            <NavLink
                                to="/providers"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalProvider}></img>
                                <Typography variant="body2"  >
                                    {strings.providers}
                                </Typography>
                            </NavLink>
                        </Container>  
                        
                                  
                    </Grid>
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/practices"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalPractice}></img>
                                <Typography variant="subtitle2" >
                                    {strings.practices}
                                </Typography>
                            </NavLink>
                        </Container> 
                        
                        
                    </Grid>
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/staffs"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalStaff}></img>
                                <Typography variant="subtitle2" >
                                    {strings.staffs}
                                </Typography> 
                            </NavLink>
                        </Container>
                        
                               
                                
                        
                    </Grid>
                
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/procedure"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalProcedure}></img>
                                <Typography variant="subtitle2" >
                                    {strings.procedure}
                                </Typography> 
                            </NavLink>
                        </Container>
                                
                        
                    </Grid>    
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/chairs"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalChair}></img>
                                <Typography variant="subtitle2" >
                                    {strings.chairs}
                                </Typography> 
                            </NavLink>
                        </Container>
                                
                        
                    </Grid>  
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/referral"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalReferral}></img>
                                <Typography variant="subtitle2" >
                                    {strings.referral}
                                </Typography> 
                            </NavLink>
                        </Container>                        
                                
                        
                    </Grid>    
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/schedule"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={DentalSchedule}></img>
                                <Typography variant="subtitle2" >
                                    {strings.schedule}
                                </Typography> 
                            </NavLink>
                        </Container>
                                
                        
                    </Grid>  
                    <Grid item >
                    <Container className={classes.menuItemAuthentication} >
                        <NavLink
                            to="/authentication"
                            className={classes.link}
                        >
                            <img className={classes.menuItemImage} src={Authentication}></img>
                            <Typography variant="body2" align="left" >
                                    {strings.authentication}
                            </Typography>
                        </NavLink>
                            
                            
                    </Container>
                    {/* <Container className={classes.menuItem} >
                            <NavLink
                                to="/authentication"
                                // className={classes.linkAuthentication}
                                style={{fontSize:"10px"}}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={Authentication}></img>
                                <Typography variant="subtitle2" >
                                    {strings.authentication}
                                </Typography> 
                            </NavLink>
                        </Container> */}
                                
                        
                    </Grid>  
                    {/* <Grid item >
                        <Container className={classes.menuItem} >
                            <img className={classes.menuItemImage} src={Authentication}></img>
                            <Typography variant="subtitle2" style={{fontSize:"13px"}} align='center'>
                                        Authentication
                            </Typography>
                            
                        </Container>        
                        
                    </Grid>   */}
                    <Grid item >
                        <Container className={classes.menuItem} >
                            <NavLink
                                to="/document"
                                className={classes.link}
                                activeClassName={classes.activeLink}

                            >
                                <img className={classes.menuItemImage} src={Document}></img>
                                <Typography variant="subtitle2" >
                                    {strings.document}
                                </Typography> 
                            </NavLink>
                        </Container>
                                
                        
                    </Grid>
                         
                </Grid>
                
        </div>
            
    )
}

export default withRouter(MenuBar);