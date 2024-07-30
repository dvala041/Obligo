const cron = require('node-cron');
const mongoose = require('mongoose');

// Connect to MongoDB before running this cron job

// Example: Mark chores as "Late" if their due_date is before the current date (Minute, hour, day of month, month, day of week)
cron.schedule('4 0 * * *', async () => {
    try {
        const currentDate = new Date();
        await mongoose.connection.collection('chores').updateMany(
            { "due_date": { $lt: currentDate } },
            { $set: { "status": "Late" } }
        );
        console.log("Chores with past due dates marked as 'Late' successfully.");
    } catch (error) {
        console.error("Failed to mark chores with past due dates as 'Late':", error);
    }
});

module.exports = cron; // Export cron instance if needed
