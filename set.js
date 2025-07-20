const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0pkR1czMnFOcTRiY05lNHJ2MHlRUCs5MFdONm5jN0I1cm9xUVh2OGcxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTFYZzlJbU1SV3FnMWkrUjZQSHc4REhIYmM5Q0FGYk1qbDJ1UDhJNkRrcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSlNEaktSOERKemg0b3d3UXN6MmM0RVlUeEJlSnR2MmVucm4vQ2xWaDBJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPaVpNV05zQk95MjJQdFU5bTYvanpDSWwvblJ1dWMvZk1hNE5zZEtZYmlrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMYVVFTTRRZFFWd3RZUG9RYnNwWGtCMGdpWGNEd3A0RFVRUWFkVGlGSEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNzS0lHbkZnclhNK01JTi9vbCt0SjRkVmx3WDZVU2cwN242S2t5MkZiMTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEYrWkFHb3RQTFZjODFEYlN5YUJvd2hzV0gzUm5iMGlQb3JJZzFRSTlWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTNyMU9OOGNTK3FzWDF4a2Fzc1hkWHRmNzFGMW95VHJERXhPREZzc3l5Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldkTVhNN0JMeHJWZGgzbk96VE53ZmlYY2hRcFAxdm5xR1BrREFOYUpFS3dad25SY1RYb0ExTnlFYlhZV3NzVk1XNnB6REdHKyt2aFZSMjBBSnpwdGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6IjlqeWUrMDFPbDRXUzhreEZXUGd2U0JVNndNYi91Y0NkWGgwVEF6OCs2cXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjc2MzE5NjQ2NDdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTc5NTRFNkJFOThCMjgzQUY4QkU3Mzg2MDE4RTUzNkUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MzAzMDYzOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI3NjMxOTY0NjQ3OjQzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlRLUCIsImxpZCI6IjI2NTIyNzc1MzAxMzUwMjo0M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pPSTRhNEdFTlcvOU1NR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlLWU91SGlhUG5ELzBXZ25wb2ZBZG9MMXNsNndLMTlrbWJHbWRiaVZURVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBkS3ZmVlFhN0QzWEhqRll5bTNybUs2QjlXaUNVZzJJMjRicURuRFRPTmkwbk9iWGl6dW9pTi9LTHhTRlNpRG9ZRThDZUhsSms1Qm5OL0kzRnVHTUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHY2J1MG54cHVicTdpRTF1alpNNTRqNEpwTk5xS0J0OXdpZzB6MzQrelBnZk9XNGZCNHZuc0hkQURqMzQzN1lseDFMSGNmK2M2cGpTUk1ncy9lTWVpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI3NjMxOTY0NjQ3OjQzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZTbURyaDRtajV3LzlGb0o2YUh3SGFDOWJKZXNDdGZaSm14cG5XNGxVeEYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MzAzMDYyNywibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQQ0kifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254759626063",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
