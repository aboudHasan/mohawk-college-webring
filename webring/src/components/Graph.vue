<script setup lang="ts">
import { computed, markRaw, reactive, ref, watch } from "vue";
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  type ForceEdgeDatum,
  type ForceNodeDatum,
} from "v-network-graph/lib/force-layout";
import "v-network-graph/lib/style.css";
import membersArray from "../../../members.json";
import type {
  JobFilters,
  Member,
  Menu,
  TechFilters,
  YearFilters,
} from "../types";
import type { EventHandlers, Layouts } from "v-network-graph";

const members: Member[] = membersArray as Member[];
const nodes = reactive<Record<string, Member>>({});
const edges = reactive<vNG.Edges>({});
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

const props = defineProps<{
  currentJobFilters: JobFilters[];
  currentTechFilters: TechFilters[];
  currentYearFilters: YearFilters[];
  currentSearchFilter: string;
}>();

const filteredMembers = computed<Member[]>(() => {
  return members.filter((member) => {
    const matchName =
      props.currentSearchFilter.length === 0 ||
      member.name
        .toLowerCase()
        .startsWith(props.currentSearchFilter.toLowerCase());

    const matchJob =
      props.currentJobFilters.length === 0 ||
      props.currentJobFilters.includes(member.jobStatus);

    const matchTech =
      props.currentTechFilters.length === 0 ||
      member.tags.some((tag) =>
        props.currentTechFilters.includes(tag as TechFilters),
      );

    const matchYear =
      props.currentYearFilters.length === 0 ||
      props.currentYearFilters.includes(member.graduationYear as YearFilters);

    return matchName && matchJob && matchTech && matchYear;
  });
});

watch(
  filteredMembers,
  () => {
    const count = filteredMembers.value.length;

    const newNodes = Object.fromEntries(
      filteredMembers.value.map((member, index) => [
        `node${index}`,
        { ...member },
      ]),
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
      filteredMembers.value.map((_, index) => {
        const targetIndex = (index + 1) % count;
        return makeEdgeEntry(index, targetIndex);
      }),
    );

    layout.nodes = {};
    for (let i = 0; i < filteredMembers.value.length; i++) {
      const randomX = Math.floor(Math.random() * 600) - 300;
      const randomY = Math.floor(Math.random() * 400) - 200;
      layout.nodes[`node${i}`] = { x: randomX, y: randomY };
    }

    Object.keys(edges).forEach((id) => delete edges[id]);
    Object.assign(edges, newEdges);
  },
  { immediate: true },
);

// buildNetwork(nodes, edges);

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
      normal: {
        radius: 12,
        color: "#111111",
        strokeWidth: 2,
        strokeColor: "#ff9933",
      },
      hover: {
        radius: 12,
        color: "#333333",
        strokeWidth: 2,
        strokeColor: "#ff9933",
      },
      label: {
        visible: true,
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: 12,
        lineHeight: 1.2,
        color: "#cccccc",
        margin: 6,
        direction: "south",
      },
      focusring: {
        color: "#ff9933",
        width: 4,
      },
    },
    edge: {
      normal: {
        color: "#333333",
        width: 2,
      },
      hover: {
        color: "#ff9933",
        width: 2,
      },
    },
  }),
);

// function buildNetwork(nodes: Record<string, Member>, edges: vNG.Edges) {
//   const count = members.length;

//   const newNodes = Object.fromEntries(
//     filteredMembers.value.map((member, index) => [
//       `node${index}`,
//       { ...member },
//     ]),
//   );

//   Object.keys(nodes).forEach((id) => delete nodes[id]);
//   Object.assign(nodes, newNodes);

//   const makeEdgeEntry = (id1: number, id2: number) => {
//     return [
//       `edge${id1}-${id2}`,
//       { source: `node${id1}`, target: `node${id2}` },
//     ];
//   };

//   const newEdges = Object.fromEntries(
//     filteredMembers.value.map((_, index) => {
//       const targetIndex = (index + 1) % count;
//       return makeEdgeEntry(index, targetIndex);
//     }),
//   );

//   layout.nodes = {};
//   for (let i = 0; i < members.length; i++) {
//     const randomX = Math.floor(Math.random() * 600) - 300;
//     const randomY = Math.floor(Math.random() * 400) - 200;
//     layout.nodes[`node${i}`] = { x: randomX, y: randomY };
//   }

//   Object.keys(edges).forEach((id) => delete edges[id]);
//   Object.assign(edges, newEdges);
// }

const eventHandlers: EventHandlers = {
  "node:click": ({ node, event }) => {
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
    <div class="menu-name">{{ menuState.member.name }}</div>
    <div class="menu-year">Class of {{ menuState.member.graduationYear }}</div>
    <a
      :href="menuState.member.url"
      target="_blank"
      rel="noopener noreferrer"
      class="menu-link"
    >
      View Site
    </a>
  </div>
</template>

<style scoped>
.graph {
  width: 100%;
  max-width: 800px;
  height: 600px;
  border: 2px solid #333333;
  background-color: transparent;
  border-radius: 4px;
}

.nodeMenu {
  position: fixed;
  z-index: 100;
  transform: translate(15px, 15px);

  background-color: #111111;
  color: #e8e8e8;
  padding: 12px 16px;
  border-radius: 4px;

  border: 1px solid #333333;
  border-left: 3px solid #ff9933;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  font-family: "Inter", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.menu-name {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
}

.menu-year {
  font-size: 12px;
  color: #888888;
  margin-bottom: 8px;
}

.menu-link {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
}
</style>
