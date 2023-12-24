import {Avatar, Box} from '@mui/material';

export const MetricIcons = () => {

  return (
      <>
          <Box style={{display: 'flex', alignItems: 'center'}}>
              <a title="Grafana - Credentials (admin, grafana)" target="_blank" href="http://localhost:10000/d/Kn5xm-gZk/rabbitmq-overview?orgId=1&refresh=15s"
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
              <a title="RabbitMQ - Credentials (guest, guest)" target="_blank" href="http://localhost:10002"
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
