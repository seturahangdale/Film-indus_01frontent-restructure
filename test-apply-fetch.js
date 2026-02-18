
async function run() {
    console.log("Starting fetch test with headers...");
    try {
        const res = await fetch('https://backend-api-production-ace7.up.railway.app/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                "fullName": "Akshat Verma",
                "email": "apply.akshat@gmail.com",
                "phone": "+91 8888888888",
                "productionCompany": "Akshat Films Pvt Ltd",
                "projectTitle": "Brand Commercial Shoot",
                "projectType": "Advertisement",
                "preferredLocation": "Mumbai",
                "estimatedBudget": "5-10 Lakhs",
                "additionalNotes": "We need full production support including crew, cam"
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
