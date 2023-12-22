import React, {useState} from "react";
import {Box, Button, Card, Unstable_Grid2 as Grid, MenuItem, TextField} from "@mui/material";
import * as toast from "../services/toast";

const MEMORY = [
    {
        value: '128m',
        label: '128m',
    },
    {
        value: '256m',
        label: '256m',
    },
    {
        value: '512m',
        label: '512m',
    },
    {
        value: '1024m',
        label: '1024m',
    },
];

const CPU = [
    {
        value: '0.01',
        label: '0.01',
    },
    {
        value: '0.1',
        label: '0.1',
    },
    {
        value: '0.5',
        label: '0.5',
    },
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
];

const consumerDefault = {
    cpu: '0.5',
    memory: '128m',
    replicas: 1,
    difficult: 1
};

export const CreateConsumer = () => {
    const [consumer, setConsumer] = useState(consumerDefault);

    const handleInputChangeConsumer = (e) => {
        let { name, value } = e.target;
        value = name === 'replicas' || name === 'difficult' ? Number(value) : value;

        setConsumer((prevConsumer) => ({
            ...prevConsumer,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(consumer);

        toast.success('Mudar mensagem');
    };

    const isValidReplicas = Number.isInteger(Number(consumer.replicas)) && Number(consumer.replicas) >= 1 && Number(consumer.replicas) <= 10;
    const isValidDifficult = Number.isInteger(Number(consumer.difficult)) && Number(consumer.difficult) >= 1 && Number(consumer.difficult) <= 100;

    return (
        <Card sx={{height: '100%', background: '#FFF'}}>
            <Box style={{padding: '30px'}}>
                <Grid container spacing={3}>
                    <Grid xs={6} md={6} lg={6}>
                        <TextField
                            select
                            label="CPU"
                            name="cpu"
                            defaultValue={consumerDefault.cpu}
                            style={{width: '100%'}}
                            onChange={handleInputChangeConsumer}
                        >
                            {CPU.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid xs={6} md={6} lg={6}>
                        <TextField
                            select
                            label="MEMORY"
                            name="memory"
                            defaultValue={consumerDefault.memory}
                            style={{width: '100%'}}
                            onChange={handleInputChangeConsumer}
                        >
                            {MEMORY.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid xs={6} md={6} lg={6}>
                        <TextField
                            label="REPLICAS"
                            name="replicas"
                            type="number"
                            variant="outlined"
                            style={{width: '100%'}}
                            defaultValue={consumerDefault.replicas}
                            onChange={handleInputChangeConsumer}
                            error={!isValidReplicas}
                            inputProps={{
                                min: 1,
                                max: 10,
                            }}
                        />
                    </Grid>
                    <Grid xs={6} md={6} lg={6}>
                        <TextField
                            label="FIBONACCI NUMBER"
                            name="difficult"
                            type="number"
                            variant="outlined"
                            title="Fibonacci number that the consumer will have to process for each message"
                            defaultValue={consumerDefault.difficult}
                            style={{width: '100%'}}
                            onChange={handleInputChangeConsumer}
                            error={!isValidDifficult}
                            inputProps={{
                                min: 1,
                                max: 100,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid xs={12} md={12} lg={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{width: '100%'}}
                            onClick={handleSubmit}
                            disabled={!isValidReplicas || !isValidDifficult}
                        >
                            Create consumer
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
