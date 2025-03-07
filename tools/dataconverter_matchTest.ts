const fs = require('fs');

function parseNrCellDu(inputText) {
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
    console.log(jsonString);
    
    fs.writeFileSync('server/networkdatafiles/conversion/test.json', jsonString, 'utf8');
}

// Example usage
const inputText = `1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.5 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -110 dBm RSRQ -11.0 dB SINR 15.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 15.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 15.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 13.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 13.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 15.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 15.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -112 dBm RSRQ -11.0 dB SINR 13.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -111 dBm RSRQ -11.0 dB SINR 14.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -116 dBm RSRQ -11.5 dB SINR 9.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -119 dBm RSRQ -12.0 dB SINR 5.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -117 dBm RSRQ -11.5 dB SINR 8.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -113 dBm RSRQ -11.0 dB SINR 12.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -114 dBm RSRQ -11.0 dB SINR 11.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 1 status established
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 0 status released
    PDU session 1 ID 2 status established
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -115 dBm RSRQ -11.0 dB SINR 10.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 0 status released
    PDU session 1 ID 0 status released
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -117 dBm RSRQ -11.5 dB SINR 8.5 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 0 status released
    PDU session 1 ID 0 status released
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -117 dBm RSRQ -11.5 dB SINR 8.0 dB 

1 connected DUs 
[1] DU ID 3584 (gNB-OAI) integrated DU-CU: nrCellID 12345678, PCI 0, SSB ARFCN 653952
    TDD: band 77 ARFCN 653424 SCS 30 (kHz) PRB 106
UE 0 CU UE ID 1 DU UE ID 55145 RNTI d769 random identity 2a1acff161000000:
    last RRC activity: 1 seconds ago
    PDU session 0 ID 0 status released
    PDU session 1 ID 0 status released
    associated DU:  (local/integrated CU-DU)
    servingCellId 0 MeasResultNR for phyCellId 0:
      resultSSB:RSRP -117 dBm RSRQ -11.5 dB SINR 8.0 dB  `;


      
console.log(parseNrCellDu(inputText));