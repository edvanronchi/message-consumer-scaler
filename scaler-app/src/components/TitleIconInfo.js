import React from 'react';
import PropTypes from 'prop-types';
import {Box, IconButton, styled, Tooltip, tooltipClasses, Typography} from '@mui/material';
import {Info} from "@mui/icons-material";
import {MetricCard} from "./MetricCard";

export const TitleIconInfo = (props) => {
  const { title, titleInfo } = props;

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }}/>
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

  return (
      <Box
          sx={{
            display: 'flex',
            paddingTop: '20px'
          }}
      >
        <h2>{title}</h2>
          <HtmlTooltip
              title={
                  <React.Fragment>
                      <Typography color="inherit">Info</Typography>
                      <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                      {titleInfo}
                  </React.Fragment>
              }
          >
          <IconButton >
            <Info/>
          </IconButton>
        </HtmlTooltip>
      </Box>
  );
};

MetricCard.propTypes = {
  title: PropTypes.string,
  titleInfo: PropTypes.string
};
