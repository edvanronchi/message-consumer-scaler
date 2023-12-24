import {Unstable_Grid2 as Grid} from '@mui/material';
import {MetricCard} from '../components/MetricCard';
import {PaperAirplaneIcon, QueueListIcon, UserPlusIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {socket} from "../socket";

const metricDefaut = {
    totalConsumers: 0,
    totalMessages: 0,
    messagesPerSecond: 0
};

function formatTotalMessages(messages) {
    if (messages < 1000) {
        return messages.toString();
    }
    const valueInK = messages / 1000;
    return valueInK.toFixed(1) + 'k';
}

function formatMessagesPerSecond(messages) {
    return Math.ceil(messages);
}

export const OverviewMetric = () => {
    const [metric, setMetric] = useState(metricDefaut);

    const handleMetricSocket = (message) => {
        setMetric({
            totalConsumers: message.total_consumers,
            totalMessages: message.total_messages,
            messagesPerSecond: message.messages_per_second
        });
    }

    useEffect(() => {
        function onConnect() {
            console.log('Connected to WebSocket server: metric-socket');
        }

        function onDisconnect() {
            console.log('Disconnected from WebSocket server: metric-socket');
        }

        function onTerminalSocket(message) {
            //console.log('Message received: metric-socket:', message);
            handleMetricSocket(message);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('metric-socket', onTerminalSocket);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('metric-socket', onTerminalSocket);
        };
    }, []);

    return (
        <Grid container spacing={3} >
            <Grid xs={12} sm={12} lg={4}>
                <MetricCard
                    description="Queued messages"
                    value={formatTotalMessages(metric.totalMessages)}
                    colorIcon="#4ECDC4"
                    icon={<QueueListIcon />}
                />
            </Grid>

            <Grid xs={12} sm={6} lg={4}>
                <MetricCard
                    description="Message rates"
                    value={formatMessagesPerSecond(metric.messagesPerSecond)}
                    colorIcon="#F4A261"
                    icon={<PaperAirplaneIcon />}
                />
            </Grid>

            <Grid xs={12} sm={6} lg={4}>
                <MetricCard
                    description="Consumers"
                    value={metric.totalConsumers}
                    colorIcon="#FF6B6B"
                    icon={<UserPlusIcon />}
                />
            </Grid>
        </Grid>
    );
}
