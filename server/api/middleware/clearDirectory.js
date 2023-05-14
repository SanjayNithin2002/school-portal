const fs = require('fs');
module.exports = (folder) => {
    fs.readdir(folder, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlinkSync(folder+file);
        }
      });
}