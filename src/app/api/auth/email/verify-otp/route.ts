import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { otp, email, projectID } = await req.json();

    await new Promise((resolve, reject) => {
        setInterval(() => {
            resolve(true);
        }, 5000);
    });

    if (!otp || !email || !projectID) {
        return NextResponse.json({ error: 'Invalid token or projectID' }, { status: 400 });
    }

    try {
        // Verify the token against your database
        console.log(`Verifying token: ${otp}`);
        // hardcode for now
        const trueOtp = '08060';

        // check if token is valid
        const isValid = otp === trueOtp;
        if (!isValid) {
            return NextResponse.json({ error: `Invalid OTP: ${otp}` }, { status: 400 });
        }

        // if valid, update the user's email verification status in the database
        // await db.updateUser(email, { emailVerified: true });

        // send loading animation
        // const html = `
        //     <html>
        //         <head>
        //             <title>Email Verification</title>
        //             <style>
        //                 body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        //                 .loader { border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
        //                 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        //             </style>
        //         </head>
        //         <body>
        //             <div class="loader"></div>
        //             <script>
        //                 localStorage.setItem('emailVerified', '${isValid}');
        //                 setTimeout(() => {
        //                     window.location.href = '/whitelist/${projectID}';
        //                 }, 1000);
        //             </script>
        //         </body>
        //     </html>
        // `;

        return NextResponse.json({ message: `valid OTP ${otp}` }, { status: 200 });
    } catch (error) {
        console.error('Error verifying email:', error);
        return NextResponse.json({ error: 'Error verifying email' }, { status: 500 });
    }
}