
async function run() {
    console.log("Testing frontend values...");
    try {
        const res = await fetch('https://backend-api-production-ace7.up.railway.app/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Sending the values currently in the frontend code
            body: JSON.stringify({
                "fullName": "Test User",
                "email": "test@test.com",
                "phone": "+91 9999999999",
                "productionCompany": "Test Co",
                "projectTitle": "Test Project",
                "projectType": "TV Commercial", // In frontend
                "preferredLocation": "Bhopal",
                "estimatedBudget": "Below ₹1 Crore", // In frontend
                "additionalNotes": "Notes"
            })
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Validation Errors:", JSON.stringify(data.errors, null, 2));
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

run();
