import React, {useEffect, useState} from "react";
import {Community} from "./Community";
import {Grid} from "@material-ui/core";

type CommunityType = Readonly<{name:string}>
const initialObject: CommunityType = {
    name:"",
}

export const CommunityList = () => {
    const [communities, setCommunities] = useState([initialObject])
    useEffect(()=>{
        const fetchData = async () => {
            setCommunities([
                {name:"ミステリー"},
                {name:"哲学"},
                {name:"プログラミング"}
            ])
        }
        fetchData()
    },[])

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={1}></Grid>
            {communities.map((community,index)=>(
                <Grid item xs={3} key={index}>
                    <Grid container justify="center">
                <Community name={community.name}></Community>
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </React.Fragment>
    )

}