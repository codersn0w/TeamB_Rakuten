import React from "react";
import {Hero} from "./Hero";
import {SearchBox} from "./SearchBox";
import {CommunityList} from "./CommunityList";
import {Grid} from "@material-ui/core";

export const Top = () => {
    return (
        <React.Fragment>
            <Hero/>
            <Grid container justify="center">
            <SearchBox placeholder="大好きな本を検索してみよう" defaultWidth={400}></SearchBox>
            </Grid>
            <CommunityList></CommunityList>
        </React.Fragment>
    );
}