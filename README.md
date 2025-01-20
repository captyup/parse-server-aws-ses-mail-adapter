# Parse Server AWS SES Mail Adapter

This is an AWS SES mail adapter for Parse Server.

## Installation

```bash
npm install parse-server-aws-ses-mail-adapter
```

## Usage

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
  // ... other configurations
  emailAdapter: mailAdapter
});
```

## Configuration Options

- `region`: AWS Region
- `accessKeyId`: AWS Access Key ID
- `secretAccessKey`: AWS Secret Access Key
- `from`: Sender's email address

## Custom Email Templates

You can customize the content and subject of verification emails. Add the following options when initializing the adapter:

```javascript
const mailAdapter = awsSesMailAdapter({
  // ... other configurations
  verificationBody: 'Dear %username%,\n\n' +
    'Please verify your email address %email%\n' +
    'Click the following link to verify:\n' +
    '%link%\n\n' +
    'Thank you!\n' +
    '%appname%',
  verificationSubject: '%appname% - Please Verify Your Email',
  // Password reset email settings
  passwordResetBody: 'Dear %username%,\n\n' +
    'You have requested to reset your password.\n' +
    'Click the following link to reset your password:\n' +
    '%link%\n\n' +
    'If you did not request this, please ignore this email.\n\n' +
    'Thank you!\n' +
    '%appname%',
  passwordResetSubject: '%appname% - Password Reset Request'
});
```

Available variables:
- `%username%`: Username
- `%email%`: Email address
- `%appname%`: Application name
- `%link%`: Verification link (for email verification) or reset link (for password reset)

If no custom templates are provided, the system will use default English templates.

## License

ISC
