//Creation of a WebComponent for the GraphView

import { sl } from "@greycat/web";
import { Network, Node, DataSet } from "vis-network/standalone";
import "@greycat/web/greycat.css";
import "./graph-view.css";

export class GrapView extends HTMLElement {
  timeSlider: sl.SlRange;
  interval?: number;

  sidebar: sl.SlDrawer;

  minTime: gc.time = gc.time.create(1000 * 1000 * 60);
  maxTime: gc.time = gc.time.create(1000 * 1000 * 60 * 145);

  networkContainer: HTMLDivElement;
  network: Network;

  nodes?: DataSet<gc.NetworkNodeItem>;

  constructor() {
    super();
    this.networkContainer = document.createElement("div");
    this.networkContainer.className = "network-container";
    this.network = new Network(
      this.networkContainer,
      {},
      {
        autoResize: true,
        width: "100%",
        height: "100%",
        layout: {
          randomSeed: 1234567,
        },
        nodes: {
          shape: "dot",
          color: "#97C2FC",
          size: 15,
          font: {
            size: 20,
            color: "#1a1515ff",
          },

          borderWidth: 2,
          shadow: true,
        },
        // edges: {
        //   smooth: { enabled: false, type: "dynamic", roundness: 10 },
        //   arrows: {
        //     to: {
        //       enabled: true,
        //       scaleFactor: 0.7,
        //     },
        //   },
        //   physics: true,
        // },
        // physics: {
        //   stabilization: false,
        //   barnesHut: {
        //     gravitationalConstant: -2000,
        //     springLength: 120,
        //     springConstant: 0.04,
        //   },
        // },
        groups: {
          UE: {
            color: "#FF6B6B",
            size: 15,
            shape: "box",
          },
          CellCU: {
            color: "#4ECDC4",
            size: 15,
          },
          Sync: {
            color: "#64ff3df5",
            size: 15,
            shape: "box",
          },
          BWP: {
            color: "yellow",
            size: 15,
          },
        },
      }
    );

    this.sidebar = (
      <sl-drawer contained style="--size: 25%;"></sl-drawer>
    ) as sl.SlDrawer;

    this.timeSlider = (
      <sl-range
        defaultValue={this.minTime?.epochMs}
        min={this.minTime?.epochMs}
        max={this.maxTime?.epochMs}
        onsl-input={(e: any) => {
          if (e.target.value) {
            this.fetchData(gc.time.fromMs(e.target.value));
          }
        }}
      />
    ) as sl.SlRange;
    this.timeSlider.tooltipFormatter = (val) =>
      `${gc.time.fromMs(val).toString()}`;
  }

  connectedCallback() {
    this.render();
    this.fetchData();
  }

  disconnectedCallback() {}

  private async fetchData(t: gc.core.time | null = this.minTime) {
    const result = await gc.api.graphSnapshot(t);

    const x = -this.networkContainer.clientWidth / 2 - 100;
    const y = -this.networkContainer.clientHeight / 2 - 100;
    const step = 80;
    let legend: Node[] = [];
    legend.push({
      id: 1000,
      x: x,
      y: y,
      label: "CellDU",
      group: "CellDU",
      value: 1,
      fixed: true,
      physics: false,
    });
    legend.push({
      id: 1001,
      x: x,
      y: y + step,
      label: "CellCU",
      group: "CellCU",
      value: 1,
      fixed: true,
      physics: false,
    });
    legend.push({
      id: 1002,
      x: x,
      y: y + 2 * step,
      label: "UE",
      group: "UE",
      value: 1,
      fixed: true,
      physics: false,
      shape: "dot",
    });
    legend.push({
      id: 1003,
      x: x,
      y: y + 3 * step,
      label: "BWP",
      group: "BWP",
      value: 1,
      fixed: true,
      physics: false,
    });
    this.nodes = new DataSet(result.nodes);
    console.log(this.nodes);

    result.nodes.push(...(legend as any));
    this.network.setData({
      nodes: result.nodes,
      edges: result.edges,
    });
  }

  private updateSidebar(nodeId: string) {
    const node = this.nodes?.get(nodeId);
    if (!node) {
      this.sidebar.open = false;
      return;
    }

    // const typeImages: Record<string, string> = {
    //   UE: "/images/ue-icon.jpg",
    //   NrCellDU: "/images/nrcell-icon.jpg",
    //   Sync: "/images/sinr-icon.jpg",
    // };

    this.sidebar.label = nodeId;

    this.sidebar.replaceChildren(<gui-object value={node.data}></gui-object>);
    this.sidebar.open = true;
  }

  render() {
    const timeSlider = (
      <div id={"time-slider"}>
        {this.timeSlider}
        <sl-button
          style={{ width: "50px" }}
          onclick={(e) => {
            if (this.interval) {
              clearInterval(this.interval);
              this.interval = undefined;
              (e.target as HTMLButtonElement).textContent = "▶";
            } else {
              (e.target as HTMLButtonElement).textContent = "⏸";
              this.interval = window.setInterval(() => {
                this.timeSlider.value =
                  this.timeSlider.value + gc.duration.from_mins(1).ms;
                if (this.timeSlider.value >= this.maxTime.epochMs) {
                  console.log("yes");

                  this.timeSlider.value = this.minTime.epochMs;
                  (e.target as HTMLButtonElement).textContent = "▶";
                  clearInterval(this.interval);
                  this.interval = undefined;
                } else {
                  this.fetchData(gc.time.fromMs(this.timeSlider.value));
                }
              }, 2000);
            }
          }}
        >
          ▶
        </sl-button>
      </div>
    );

    this.replaceChildren(
      <>
        <div className={"control-bar"}>
          <div style="display: flex; gap: 10px; align-items: center;">
            Time: {timeSlider}| UE Signal: <span id="signalValue">N/A</span>
          </div>
        </div>
        {this.networkContainer}
        {this.sidebar}
      </>
    );

    // --- Gestion du clic sur les nœuds ---
    this.network.on("selectNode", (params) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        this.updateSidebar(nodeId);
      } else {
        // clic à vide -> fermer sidebar
        this.sidebar.style.display = "none";
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "graph-view": GrapView;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        "graph-view": GreyCat.Element<GrapView>;
      }
    }
  }
}

if (!customElements.get("graph-view")) {
  customElements.define("graph-view", GrapView);
}
