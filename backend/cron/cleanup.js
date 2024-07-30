const cron = require('node-cron');
const mongoose = require('mongoose');

// Connect to MongoDB before running this cron job

// Example: Cleanup chore data older than 7 days (Minute, hour, day of month, month, day of week)
cron.schedule('0 0 * * *', async () => {
    try {
        //deletes chores older than a week that are "Completed" or "Late"
        await mongoose.connection.collection('chores').deleteMany({
            "due_date": { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
            $or: [
                { "status": "Completed" },
                { "status": "Late" }
            ]
        });
        console.log("Old completed or late chores cleaned up successfully.");
    } catch (error) {
        console.error("Failed to clean up old completed or late chores:", error);
    }
});

module.exports = cron; // Export cron instance if needed
