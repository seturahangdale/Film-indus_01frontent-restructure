const https = require('https');

console.log("TEST_RUN_V2");

const data = JSON.stringify({
    "fullName": "Akshat Verma",
    "email": "apply.akshat@gmail.com",
    "phone": "+91 8888888888",
    "productionCompany": "Akshat Films Pvt Ltd",
    "projectTitle": "Brand Commercial Shoot",
    "projectType": "Advertisement",
    "preferredLocation": "Mumbai",
    "estimatedBudget": "5-10 Lakhs",
    "additionalNotes": "We need full production support including crew, cam"
});

const options = {
    hostname: 'backend-api-production-ace7.up.railway.app',
    port: 443,
    path: '/api/apply',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let chunks = [];
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        console.log('BODY:', body);
    });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
