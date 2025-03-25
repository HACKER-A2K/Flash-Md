const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0lyY1YwblpPRUtyc3ZGdnhIc2VKTFZQSDNSdFBlR3ZUbHhiL2l0WUJWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3lxU3RWZlEzT2U3WnExdTFyUjh2cklUcE43cTNjb1V5ckJOeUlpZVhUVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQjcyNTI5OWRIekcxbVJRRXIrSmRTZWhBdEYvSE5LN2daL1NZRnlwWG5vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKcGwvZG9UZDhZVlFvS3Y5Ty9RdkdyT0V2UEhYR09jQXRNU0NhS2FJMnlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FQm40eFpTSVcxMlVaMEdDMGtENHZnSU94T3c5N0pqTVZTSExleXJpMTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im91Z3l3V1JVeXNFMjhIMEF6Ykt2VVVIM3lEVHhPWDZUTWIwbkJyeEFmVzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0t1TnlVV1dKc3hUdVJsSnpoUmFqaHlrN3BIaDBOVlRRTjMzMGEvUE9IQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlJqSHhmMUJoMXFOMU1OcEx3cklNZko1UFpiSWo4cldYc1ptbkZBT3ZqVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9mTzNjdDBuV2k1bHJpUng2SlhpSktlRm51ek1CRndrTVlNcVd0MDVNUjFqT0FDZk5jcTAyd0ljb2J5NWhkNUFtT1k3Tk1OZlNpVGpJNFRhTTRFN0R3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIyLCJhZHZTZWNyZXRLZXkiOiJkdGlaZEZSQU5oa0QzSFo5SEV1NjZtSWFEdWFOWktTUlZzZUdWNTZkNnljPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzY1Nzk5NTkyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBBMEY3MUI1MTY3NDI1OEU2QTlGMTc0NDM4RDc0MzNGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDI5MzI0ODJ9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzY1Nzk5NTkyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdEMzQyMzMzQ0U5OEJEQ0JERDg5Nzk1MUJFNzBGOTBDIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDI5MzI0ODd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlNSbGpDMVF2U00yOEpvWlVhZkFmbFEiLCJwaG9uZUlkIjoiYjI4OWI1NDgtZjlmMy00ZjA4LWFlZjUtZjNmMmUzZDUxOTJiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNjNk5PWFlWSmZxd2VnYnA1MU1MSGZiTlRRST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRk5URDY3YkhtQk9Cc21kMW5sd0Q3VmU1OWM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1RXU0w4VzEiLCJtZSI6eyJpZCI6Ijk0NzY1Nzk5NTkyOjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSEFDS0VSIFlPVkkgT0ZGSUNJQUwgV0EifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0krdjV0MEZFTytUakw4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im9HT3lXbFNyczJONjFiZmVHcThVVFc4b3dZQzFhcU9icFdOd1FvNVhoMWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVMVUo1dXBDVStoWXI2UzRUNGRFODJxTE53Tkd5MWdYVE1GbDhVVytkMTl3ZmZGUTQ0NGZCWjlGVkZybDJJWS9XamVjRlNhb3FjOFNHZzdBRnNXWkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI5YTVwOTFUTWpMd2dHaFpCUnhWYkowTEhiL25SMEdVcVRqY3lMbWdQQkkxOUJ2c1pKNVE2RTBoRGh2SXpsTDZza3p3ZEs1MWFnUXBjayt1NGo1RmVCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzY1Nzk5NTkyOjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYUJqc2xwVXE3TmpldFczM2hxdkZFMXZLTUdBdFdxam02VmpjRUtPVjRkWCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MjkzMjQ3NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHRzUifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "HACKER A2K",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94773883257",
    AUTO_LIKE: process.env.STATUS_LIKE || "on",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
