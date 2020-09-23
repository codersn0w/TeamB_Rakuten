import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Divider, Grid, Typography} from "@material-ui/core";
import {Community} from "./Community";
import {BookCard} from "./BookCard";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
    query: string;
};

const useStyles = makeStyles(theme => ({
    queryTitle: {
        paddingTop: theme.spacing(8)
    }
}))

// interface PageStates {
//     books: Array<{ name: string; author: string; genre: string; img: string }>;
// }

type BookType = Readonly<{ id: number, name: string, author: string, genre: string, img: string }>;
const initialObject: BookType[] = []

export const SearchResult = () => {
    const classes = useStyles();
    const [books, setBooks] = useState(initialObject)
    const {query} = useParams();
    useEffect(() => {
        const sample = {
            id: 0,
            name: "小説　盗作",
            author: "やば太郎",
            genre: "小説",
            img:
                "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
        }
        setBooks([sample,sample,sample,sample,sample,sample,sample,sample]);
    }, [])


    // //後でAPI呼び出しに置き換えます
    // setTimeout(() => {
    //     const books = this.state.books;
    //     books.push({
    //         name: "やば太郎大冒険",
    //         author: "やば太郎",
    //         genre: "小説",
    //         img:
    //             "https://images-na.ssl-images-amazon.com/images/I/51XXinn9iFL._SX258_BO1,204,203,200_.jpg",
    //     });
    //     this.setState({books: books});
    // }, 1000);

    return (
        <React.Fragment>
            <Grid container className={classes.queryTitle}>
                <Grid item xs={1}></Grid>
                <Typography variant="h4">「{query}」の検索結果</Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Divider></Divider>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Grid container>
                    {books && books.map((book, index) => (

                            <Grid item xs={2} key={index}>
                                <Link to={`/book/${book.id}`}>
                                    <Grid container>
                                        <BookCard name={book.name} author={book.author} genre={book.genre}
                                                  img={book.img}/>
                                    </Grid>
                                </Link>
                            </Grid>
                    ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

// const rows = this.state.books.map((book, index) => (
//     <li className="list-group-item" key={index}>
//         <div className="row">
//             <img src={book.img} alt="" className="col-xs-6"/>
//             <div className="col-xs-6">
//                 <p>{book.name}</p>
//                 <p>著者 {book.author}</p>
//                 <p>ジャンル {book.genre}</p>
//             </div>
//         </div>
//     </li>
// ));
//
// return rows;
// }
