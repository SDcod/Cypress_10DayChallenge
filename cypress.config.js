const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const { rmdir, readFileSync, existsSync } = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", { downloadFile });
      on("task", {
        deleteDownloads() {
          console.log("deleting downloads");
          return new Promise((res) => {
            rmdir("cypress/downloads/*", () => res(null));
          });
        },
      });
      on("task", {
        readDownloadedFile(fileName) {
          const path = require("path");
          const fs = require("fs");
          const filePath = path.join(__dirname, "cypress/downloads", fileName);
          if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, "utf8");
          }
          throw new Error(`File not found: ${filePath}`);
        },
      });
    },
    downloadsFolder: "cypress/downloads",
  },
  retries: { runMode: 2, openMode: 0 },
  video: true,
  videoCompression: 20,
});
