import PropTypes from 'prop-types';
import { Avatar, Card as CardMaterial, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const MetricCard = (props) => {
  const { value, description, background, colorIcon, icon } = props;

  return (
    <CardMaterial sx={{ height: '100%', background: background }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              { description }
            </Typography>
            <Typography variant="h4">
              { value }
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: colorIcon,
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              { icon }
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </CardMaterial>
  );
};

MetricCard.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
  colorIcon: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.func
};
