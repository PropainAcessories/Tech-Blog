module.exports = {
    // Helper functions
    format_date: () => {
        const dayjs = require('dayjs');
        let now = dayjs().format('MMMM-DD-YYYY hh:mm A').toString();

        console.log(now);

        return now;
    },
    format_multiple: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
};
