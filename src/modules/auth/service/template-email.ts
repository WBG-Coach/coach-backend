export const OTP_EMAIL = `
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
            color: #333;
            text-align: center;
            padding: 50px;
        }
        .otp-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: inline-block;
        }
        .otp-title {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .otp-code {
            font-size: 40px;
            font-weight: bold;
            letter-spacing: 5px;
            margin: 20px 0;
            color: #4CAF50;
        }
        .instructions {
            font-size: 16px;
            margin-top: 20px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="otp-container">
        <div class="otp-title">Your OTP Code</div>
        <div class="otp-code">#{code}</div>
        <div class="instructions">
            Please use the above code to complete your verification. This code is valid for 10 minutes.
        </div>
    </div>
</body>
</html>
`;
