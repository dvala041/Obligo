const cron = require('node-cron');
const mongoose = require('mongoose');

// Connect to MongoDB before running this cron job

// Example: Cleanup chore data older than 7 days (Minute, hour, day of month, month, day of week)
cron.schedule('40 1 * * *', async () => {
    try {
        await mongoose.connection.collection('chores').deleteMany({
            "createdAt": { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });
        console.log("Old chores cleaned up successfully.");
    } catch (error) {
        console.error("Failed to clean up old chores:", error);
    }
});

module.exports = cron; // Export cron instance if needed