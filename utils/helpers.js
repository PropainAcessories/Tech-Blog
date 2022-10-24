module.exports = {
    // Helper functions
    format_date: () => {
        const dayjs = require('dayjs');
        let now = dayjs().format('MMMM-DD-YYYY hh:mm').toString();

        const date = new Date(now);
        console.log(date);

        return date;
    },
    format_multiple: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
};
