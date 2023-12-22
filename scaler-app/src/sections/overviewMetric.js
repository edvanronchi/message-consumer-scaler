import { Unstable_Grid2 as Grid } from '@mui/material';
import { MetricCard } from '../components/MetricCard';
import {QueueListIcon, PaperAirplaneIcon, UserPlusIcon } from "@heroicons/react/20/solid";


export const OverviewMetric = () => {
    return (
        <Grid container spacing={3} >
            <Grid xs={12} sm={12} lg={4}>
                <MetricCard
                    description="Queued messages"
                    value="10k"
                    colorIcon="#4ECDC4"
                    background="#FFFFFF"
                    icon={<QueueListIcon />}
                />
            </Grid>

            <Grid xs={12} sm={6} lg={4}>
                <MetricCard
                    description="Message rates"
                    value="15/s"
                    colorIcon="#F4A261"
                    background="#FFFFFF"
                    icon={<PaperAirplaneIcon />}
                />
            </Grid>

            <Grid xs={12} sm={6} lg={4}>
                <MetricCard
                    description="Consumers"
                    value="15"
                    colorIcon="#FF6B6B"
                    background="#FFFFFF"
                    icon={<UserPlusIcon />}
                />
            </Grid>
        </Grid>
    );
}
