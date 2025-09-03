


//Creation of a WebComponent for the GraphView

import { GuiInputTime } from "@greycat/web";
import { DataSet, Network } from 'vis-network/standalone'

export class GrapView extends HTMLElement {
  
  timeInput!: GuiInputTime;
  interval?: number;

  minTime: gc.time | null = gc.time.create(1000*1000*60);
  maxTime: gc.time | null = gc.time.create(1000*1000*60*145);

  networkContainer: HTMLDivElement;
  network!: Network;

  constructor() {
    super();

    this.timeInput = (
      <gui-input-time
        id="time-slider-input"
        ongui-change={(e) => {
          if (e.detail) {
            this.fetchData(e.detail);
          }
        }}
      />
    ) as GuiInputTime;
    this.timeInput.value = gc.time.create(1000*1000*60);

    this.networkContainer = document.createElement("div");
    this.networkContainer.setAttribute("height", "900px");
    this.networkContainer.style.width="100%";
  }

  connectedCallback() {
    this.render();
    this.fetchData();
  }

  disconnectedCallback() {}
 
  private async fetchData(t: gc.core.time | null = this.timeInput.value) {
    
    // create an array with nodes
    var nodes = new DataSet<gc.NetworkNodeItem>([]);

    // create an array with edges
    var edges = new DataSet<gc.NetworkEdgeItem>([]);

    var result = await gc.api.graphSnapshot(t);

    result.nodes.forEach(n => {
      let color = "#97C2FC";
      let shape: string = "dot";
      let size = 15;
      
      if (n.type === "UE") {
        color = "#FF6B6B";
        shape = "box";
        size = 25;
      } else if (n.type === "NrCellDU") {
        color = "#4ECDC4";
        size = 25;
      } else if (n.type === "Sync") {
        color = "#64ff3df5";
        shape = "box";
        size = 35;
      }
      nodes.add({
        //cast workaround TODO: possibly use visNode / visEdge instead
        ...(n as any), 
        color: { background: color, border: "#333" },
        font: { color: "#1a1515ff" },
        shape,
        size,
      });
    });

    result.edges.forEach(n => {
      edges.add(n);
    });

    var data = {
      nodes: nodes,
      edges: edges,
    };

    this.network.setData(data);

  }
      



  render() {
    this.innerHTML = ""; //reset

    const timeSlider = (
      <div id={'time-slider'}>
        {this.timeInput}
        <sl-button
          style={{ width: '50px' }}
          onclick={(e) => {
            if (this.interval) {
              clearInterval(this.interval);
              this.interval = undefined;
              (e.target as HTMLButtonElement).textContent = '▶️';
            } else {
              (e.target as HTMLButtonElement).textContent = '⏸';
              this.interval = window.setInterval(() => {
                if (this.timeInput.value && this.maxTime) {
                  this.timeInput.value = this.timeInput.value.add(gc.duration.from_mins(1));
                  if (this.timeInput.value >= this.maxTime) {
                    this.timeInput.value = this.minTime;
                    (e.target as HTMLButtonElement).textContent = '⏵';
                    clearInterval(this.interval);
                    this.interval = undefined;
                  } else {
                    this.fetchData(this.timeInput.value);
                  }
                }
              }, 1000);
            }
          }}
        >
          ⏵
        </sl-button>
      </div>
    );
    let controlBar = document.createElement('div');
    controlBar.style.display = "flex";
    controlBar.style.alignItems = "center";
    controlBar.style.gap = "12px";
    controlBar.style.marginBottom = "10px";

    controlBar.appendChild(
      <div style="display: flex; gap: 10px; align-items: center;">
        Time: {timeSlider}
      | UE Signal: <span id="signalValue">N/A</span>
      </div>
    );

    this.appendChild(controlBar);

    var options = {
      autoResize: true,
      width: '100%',
      height: '600px',
      layout: {
        randomSeed: 1234567,
      },
      nodes: {
        font : {
          size : 25,
          face : "arial",
          color: "#1a1515ff",
        },
        borderWidth : 2,
        shadow : true,
      },
      edges:{
        smooth: {type :"dynamic"},
        arrows: {
          to: {
            enabled: true,
            scaleFactor : 0.7,
          },
        },
      physics: {
        stabilization: false,
        barnesHut: {
          gravitationalConstant: -2000,
          springLength: 120,
          springConstant: 0.04,
        },
      },
      }
    };
    this.network = new Network(this.networkContainer, {}, options);

    this.appendChild(this.networkContainer);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'graph-view': GrapView;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'graph-view': GreyCat.Element<GrapView>;
      }
    }
  }
}

if (!customElements.get('graph-view')) {
  customElements.define('graph-view', GrapView);
}