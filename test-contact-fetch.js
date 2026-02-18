
async function run() {
    console.log("Starting contact fetch test...");
    try {
        const res = await fetch('https://backend-api-production-ace7.up.railway.app/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            },
            body: JSON.stringify({
                "name": "Akshat Verma",
                "email": "akshatverma@gmail.com",
                "phone": "+91 9999999999",
                "subject": "Studio Website Inquiry",
                "message": "Hello, I want to know more about your video production serv"
            })
        });

        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body:", text);
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

run();
