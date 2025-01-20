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
  from: 'your-email@example.com'
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

## 自訂電子郵件模板

你可以自訂驗證郵件的內容和主旨。在初始化適配器時，可以加入以下選項：

```javascript
const mailAdapter = awsSesMailAdapter({
  // ... 其他設定
  verificationBody: '親愛的 %username%，\n\n' +
    '請驗證您的電子郵件地址 %email%\n' +
    '點擊以下連結進行驗證：\n' +
    '%link%\n\n' +
    '謝謝！\n' +
    '%appname%',
  verificationSubject: '%appname% - 請驗證您的電子郵件'
});
```

可用的變數：
- `%username%`: 使用者名稱
- `%email%`: 電子郵件地址
- `%appname%`: 應用程式名稱
- `%link%`: 驗證連結

如果沒有提供自訂模板，系統會使用預設的英文模板。

## 授權

ISC
