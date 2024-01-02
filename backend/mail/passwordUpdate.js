exports.passwordUpdate=(email,name)=>{
    return `<DOCTYPE html>
    <html>
        <head>
            <title>Password Update</title>
            <style>
                body{
                    background-color: #f1f1f1;
                }
                .container{
                    width: 60%;
                    margin: auto;
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                }
            </style>
            </head>
            <body>
                <div class="container">
                    <h1>Dear ${name}</h1>
                    <p>Your password has been updated successfully</p>
                    <p>If you did not make this change, please contact us immediately</p>
                </div>
                </body>
                </html>
            `
}
