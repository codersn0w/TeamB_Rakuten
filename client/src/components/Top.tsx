import React from "react";
import {Hero} from "./Hero";
import {SearchBox} from "./SearchBox";
import {CommunityList} from "./CommunityList";
import {Box, fade, Grid} from "@material-ui/core";

const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: fade("#000",0.2),
    m: 1,
    border: 1,
    // style: { width: '5rem', height: '5rem' },
};

export const Top = () => {
    return (
        <React.Fragment>
            <Hero/>
            <Grid container justify="center">
                <Box borderRadius="borderRadius" {...defaultProps}>
                <SearchBox placeholder="大好きな本を検索してみよう" defaultWidth={250} focusWidth={400}></SearchBox>
                </Box>
            </Grid>
            <CommunityList></CommunityList>
        </React.Fragment>
    );
}