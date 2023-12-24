import Terminal, {ColorMode, TerminalOutput} from "react-terminal-ui";
import React, {useEffect, useState} from "react";
import {Button, Tooltip} from "@mui/material";
import {TrashIcon} from "@heroicons/react/20/solid";
import * as api from "../services/api";
import {socket} from '../socket';
import * as toast from "../services/toast";

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
    const maximumCharacterCountByField = getMaximumCharacterCountByField(list);
    console.log(maximumCharacterCountByField)
    list.forEach(object => {
        console.log(object)
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

const getFileId = (name) => {
    return name.substring(12, 48);
}

const addFields = (list) => {
    list.forEach(object => {
        let fileId = getFileId(object.Name);
        let consumer = JSON.parse(localStorage.getItem(fileId));
        object['CPU'] = consumer?.cpu || '-';
        object['Fibonacci'] = consumer?.fibonacci || '-';
    });
    
    list.forEach(container => container.Name = renameContainer(container.Name));
    list.unshift(HEADER);
}

const HEADER = {
    ID: "CONTAINER ID",
    Name: "NAME",
    CPU: "CPU",
    CPUPerc: "CPU %",
    MemUsage: "MEM USAGE / LIMIT",
    MemPerc: "MEM %",
    Fibonacci: "FIBONACCI"
};

export const TerminalDockerStats = () => {
    const [terminalMessages, setTerminalMessages] = useState([]);

    const handleTerminalSocket = (message) => {
        if (!message) {
            setTerminalMessages([]);
            return;
        }

        let list = messageToList(message);
        let sortedList = list.sort((a, b) => (a.Name > b.Name) ? 1 : -1);

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
            //console.log('Message received: terminal-socket:', message);
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
                        CONTAINER ID   NAME      CPU     CPU %     MEM USAGE / LIMIT   MEM %    FIBONACCI
                    </TerminalOutput>
                ) : null}

                { terminalMessages.map(container => (
                    <TerminalOutput key={container['ID']}>
                        {container['ID'] + '   ' + container['Name'] + '   ' + container['CPU'] + '   ' + container['CPUPerc'] + '   ' + container['MemUsage'] + '   ' + container['MemPerc'] + '   ' + container['Fibonacci']}

                        { container['ID'] !== 'CONTAINER ID' ? (
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
