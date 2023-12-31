import Terminal, {ColorMode, TerminalOutput} from "react-terminal-ui";
import React, {useEffect, useState} from "react";
import {Button, Tooltip} from "@mui/material";
import {TrashIcon} from "@heroicons/react/20/solid";
import * as api from "../services/api";
import {socket} from '../socket';
import * as toast from "../services/toast";

const UbuntuTerminalCommand = ({ children }) => (
    <TerminalOutput>
        <span style={{ color: '#4CAF50' }}>edvanronchi@ubuntu</span>
        <span style={{ color: '#0074cc' }}>:/$</span> docker stats
        {children}
    </TerminalOutput>
);

const getMaximumCharacterCountByField = (list) => {
    const fields = {};

    list.forEach(object => {
        Object.keys(object).forEach(key => {
            let size = object[key].length;
            if (!fields[key] || size > fields[key]) {
                fields[key] = object[key].length;
            }
        });
    });

    return fields;
}

const addSpacesToString = (inputString, targetLength) => {
    if (inputString.length >= targetLength) {
        return inputString;
    }
    const spacesToAdd = targetLength - inputString.length;
    const spaces = " ".repeat(spacesToAdd);
    return inputString + spaces;
}

const completeWithBlankSpace = (list) => {
    const maximumCharacterCountByField = getMaximumCharacterCountByField(list);
    list.forEach(object => {
        Object.keys(object).forEach(key => {
            object[key] = addSpacesToString(object[key].toString(), maximumCharacterCountByField[key]);
        });
    });

    return list;
}

const renameContainer = (name) => {
    return name.substring(36, 50);
}

const removeConsumer = (id) => {
    api.removeConsumer(id);
    toast.success('The consumer is being deleted. Please wait ⏱️');
}

const formatProcessingTime = (processingTime) => {
    if (!processingTime) {
        return '-'
    }
    return (Math.round((processingTime + Number.EPSILON) * 100) / 100) + ' ms'
}

const addFields = (list) => {
    list.forEach(container => {
        container.containerName = renameContainer(container.containerName);
        container.processingTime = formatProcessingTime(container.processingTime);
    });
    list.unshift(HEADER);
}

const HEADER = {
    containerId: "CONTAINER ID",
    containerName: "NAME",
    cpu: "CPU",
    cpuPerc: "CPU %",
    memoryUsage: "MEM USAGE / LIMIT",
    memoryPerc: "MEM %",
    fibonacci: "FIBONACCI",
    processingTime: "PROCESSING TIME",
};

export const TerminalDockerStats = () => {
    const [terminalMessages, setTerminalMessages] = useState([]);

    const handleTerminalSocket = (message) => {
        if (!message) {
            setTerminalMessages([]);
            return;
        }

        let sortedList = message.sort((a, b) => (a.containerName > b.containerName) ? 1 : -1);

        addFields(sortedList)

        let completeList = completeWithBlankSpace(sortedList);
        setTerminalMessages(completeList);
    }

    useEffect(() => {
        function onConnect() {
            console.log('Connected to WebSocket server: terminal-socket');
        }

        function onDisconnect() {
            console.log('Disconnected from WebSocket server: terminal-socket');
        }

        function onTerminalSocket(message) {
            console.log('Message received: terminal-socket:', message);
            handleTerminalSocket(message);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('terminal-socket', onTerminalSocket);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('terminal-socket', onTerminalSocket);
        };
    }, []);

    return (
        <Terminal name='Terminal' colorMode={ ColorMode.Dark } height="200px" >
            <UbuntuTerminalCommand>
                { !terminalMessages.length ? (
                    <TerminalOutput>
                        CONTAINER ID   NAME      CPU     CPU %     MEM USAGE / LIMIT   MEM %    FIBONACCI   PROCESSING TIME
                    </TerminalOutput>
                ) : null}

                { terminalMessages.map((container, index) => (
                    <TerminalOutput key={index}>
                        {container['containerId'] + '   ' + container['containerName'] + '   ' + container['cpu'] + '   ' + container['cpuPerc'] + '   ' + container['memoryUsage'] + '   ' + container['memoryPerc'] + '   ' + container['fibonacci'] + '   ' + container['processingTime']}

                        { container['containerId'] !== 'CONTAINER ID' ? (
                            <Tooltip title="Remove" placement="top">
                                <Button style={{ width: '18px', height: '18px' }} onClick={() => removeConsumer(container['containerId'])}>
                                    <TrashIcon style={{ width: '18px', height: '18px', color: 'red' }} />
                                </Button>
                            </Tooltip>
                        ) : null}
                    </TerminalOutput>
                ))}
            </UbuntuTerminalCommand>
        </Terminal>
    )
}
