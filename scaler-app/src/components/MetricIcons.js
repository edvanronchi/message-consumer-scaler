import {Avatar, Box} from '@mui/material';

export const MetricIcons = () => {

  return (
      <>
          <Box style={{display: 'flex', alignItems: 'center'}}>
              <a title="Grafana" target="_blank" href="http://localhost:10000"
                 style={{textDecoration: 'none', color: 'inherit'}} rel="noreferrer">
                  <Avatar
                      src="/assets/logos/grafana.png"
                      variant="square"
                      style={{width: 40, height: 40, marginLeft: '10px'}}
                  />
              </a>
          </Box>

          <Box style={{display: 'flex', alignItems: 'center'}}>
              <a title="Prometheus" target="_blank" href="http://localhost:10001"
                 style={{textDecoration: 'none', color: 'inherit'}} rel="noreferrer">
                  <Avatar
                      src="/assets/logos/prometheus.png"
                      variant="square"
                      style={{width: 40, height: 40, marginLeft: '10px'}}
                  />
              </a>
          </Box>

          <Box style={{display: 'flex', alignItems: 'center'}}>
              <a title="RabbitMQ" target="_blank" href="http://localhost:10002"
                 style={{textDecoration: 'none', color: 'inherit'}} rel="noreferrer">
                  <Avatar
                      src="/assets/logos/rabbitmq.png"
                      variant="square"
                      style={{width: 40, height: 40, marginLeft: '10px'}}
                  />
              </a>
          </Box>
      </>
  )
};
