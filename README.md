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

#### GET (GenreごとのThread一覧, 数字はジャンルID)
```
http://localhost:5000/threadslist/001001
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


### Usage example of Notification API
```
curl -X POST http://localhost:5000/notifications   -H "Content-Type:application/json"   -d "{\"user_id\":\"hoge\",\"desc\":\"This is Alert\",\"type\":\"wtf\",\"img\":\"imgimg\"}"

curl -X PUT http://localhost:5000/notification/1   -H "Content-Type:application/json"   -d "{\"user_id\":\"hoge\",\"desc\":\"This is Alert_edited\",\"type\":\"wtf\",\"img\":\"imgimg\"}"

curl http://localhost:5000/notifications

curl http://localhost:5000/notification/1

curl -X DELETE http://localhost:5000/notification/1
```


### Usage example of Follow API
```
curl -X POST http://localhost:5000/follows   -H "Content-Type:application/json"   -d "{\"from_id\":\"from_user_id\",\"to_id\":\"to_user_id\"}"

curl -X PUT http://localhost:5000/follow/1   -H "Content-Type:application/json"   -d "{\"from_id\":\"from_user_id_edited\",\"to_id\":\"to_user_id_edited\"}"

curl http://localhost:5000/follows

curl http://localhost:5000/follow/1

curl -X DELETE http://localhost:5000/follow/1
```