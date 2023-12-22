import React, {useState} from "react";
import {Box, Button, Card, TextField, Unstable_Grid2 as Grid} from "@mui/material";
import * as api from "../services/api";


export const SendMessage = () => {
    const [messagesPerSecond, setMessagesPerSecond] = useState(1);

    const handleInputChange = (e) => {
        setMessagesPerSecond(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.sendMessage({ messagesPerSecond: Number(messagesPerSecond) })
    };

    const isValidMessagesPerSecond = Number.isInteger(Number(messagesPerSecond)) && Number(messagesPerSecond) >= 0 && Number(messagesPerSecond) <= 1000;

    return (
        <Card sx={{height: '100%', background: '#FFF'}}>
            <Box style={{padding: '30px'}}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={12} lg={12}>
                        <TextField
                            label="MESSAGE RATES PER SECOND"
                            type="number"
                            variant="outlined"
                            value={messagesPerSecond}
                            onChange={handleInputChange}
                            style={{width: '100%'}}
                            error={!isValidMessagesPerSecond}
                            inputProps={{
                                min: 0,
                                max: 1000,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid xs={12} md={12} lg={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{width: '100%'}}
                            disabled={!isValidMessagesPerSecond}
                            onClick={handleSubmit}>Send message
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}
