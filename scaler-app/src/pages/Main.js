import {Box, Stack} from '@mui/material';
import { OverviewMetric } from "../sections/overviewMetric";
import {TerminalDockerStats} from "../sections/terminalDockerStats";
import {InteractiveDashboard} from "../sections/interactiveDashboard";
import {TitleIconInfo} from "../components/TitleIconInfo";
import {MetricIcons} from "../components/MetricIcons";

const titleInfoOverviewMetric = 'The cards display information such as the number of unprocessed messages, the total number of consumers, the rate of messages sent per second, and consumer performance per message per second. Advanced metrics can be visualized using Grafana, Prometheus, and RabbitMQ.';
const titleInfoInteractiveDashboard = 'It is possible to generate messages and consequently consume them by creating consumers with different configurations, including: CPU, memory, replicas (number of consumers), and Fibonacci number (the calculation each consumer will perform).';
const titleConsumerStatistics = '"Docker stats" displays the resource consumption of each container, and it\'s also possible to visualize the average processing time for each message based on the processed Fibonacci number.';

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
                <TitleIconInfo title="Consumer statistics" titleInfo={titleConsumerStatistics}/>
                <TerminalDockerStats/>
            </Box>
        </Stack>
    );
}
