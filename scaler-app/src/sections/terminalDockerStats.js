import Terminal, {ColorMode, TerminalOutput} from "react-terminal-ui";
import React, {useEffect, useState} from "react";
import io from 'socket.io-client';
import {Button, Tooltip} from "@mui/material";
import {TrashIcon} from "@heroicons/react/20/solid";
import * as api from "../services/api";

const UbuntuTerminalCommand = ({ children }) => (
    <TerminalOutput colorMode={ColorMode.Dark}>
        <span style={{ color: '#4CAF50' }}>edvanronchi@ubuntu</span>
        <span style={{ color: '#0074cc' }}>:/$</span> docker stats
        {children}
    </TerminalOutput>
);

const messageToList= (message) => {
    let messages = message.split('\n').filter(item => item);
    return messages.map(m => JSON.parse(m));
}

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

function addSpacesToString(inputString, targetLength) {
    if (inputString.length >= targetLength) {
        return inputString;
    }
    const spacesToAdd = targetLength - inputString.length;
    const spaces = " ".repeat(spacesToAdd);
    return inputString + spaces;
}

const completeWithBlankSpace = (list) => {
    list.forEach(container => container.Name = renameContainer(container.Name));
    const maximumCharacterCountByField = getMaximumCharacterCountByField(list);

    list.forEach(object => {
        Object.keys(object).forEach(key => {
            object[key] = addSpacesToString(object[key], maximumCharacterCountByField[key]);
        });
    });

    return list;
}

const renameContainer = (name) => {
    return name.replace(/app-service-/g, '');
}

const removeConsumer = (id) => {
    api.removeConsumer(id);
}

const HEADER = {
    ID: "CONTAINER ID",
    Name: "NAME",
    CPUPerc: "CPU %",
    MemUsage: "MEM USAGE / LIMIT",
    MemPerc: "MEM %",
    NetIO: "NET I/O",
    BlockIO: "BLOCK I/O",
    PIDs: "PIDS"
};

export const TerminalDockerStats = (props) => {
    const [terminalMessages, setTerminalMessages] = useState([]);

    const handleTerminalSocket = (message) => {
        if (!message) {
            setTerminalMessages([]);
            return;
        }
        let list = messageToList(message);
        let sortedList = list.sort((a, b) => (a.Name > b.Name) ? 1 : -1);
        sortedList.unshift(HEADER);
        let completeList = completeWithBlankSpace(sortedList);
        setTerminalMessages(completeList);
    }

    const handleMetricSocket = (message) => {
        return message;
    }

    useEffect(() => {
        const socket = io('http://localhost:4000');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('terminal-socket', (message) => {
            //console.log('Message received:', message);
            handleTerminalSocket(message);
        });

        socket.on('metric-chat', (message) => {
            console.log('Message received:', message);
            handleMetricSocket(message);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server.');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Terminal name='Terminal' colorMode={ ColorMode.Dark } height="200px" >
            <UbuntuTerminalCommand>
                { !terminalMessages.length ? (
                    <TerminalOutput>
                        CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT   MEM %     NET I/O   BLOCK I/O   PIDS
                    </TerminalOutput>
                ) : null}

                { terminalMessages.map(container => (
                    <TerminalOutput key={container['ID']}>
                        {container['ID'] + '   ' + container['Name'] + '   ' + container['CPUPerc'] + '   ' + container['MemUsage'] + '   ' + container['MemPerc'] + '   ' + container['NetIO']}

                        { container['PIDs'] !== 'PIDS' ? (
                            <Tooltip title="Remove" placement="top">
                                <Button style={{ width: '15px', height: '15px' }} onClick={() => removeConsumer(container['ID'])}>
                                    <TrashIcon style={{ width: '15px', height: '15px', color: 'red' }} />
                                </Button>
                            </Tooltip>
                        ) : null}
                    </TerminalOutput>
                ))}
            </UbuntuTerminalCommand>
        </Terminal>
    )
}
