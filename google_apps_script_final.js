function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Check if headers exist, if not, create them
        var headers = sheet.getRange(1, 1, 1, 5).getValues()[0];
        if (headers[0] === "") {
            sheet.getRange(1, 1, 1, 5).setValues([["Timestamp", "Name", "Email", "Subject", "Message"]]);
            sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#e6e6e6");
            sheet.setFrozenRows(1);
        }

        var nextRow = sheet.getLastRow() + 1;
        var newRow = [];
        var timestamp = new Date();

        var data = e.parameter;

        // Fallback for JSON body
        if (Object.keys(data).length === 0 && e.postData && e.postData.contents) {
            try {
                data = JSON.parse(e.postData.contents);
            } catch (err) { }
        }

        // Structure: [Date, Name, Email, Subject, Message]
        newRow.push(timestamp);
        newRow.push(data.name || "No Name");
        newRow.push(data.email || "No Email");
        newRow.push(data.subject || data.category || "No Category");
        newRow.push(data.message || "No Message");

        sheet.appendRow(newRow);

        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

// RUN THIS FUNCTION ONCE TO CLEAR SHEET AND SETUP HEADERS
function setupSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();
    sheet.getRange(1, 1, 1, 5).setValues([["Timestamp", "Name", "Email", "Subject", "Message"]]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#e6e6e6");
    sheet.setFrozenRows(1);
    Logger.log("Sheet cleared and headers set.");
}

function doGet(e) {
    return ContentService.createTextOutput("Script is active.");
}
