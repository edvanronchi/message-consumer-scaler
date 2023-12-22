import React from "react";
import {Unstable_Grid2 as Grid} from "@mui/material";
import {SendMessage} from "./sendMessage";
import {CreateConsumer} from "./createConsumer";

export const InteractiveDashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={6}>
                <SendMessage />
            </Grid>
            <Grid xs={12} md={6} lg={6}>
                <CreateConsumer/>
            </Grid>
        </Grid>
    );
}
