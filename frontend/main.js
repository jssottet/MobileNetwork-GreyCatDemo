import * as gc from "@greycat/web";
import * as project from "../gen/project.js";
import { Network } from "vis-network";

let network;

await gc.sdk.init({ server: "http://localhost:8080" });

async function renderGraph(time) {
  const data = await project.graphSnapshot(time);

  const nodes = [];
  const edges = [];

  for (const item of data) {
    nodes.push({
      id: item.id,
      label: `${item.typeName}\n${item.id}`,
      shape: "ellipse"
    });
    if (item.parentId) {
      edges.push({ from: item.parentId, to: item.id });
    }
  }

  const container = document.getElementById("graph");
  const visData = { nodes, edges };

  if (!network) {
    network = new Network(container, visData, { physics: { stabilization: true } });
  } else {
    network.setData(visData);
  }
}

async function updateSignal(ueId, time) {
  const value = await project.ueSignal(ueId, time);
  document.getElementById("signalValue").textContent =
    value !== null && value !== undefined ? value.toFixed(2) : "N/A";
}

document.getElementById("timeSlider").addEventListener("input", async (e) => {
  const time = parseInt(e.target.value, 10);
  document.getElementById("timeValue").textContent = time;
  await renderGraph(time);
  await updateSignal("UE-1", time);
});

await renderGraph(0);
await updateSignal("UE-1", 0);