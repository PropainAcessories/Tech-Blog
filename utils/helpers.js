module.exports = {
    // Helper functions
    format_multiple: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
};
