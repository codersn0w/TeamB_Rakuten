import {
    Grid,
    Typography,
    Divider,
    Card,
    TextField,
    List,
    ListItem,
    Button,
    makeStyles,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {RouteComponentProps, useParams} from "react-router-dom";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import iconImage from "../assets/twittericon.jpg"

const useStyles = makeStyles((theme) => ({
    title: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(5),
    },
    outer: {
        paddingBottom: theme.spacing(10),
    },
    outer_mini: {
        marginBottom: theme.spacing(0),
    },
    chatCard: {
        paddingBottom: theme.spacing(1),
    },
    media: {
        position: "relative",
        paddingBottom: "100%",
    },
    sendButton:{
        margin:"auto",
    },
    imgIcon:{
        backgroundImage: `url(${iconImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height:"50px",
        width:"50px",
        backgroundSize: "50px",
    }
}));

type Props = {} & RouteComponentProps<{ id: string }>;

interface States {
    title: string;
    posts: Array<{ author: string; content: string }>;
    content: string;
}

type postType = Readonly<{ id: number, sender_id: string, sentence: string, thread_id: number, createTime: string, updateTime: string }>
const initialPosts: postType[] = [];

export const Thread = () => {
    const classes = useStyles();
    const {user, getAccessTokenSilently} = useAuth0();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState(initialPosts);
    const [userName, setUserName] = useState("");

    const {id} = useParams();
    const fetchPosts = async () => {
        const res = await axios.get(`http://localhost:5000/messages/${id}`);
        console.log(res);
        setPosts(res.data.items);
    }

    useEffect(() => {
        const fetchTitle = async () => {
            const res = await axios.get(`http://localhost:5000/thread/${id}`);
            console.log(res);
            setTitle(res.data.name);
        }
        const getUserName = async () => {
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

                const {nickname} = await metadataResponse.json();
                console.log(nickname);

                setUserName(nickname);
            } catch (e) {
                console.log(e.message);
            }
        };
        fetchTitle();
        fetchPosts();
        getUserName();
        // getUserMetadata();
    }, [getAccessTokenSilently, user, userName]);

    //thisを固定します　これがないとフォーム入力時にエラー
    // this.onContentChange = this.onContentChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            sentence: content,
            thread_id: id,
            sender_id: userName,
        }
        axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        axios.post("http://localhost:5000/messages", data)
            .then((res) => {
                console.log(res);
                setContent("");
                fetchPosts();
            })
            .catch((err) => console.log(err));
    };

    return (
        <React.Fragment>
            <Grid container className={classes.title} justify="center">
                <Typography variant="h3">{title}</Typography>
                <Grid container direction="column">
                    <Divider/>
                </Grid>
            </Grid>
            <Grid container className={classes.outer}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    {/*<List>*/}
                    <Grid container className={classes.outer_mini}>
                        {posts.map((post, index) => (
                            // <ListItem key={index}>
                            <Grid item xs={12} key={index} className={classes.chatCard}>
                                {/*<Card>*/}
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Grid container justify="center">
                                            <Grid item className={classes.imgIcon}></Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="body2">{post.sender_id}</Typography>
                                        <Typography variant="body1">{post.sentence}</Typography>
                                    </Grid>
                                </Grid>
                                {/*</Card>*/}
                                <Divider></Divider>
                            </Grid>
                            // </ListItem>
                        ))}
                    </Grid>
                    {/*</List>*/}
                    <form onSubmit={handleSubmit}>
                        {/* <h2>投稿</h2> */}
                        <Grid container>
                            <Grid item xs={11}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="投稿内容"
                                    // multiline
                                    // rows={4}
                                    variant="outlined"
                                    value={content}
                                    onChange={onContentChange}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={1} className={classes.sendButton}>
                                <Grid container direction="column" justify="center" alignItems="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth={true}
                                    color="primary"
                                >
                                    送信
                                </Button>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
