import React, {useEffect, useState} from "react";
import {Link, RouteComponentProps, useParams} from "react-router-dom";
import {Divider, Grid, Theme, Typography, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ThreadCard} from "./ThreadCard";
import {ThreadCreateBox} from "./ThreadCreateBox";
import axios from "axios";

type OldProps = {} & RouteComponentProps<{ id: string }>;

interface States {
    name: string;
    news: Array<{ date: string; desc: string }>;
    threads: Array<{
        title: string;
        author: string;
        posts: string;
    }>;
    form: { title: string; content: string };
}

const useStyles = makeStyles((theme: Theme) => ({
    genreTitle: {
        paddingTop: theme.spacing(8)
    },
    threadsArea: {
        paddingTop: theme.spacing(8)
    },
    newThread: {
        paddingTop: theme.spacing(8)
    }
}))


type threadType = Readonly<{ id: number, genre_id: string, book_id: string, name: string, createTime: string }>
const initialThreads: threadType[] = [];

export const Genre = () => {
    const classes = useStyles()
    const {id} = useParams();
    const [threads, setThreads] = useState(initialThreads)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/threads");
            console.log(res);
            setThreads(res.data.items);
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Grid container className={classes.genreTitle}>
                <Grid item xs={1}></Grid>
                <Typography variant="h4">
                    コミュニティ
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Divider></Divider>
                </Grid>
            </Grid>
            {/*<Grid container>*/}
            {/*    <Grid item xs={1}></Grid>*/}
            {/*<Typography variant="h5">ニュース</Typography>*/}
            {/*    </Grid>*/}
            {/*<ul>*/}
            {/*    /!*{this.state.news.map((item, index) => (*!/*/}
            {/*    /!*  <li className="list-group-item" key={index}>*!/*/}
            {/*    /!*    {item.date} {item.desc}*!/*/}
            {/*    /!*  </li>*!/*/}
            {/*    /!*))}*!/*/}
            {/*</ul>*/}
            <Grid container className={classes.threadsArea}>
                <Grid item xs={1}></Grid>
                <Typography variant="h5">スレッド一覧</Typography>
            </Grid>
            {threads.map((thread, index) => (
                <Grid container key={index}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <Link to={`/threads/${thread.id}`}>
                            <ThreadCard name={thread.name}></ThreadCard>
                        </Link>
                    </Grid>
                </Grid>
            ))}
            <Grid container className={classes.newThread}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <ThreadCreateBox genreId={id}></ThreadCreateBox>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

class _Genre extends React.Component<OldProps, States> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: "",
            news: [],
            form: {title: "スレッド名", content: "HOGE"},
            threads: [],
        };

        //後でAPI呼び出しに置き換えます
        setTimeout(() => {
            this.setState({
                name: "小説",
                news: [
                    {date: "2019-10-10", desc: "小説「わおわお」が売り上げ一位に"},
                ],
                threads: [
                    {
                        author: "山田太郎",
                        title: "p15の表記について話し合うスレ",
                        posts: "15",
                    },
                ],
            });
        }, 100);

        //thisを固定します　これがないとフォーム入力時にエラー
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            form: {title: event.target.value, content: this.state.form.content},
        });
        console.log(this.state.form);
    }

    private onContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            form: {title: this.state.form.title, content: event.target.value},
        });
        console.log(this.state.form);
    }

    private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(this.state.form.title + " was submitted!");
        //ここでスレッド作成APIを呼び出す
        //ここで新規作成スレッドに移動する
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Typography variant="h4">
                        {this.state.name} コミュニティ
                    </Typography>
                </Grid>
                <h2>ニュース</h2>
                <ul>
                    {this.state.news.map((item, index) => (
                        <li className="list-group-item" key={index}>
                            {item.date} {item.desc}
                        </li>
                    ))}
                </ul>
                <h2>スレッド</h2>
                {this.state.threads.map((thread, index) => (
                    <li className="list-group-item" key={index}>
                        <h3>{thread.title}</h3>
                        <div className="row">
                            <p>投稿者：{thread.author}</p>
                            <p>投稿：{thread.posts}件</p>
                        </div>
                    </li>
                ))}
                <form onSubmit={this.handleSubmit}>
                    <h3>新規スレッド</h3>
                    <label htmlFor="title">スレッド名</label>
                    <input
                        type="text"
                        name="title"
                        value={this.state.form.title}
                        onChange={this.onTitleChange}
                    />
                    <label htmlFor="content">投稿内容</label>
                    <textarea
                        name="content"
                        value={this.state.form.content}
                        onChange={this.onContentChange}
                    ></textarea>
                    <input type="submit" value="スレッド作成"/>
                </form>
            </React.Fragment>
        );
    }
}
