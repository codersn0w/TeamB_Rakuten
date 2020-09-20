import React, {useEffect, useState} from "react";
import {Community} from "./Community";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type CommunityType = Readonly<{ name: string }>
const initialObject: CommunityType = {
    name: "",
}

const useStyles = makeStyles(theme=>({
    communityList:{
        marginTop: theme.spacing(6)
    }
}))

export const CommunityList = () => {
    const classes = useStyles()
    const [communities, setCommunities] = useState([initialObject])
    useEffect(() => {
        const fetchData = async () => {
            setCommunities([
                {name: "ミステリー"},
                {name: "哲学"},
                {name: "プログラミング"},
                {name: "数学"},
            ])
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Grid container className={classes.communityList}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container>
                    {communities.map((community, index) => (
                        <Grid item xs={4} key={index}>
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