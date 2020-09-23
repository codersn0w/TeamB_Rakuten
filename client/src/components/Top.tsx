import React from "react";
import {Hero} from "./Hero";
import {SearchBox} from "./SearchBox";
import {CommunityList} from "./CommunityList";
import {Box, Divider, fade, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: fade("#000",0.2),
    m: 1,
    border: 1,
    // style: { width: '5rem', height: '5rem' },
};

const useStyles = makeStyles((theme) => ({
    communityTypo :{
        paddingTop: theme.spacing(7)
    }
}))

export const Top = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Hero/>
            <Grid container justify="center">
                <Box borderRadius="borderRadius" {...defaultProps}>
                <SearchBox placeholder="大好きな本を検索してみよう" defaultWidth={250} focusWidth={400}></SearchBox>
                </Box>
            </Grid>
            <Grid container justify="center" className={classes.communityTypo}>
                <Typography variant="h4">
                    コミュニティ一覧
                </Typography>
            </Grid>
            <Grid container justify="center">
                <Grid item xs={4}>
                <Divider />
                </Grid>
            </Grid>
            <CommunityList></CommunityList>
        </React.Fragment>
    );
}