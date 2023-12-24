import {Box, Stack} from '@mui/material';
import { OverviewMetric } from "../sections/overviewMetric";
import {TerminalDockerStats} from "../sections/terminalDockerStats";
import {InteractiveDashboard} from "../sections/interactiveDashboard";
import {TitleIconInfo} from "../components/TitleIconInfo";
import {MetricIcons} from "../components/MetricIcons";

const titleInfoOverviewMetric = 'Number of unprocessed messages, messages sent per second, and total number of consumers. Advanced metrics can be visualized using Grafana, Prometheus, and RabbitMQ.';
const titleInfoInteractiveDashboard = 'It is possible to generate messages and consequently consume them by creating consumers with different configurations, including: CPU, memory, replicas (number of consumers), and Fibonacci number (the calculation each consumer will perform).';

export default function Main() {
    return (
        <Stack>
            <Box>
                <TitleIconInfo title="Metrics" titleInfo={titleInfoOverviewMetric}/>
                <OverviewMetric/>
                <Box sx={{display: 'flex', paddingTop: '20px'}}>
                    <h3>or access</h3>
                    <MetricIcons/>
                </Box>
            </Box>
            <Box>
                <TitleIconInfo title="Interactive dashboard" titleInfo={titleInfoInteractiveDashboard}/>
                <InteractiveDashboard/>
            </Box>
            <Box>
                <h2>Consumer statistics</h2>
                <TerminalDockerStats/>
            </Box>
        </Stack>
    );
}
