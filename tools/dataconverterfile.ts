const fsg = require('fs');
const fs = require('fs').promises;

function parseNrCellDu(inputText,locationIndex) {
    const duMatches = [...inputText.matchAll(/DU ID (\d+)/g)];
    const cellMatches = [...inputText.matchAll(/nrCellID (\d+), PCI (\d+), SSB ARFCN (\d+)/g)];
    const tddMatches = [...inputText.matchAll(/TDD: band (\d+) ARFCN (\d+) SCS (\d+) \(kHz\) PRB (\d+)/g)];
    const ueMatches = [...inputText.matchAll(/DU UE ID (\d+) RNTI ([0-9a-fA-F]+)/g)];
    const syncSignalMatches = [...inputText.matchAll(/resultSSB:RSRP (-?\d+) dBm RSRQ (-?\d+\.\d+) dB SINR (-?\d+\.\d+)/g)];
    
    let results = [];
    let timestamp = 1;
    
    for (let i = 0; i < Math.max(duMatches.length, cellMatches.length, ueMatches.length); i++) {
        let duMatch = duMatches[i] || [];
        let cellMatch = cellMatches[i] || [];
        let tddMatch = tddMatches[i] || [];
        let ueMatch = ueMatches[i] || [];
        let syncMatch = syncSignalMatches[i] || [];
        
        let ran = {
            "RAN": {
                "NrCellDU": duMatch.length > 0 ? {
                    "NrCellDuId": parseInt(duMatch[1], 10),
                    "PIC": cellMatch[2] ? parseInt(cellMatch[2], 10) : null,
                    "SSB": cellMatch[3] ? parseInt(cellMatch[3], 10) : null,
                    "Policy": "TDD",
                    "band": tddMatch[1] ? parseInt(tddMatch[1], 10) : null,
                    "SSB2": tddMatch[2] ? parseInt(tddMatch[2], 10) : null,
                    "BWP": tddMatch[3] && tddMatch[4] ? { "SCS": parseInt(tddMatch[3], 10), "PRB": parseInt(tddMatch[4], 10) } : null
                } : null,
                "NrCellCU": cellMatch.length > 0 ? {
                    "nrCellID": parseInt(cellMatch[1], 10)
                } : null,
                "UE": ueMatch.length > 0 ? {
                    "id": parseInt(ueMatch[1], 10),
                    "RNTI": ueMatch[2],
                    "SynchronizationSignal": syncMatch.length > 0 ? {
                        "RSRP": parseInt(syncMatch[1], 10),
                        "RSRQ": parseFloat(syncMatch[2]),
                        "SINR": parseFloat(syncMatch[3])
                    } : null
                } : null,
                "timestamp": timestamp++
            }
        };
        results.push(ran);
    }
    
    const jsonString = JSON.stringify(results, null, 2);
    //console.log(jsonString);
    var filename = locationIndex.toString()+'_output.json';
    fsg.writeFileSync('server/networkdatafiles/conversion/'+filename, jsonString, 'utf8');
}


async function readFiles() {
    for (let i = 1; i <= 12; i++) {
        let filename = i.toString() + '.log';
        console.log(filename);
        const filePath = 'server/networkdatafiles/' + filename; // Change this to the actual file path
        try {
            const data = await fs.readFile(filePath, 'utf8');
            console.log('Generating for :', filename);
            parseNrCellDu(data, i);
        } catch (err) {
            console.error('Error reading the file:', err);
        }
    }
}


async function writeToFile(filePath, content) {
    try {
        // Écrit le contenu dans le fichier spécifié
        await fs.writeFile(filePath, content, 'utf8');
        console.log('File written successfully:', filePath);
    } catch (err) {
        // Gère les erreurs qui peuvent survenir lors de l'écriture
        console.error('Error writing to the file:', err);
    }
}

readFiles();
