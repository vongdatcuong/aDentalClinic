import React from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";
import ScrollMenu from 'react-horizontal-scrolling-menu';
//translation
import { useTranslation, Trans } from 'react-i18next';

// @material-ui/core Component
import Container from '@material-ui/core/Container';
import { Typography,Grid } from '@material-ui/core';

//import image
import DentalProvider from "../../assets/images/dentalProvider.png";
import DentalPractice from "../../assets/images/dentalPractice.png";
import DentalStaff from "../../assets/images/dentalStaff.png";
import DentalProcedure from "../../assets/images/dentalProcedure.png";
import DentalChair from "../../assets/images/dentalChair.png";
import DentalReferral from "../../assets/images/dentalReferral.png";
import DentalSchedule from "../../assets/images/calendar.png";
import Authentication from "../../assets/images/authentication.png";
import Document from "../../assets/images/document.png";
import Templates from "../../assets/images/templates.png";
import Drug from "../../assets/images/drug.png";
import Portal from "../../assets/images/portal.png";
import MenuBarItem from "./MenuBarItem";
import darkTheme from "../../themes/darkTheme";
import strings from "../../configs/strings";

import Arrow from "./Arrow";
import styles from "./jss";
const useStyles = makeStyles(styles);

const renderMenu = (list) =>
  list.map( (item,index) => {
    

    return <MenuBarItem name={item.name} index={index} path={item.path} src={item.src}/>;
});

const MenuBar=()=>{
    const {t, i18n } = useTranslation();
    const classes = useStyles(darkTheme);
    
    const ArrowLeft = Arrow({ text: '<', className: classes.arrowLeft });
    const ArrowRight = Arrow({ text: '>', className: classes.arrowRight });

    const list=[
        {name:t(strings.providers),path:'/providers',src:DentalProvider,index:0},
        {name:t(strings.staffs),path:'/staffs',src:DentalStaff,index:1},
        {name:t(strings.schedule),path:'/schedule',src:DentalSchedule,index:2},
        {name:t(strings.procedure),path:'/procedure',src:DentalProcedure,index:3},
        {name:t(strings.chairs),path:'/chairs',src:DentalChair,index:4},
        {name:t(strings.referral),path:'/referral',src:DentalReferral,index:5},
        {name:t(strings.practices),path:'/practices',src:DentalPractice,index:6},
        {name:t(strings.authentication),path:'/authentication',src:Authentication,index:7},
        {name:t(strings.templates),path:'/templates',src:Templates,index:8},
        {name:t(strings.drug),path:'/drug',src:Drug,index:9},
        {name:t(strings.portal),path:'/portal',src:Portal,index:10},

        

    ]
    const menuItems=renderMenu(list);
    return(
        <div className={classes.container}>
                {/* <Grid container spacing={2}  >

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
                                    {t(strings.providers)}
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
                                    {t(strings.practices)}
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
                    
                                
                        
                    </Grid>  
                    
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
                 */}
                {/* <MenuBarItem src={DentalProvider} name={t(strings.providers)} index={0} path={`/providers`}/>
                <MenuBarItem src={DentalStaff} name={t(strings.staffs)} index={0} path={`/staffs`}/> */}
                <ScrollMenu
                    data={menuItems}    
                    // arrowLeft={ArrowLeft}
                    // arrowRight={ArrowRight}

                >

                </ScrollMenu>
        </div>
            
    )
}

export default withRouter(MenuBar);