const crypto = require("crypto");

const generateId = (name = "", prefix = "ORD") => {
    const random = crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase()
        .slice(0, 5);

    if (!name) {
        return `${prefix}-${random}`;
    }

    const nameCode = name
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 4)
        .toUpperCase();

    return `${nameCode}-${random}`;
};

module.exports = generateId;