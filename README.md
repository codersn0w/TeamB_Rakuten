# TeamB

## Usage
```
docker-compose up -d --build
```

## Migrate & Seed
```
flask db init (初回のみ, migrationsフォルダ作成)

flask db migrate (migrateファイル作成)

flask db upgrade (未実行のmigrationを実行)

flask seed run (Seed実行(今のところgenreのみ))
```


## API

### [URI一覧(app.py)](/server/app.py)

### Usage example of Thread API

#### POST
```
curl -X POST http://localhost:5000/threads   -H "Content-Type:application/json"   -d "{\"name\":\"hoge\",\"genre_id\":\"001001\",\"book_id\":\"001001\"}"
```

#### PUT(-dの其々の引数の有無は任意)
```
curl -X PUT http://localhost:5000/thread/1   -H "Content-Type:application/json"   -d "{\"name\":\"hogehoge\",\"genre_id\":\"001001\",\"book_id\":\"001001\"}"
```

#### GET (Thread一覧)
```
curl http://localhost:5000/threads
```

#### GET (個別のThread)
```
curl http://localhost:5000/thread/1
```

#### DELETE
```
curl -X DELETE http://localhost:5000/thread/1
```


### Usage example of Message API
#### POST
```
curl -X POST http://localhost:5000/messages   -H "Content-Type:application/json"   -d "{\"sentence\":\"test_comment\",\"thread_id\":1,\"sender_id\":\"001001\"}"
```

#### PUT(-dの其々の引数の有無は任意)
```
curl -X PUT http://localhost:5000/message/1   -H "Content-Type:application/json"   -d "{\"sentence\":\"test_comment_edited\",\"thread_id\":1,\"sender_id\":\"001001\"}"
```

#### GET (Message一覧)
```
curl http://localhost:5000/messages
```

#### GET (個別のMessage)
```
curl http://localhost:5000/message/1
```

#### DELETE
```
curl -X DELETE http://localhost:5000/message/1
```