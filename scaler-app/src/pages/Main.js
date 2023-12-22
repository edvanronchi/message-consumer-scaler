import {Box, Stack} from '@mui/material';
import { OverviewMetric } from "../sections/overviewMetric";
import {TerminalDockerStats} from "../sections/terminalDockerStats";
import {InteractiveDashboard} from "../sections/interactiveDashboard";
import {TitleIconInfo} from "../components/TitleIconInfo";
import {MetricIcons} from "../components/MetricIcons";


export default function Main() {
    return (
        <Stack>
            <Box>
                <TitleIconInfo title="Metrics" titleInfo="ALguma coisa"/>
                <OverviewMetric/>
                <Box sx={{display: 'flex', paddingTop: '20px'}}>
                    <h3>or access</h3>
                    <MetricIcons/>
                </Box>
            </Box>
            <Box>
                <TitleIconInfo title="Interactive dashboard" titleInfo="ALguma coisa"/>
                <InteractiveDashboard/>
            </Box>
            <Box>
                <TitleIconInfo title="Consumer statistics" titleInfo="ALguma coisa"/>
                <TerminalDockerStats/>
            </Box>
        </Stack>
    );
}
