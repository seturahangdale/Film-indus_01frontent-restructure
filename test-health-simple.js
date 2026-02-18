const https = require('https');
console.log("Starting health check...");
https.get('https://backend-api-production-ace7.up.railway.app/api/health', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        console.log("Health Check Response: " + data);
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
