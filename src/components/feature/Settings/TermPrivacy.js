import React, {useState} from 'react';
import { makeStyles, useTheme  } from "@material-ui/core/styles";
import strings from '../../../configs/strings';
// use i18next
import { useTranslation } from 'react-i18next';
// Html Parser
import HtmlParser from 'html-react-parser';

// @material-ui/core Component

// Component


const useStyles = makeStyles((theme) => ({
  
}));

const TermPrivacy = () => {
  const {t, i18next} = useTranslation();
    return (
        <p>
          {HtmlParser(t(strings.termPolicyFullText))}
        </p>
    )
}

export default TermPrivacy;