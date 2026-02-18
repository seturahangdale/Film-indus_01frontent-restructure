
async function run() {
    console.log("Sending invalid data...");
    try {
        const res = await fetch('https://backend-api-production-ace7.up.railway.app/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // Empty body should trigger validation error
        });

        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body:", text);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

run();
