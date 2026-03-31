<script setup lang="ts">
import { markRaw, reactive, ref } from "vue";
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  type ForceEdgeDatum,
  type ForceNodeDatum,
} from "v-network-graph/lib/force-layout";
import "v-network-graph/lib/style.css";
import membersArray from "../../../members.json";
import type { Member, Menu } from "../types";
import type { EventHandlers, Layouts } from "v-network-graph";

const members: Member[] = membersArray as Member[];
const nodes = reactive<Record<string, Member>>({});
const edges = reactive({});
const layout = reactive<Layouts>({ nodes: {} });
const menuState = reactive<Menu>({
  isVisible: false,
  member: {
    name: "",
    url: "",
    tags: [],
    jobStatus: "Not looking for work",
    graduationYear: 2023,
  },
  mouseX: null,
  mouseY: null,
});
const selectedNodeID = ref<string>("");

buildNetwork(nodes, edges);

const layoutHandler = markRaw(
  new ForceLayout({
    positionFixedByDrag: false,
    createSimulation: (d3, nodes, edges) => {
      const forceLink = d3
        .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
        .id((d: { id: any }) => d.id)
        .distance(10) // increase to push linked nodes further apart
        .strength(0.01); // lower = links are less rigid

      return d3
        .forceSimulation(nodes)
        .force("edge", forceLink)
        .force("charge", d3.forceManyBody().strength(-700)) // more negative = stronger repulsion between nodes
        .force("center", d3.forceCenter().strength(0.01)) // lower = weaker pull toward center
        .alphaMin(0.001);
    },
  }),
);

const configs = reactive(
  vNG.defineConfigs({
    view: {
      layoutHandler,
    },
    node: {
      label: {
        visible: true,
      },
    },
  }),
);

const hideMenu = () => {
  menuState.isVisible = false;
};

function buildNetwork(nodes: Record<string, Member>, edges: vNG.Edges) {
  const count = members.length;

  const newNodes = Object.fromEntries(
    members.map((member, index) => [`node${index}`, { ...member }]),
  );

  Object.keys(nodes).forEach((id) => delete nodes[id]);
  Object.assign(nodes, newNodes);

  const makeEdgeEntry = (id1: number, id2: number) => {
    return [
      `edge${id1}-${id2}`,
      { source: `node${id1}`, target: `node${id2}` },
    ];
  };

  const newEdges = Object.fromEntries(
    members.map((_, index) => {
      const targetIndex = (index + 1) % count;
      return makeEdgeEntry(index, targetIndex);
    }),
  );

  layout.nodes = {};
  for (let i = 0; i < members.length; i++) {
    const randomX = Math.floor(Math.random() * 600) - 300;
    const randomY = Math.floor(Math.random() * 400) - 200;
    layout.nodes[`node${i}`] = { x: randomX, y: randomY };
  }

  Object.keys(edges).forEach((id) => delete edges[id]);
  Object.assign(edges, newEdges);
}

let suppressViewClick = false;
const eventHandlers: EventHandlers = {
  "node:click": ({ node, event }) => {
    suppressViewClick = true;

    if (node !== selectedNodeID.value) {
      menuState.isVisible = true;
      menuState.mouseX = event.clientX;
      menuState.mouseY = event.clientY;
      menuState.member = nodes[node];
      selectedNodeID.value = node;
    } else {
      selectedNodeID.value = "";
      menuState.isVisible = false;
    }
  },
  "view:click": () => {
    if (suppressViewClick) {
      suppressViewClick = false;
      return;
    }
    menuState.isVisible = false;
    selectedNodeID.value = "";
  },
};
</script>

<template>
  <v-network-graph
    class="graph"
    :zoom-level="0.5"
    :nodes="nodes"
    :edges="edges"
    :layouts="layout"
    :configs="configs"
    :event-handlers="eventHandlers"
  />
  <div
    v-if="menuState.isVisible"
    class="nodeMenu"
    :style="{ left: menuState.mouseX + 'px', top: menuState.mouseY + 'px' }"
  >
    {{ menuState.member.name }}
  </div>
</template>

<style scoped>
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #cccccc;
  background-color: #333333;
}
.nodeMenu {
  position: absolute;
  z-index: 100;
  transform: translate(15px, 15px);

  background-color: #1e1e1e;
  color: #f1f1f1;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #555555;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 500;
}
</style>
