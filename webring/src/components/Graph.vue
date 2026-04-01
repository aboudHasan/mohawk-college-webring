<script setup lang="ts">
import { markRaw, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import * as vNG from "v-network-graph";
import {
  ForceLayout,
  type ForceEdgeDatum,
  type ForceNodeDatum,
} from "v-network-graph/lib/force-layout";
import "v-network-graph/lib/style.css";
import type { Member, Menu } from "../types";
import type { EventHandlers, Layouts } from "v-network-graph";

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
const selectedNodes = ref<string[]>([]);

const props = defineProps<{
  filteredMembers: Member[];
  highlightedMemberIndex: number | null;
}>();

const emit = defineEmits<{
  (e: "node-hover", index: number | null): void;
}>();

watch([() => props.highlightedMemberIndex, () => props.filteredMembers], () => {
  if (props.highlightedMemberIndex === null) {
    selectedNodes.value = [];
    return;
  }
  const nodeId = `node${props.highlightedMemberIndex}`;
  selectedNodes.value = nodeId in nodes ? [nodeId] : [];
});

watch(
  () => props.filteredMembers,
  (newFiltered) => {
    const count = newFiltered.length;

    const newNodes = Object.fromEntries(
      newFiltered.map((member, index) => [`node${index}`, { ...member }]),
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
      newFiltered.map((_, index) => {
        const targetIndex = (index + 1) % count;
        return makeEdgeEntry(index, targetIndex);
      }),
    );

    const newLayouts: Record<string, { x: number; y: number }> = {};
    for (let i = 0; i < count; i++) {
      const randomX = Math.floor(Math.random() * 600) - 300;
      const randomY = Math.floor(Math.random() * 1400) - 700;
      newLayouts[`node${i}`] = { x: randomX, y: randomY };
    }

    // Safely mutate layout to preserve reactivity proxy
    Object.keys(layout.nodes).forEach((id) => delete layout.nodes[id]);
    Object.assign(layout.nodes, newLayouts);

    Object.keys(edges).forEach((id) => delete edges[id]);
    Object.assign(edges, newEdges);
  },
  { immediate: true },
);

function hideMenu() {
  menuState.isVisible = false;
  selectedNodeID.value = "";
}

onMounted(() => {
  window.addEventListener("scroll", hideMenu, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", hideMenu);
});

const layoutHandler = markRaw(
  new ForceLayout({
    positionFixedByDrag: false,
    createSimulation: (d3, nodes, edges) => {
      const forceLink = d3
        .forceLink<ForceNodeDatum, ForceEdgeDatum>(edges)
        .id((d: { id: any }) => d.id)
        .distance(10)
        .strength(0.01);

      return d3
        .forceSimulation(nodes)
        .force("edge", forceLink)
        .force("charge", d3.forceManyBody().strength(-700))
        .force("center", d3.forceCenter().strength(0.01))
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
        strokeWidth: 1.5,
        strokeColor: "#ff9933",
      },
      hover: {
        radius: 12,
        color: "#111111", // Standardized to match normal state
        strokeWidth: 1.5,
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
        width: 2,
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

const eventHandlers: EventHandlers = {
  "node:pointerover": ({ node }) => {
    const index = parseInt(node.replace("node", ""), 10);
    emit("node-hover", isNaN(index) ? null : index);
  },
  "node:pointerout": () => {
    emit("node-hover", null);
  },
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
    v-model:selected-nodes="selectedNodes"
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
  height: 700px;
  border: 1px solid #333333;
  background-color: transparent;
  border-radius: 4px;
}

.graph :deep(circle) {
  transition:
    stroke-width 0.2s ease,
    fill 0.2s ease;
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
