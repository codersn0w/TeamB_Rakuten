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

### Example usage of Thread API
```
curl -X POST http://localhost:5000/threads   -H "Content-Type:application/json"   -d "{\"name\":\"hoge\",\"genre_id\":\"001001\",\"book_id\":\"001001\"}"
```

```
curl -X PUT http://localhost:5000/thread/1   -H "Content-Type:application/json"   -d "{\"name\":\"hogehoge\",\"genre_id\":\"001001\",\"book_id\":\"001001\"}"
```

### Example usage of Message API
```
curl -X POST http://localhost:5000/messages   -H "Content-Type:application/json"   -d "{\"sentence\":\"test_comment\",\"thread_id\":1,\"sender_id\":\"001001\"}"
```

```
curl -X PUT http://localhost:5000/message/1   -H "Content-Type:application/json"   -d "{\"sentence\":\"test_comment_edited\",\"thread_id\":1,\"sender_id\":\"001001\"}"
```