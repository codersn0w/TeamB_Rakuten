import React, {useEffect, useState} from "react";
import {Community} from "./Community";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

type CommunityType = Readonly<{ name: string }>
const initialObject: CommunityType = {
    name: "",
}

const useStyles = makeStyles(theme=>({
    communityList:{
        marginTop: theme.spacing(6),
        paddingBottom: theme.spacing(8),
    },
    communityElement:{
        paddingBottom: theme.spacing(3),
    }
}))

export const CommunityList = () => {
    const classes = useStyles()
    const [communities, setCommunities] = useState([initialObject])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/genres");
            console.log(res);
            setCommunities(res.data.items);
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Grid container className={classes.communityList}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container>
                    {communities && communities.map((community, index) => (
                        <Grid item xs={4} key={index} className={classes.communityElement}>
                            <Grid container justify="center">
                                <Community name={community.name}></Community>
                            </Grid>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}