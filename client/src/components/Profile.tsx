import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {CardActionArea, CardContent, CardMedia, Divider, Grid, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10)
    },
    outer: {
        paddingBottom: theme.spacing(20)
    },
    media: {
        position:"relative",
        paddingBottom: "100%"
    },
    userName:{
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(3)
    }
}))

export const Profile = () => {
    const classes = useStyles();
    const {user, isLoading, getAccessTokenSilently} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-0hguzgvk.us.auth0.com";

            try {

                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(metadataResponse.body)

                const {user_metadata} = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
        console.log(userMetadata);
    }, [getAccessTokenSilently, user,userMetadata]);
    if (isLoading) {
        return <div>Loading ...</div>;
    }


    return (

        <React.Fragment>
            <Grid container className={classes.title}>
                <Grid item xs={3}></Grid>
                <Typography variant="h3">
                    マイページ
                </Typography>
                <Grid container direction="column">
                    <Divider/>
                </Grid>
            </Grid>

            <Grid container className={classes.outer}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardActionArea>
                            <Grid container>
                                <Grid item xs={4}>
                                    <CardMedia className={classes.media} image={user.picture} title={user.name}/>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={7}>
                                    <CardContent>
                                        <Grid container className={classes.userName}>
                                            <Grid item xs={3}>
                                                <Typography variant="h6">
                                                    ユーザー名
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="h4">{user.nickname}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <Typography variant="h6">
                                                    email
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="h5">{user.email}</Typography>
                                            </Grid>
                                        </Grid>
                                        {/*{userMetadata ? (*/}
                                        {/*    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>*/}
                                        {/*) : (*/}
                                        {/*    "No user metadata defined"*/}
                                        {/*)}*/}
                                    </CardContent>
                                </Grid>

                            </Grid>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>

    );

};