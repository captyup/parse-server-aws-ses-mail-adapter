# Parse Server AWS SES Mail Adapter

這是一個用於 Parse Server 的 AWS SES 郵件發送適配器。

## 安裝

```bash
npm install parse-server-aws-ses-mail-adapter
```

## 使用方法

```javascript
const ParseServer = require('parse-server').ParseServer;
const awsSesMailAdapter = require('parse-server-aws-ses-mail-adapter');

const mailAdapter = awsSesMailAdapter({
  region: 'YOUR_AWS_REGION',
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
  from: 'your-email@example.com',
  isHtml: false // 設置為 true 如果要發送 HTML 格式的郵件
});

const api = new ParseServer({
  // ... 其他設定
  emailAdapter: mailAdapter
});
```

## 設定選項

- `region`: AWS 區域
- `accessKeyId`: AWS Access Key ID
- `secretAccessKey`: AWS Secret Access Key
- `from`: 寄件者的電子郵件地址
- `isHtml`: 是否發送 HTML 格式的郵件（預設為 false）

## 授權

ISC
