document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("postgresql://neondb_owner:npg_t5mswf7UeHno@ep-dry-poetry-a5j6ov7c-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
        const data = await response.json();
        document.getElementById("count").textContent = data.count;
    } catch (error) {
        console.error("Error fetching visitor count:", error);
    }
});
