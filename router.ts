import {
  createRouter,
  createWebHistory,
  type RouteComponent,
} from "vue-router";
import Home from "./views/Home.vue";
import Balls from "./views/Balls.vue";
import Clock from "./views/Clock.vue";
import Snake from "./views/Snake.vue";
import Evolution from "./views/Evolution.vue";
import { useVoiceCommands } from "./composables/voice";
import Flash from "./views/Flash.vue";
import Color from "./views/Color.vue";
import ColorPages from "./components/color/ColorPages.vue";
import ColorPage from "./components/color/ColorPage.vue";
import Idle from "./views/Idle.vue";
import Skill from "./components/idle/Skill.vue";
import IdleGameExplanation from "./components/idle/IdleGameExplanation.vue";
import Sell from "./components/idle/Sell.vue";
import Buy from "./components/idle/Buy.vue";
import Cube from "./views/Cube.vue";
import Merge from "./views/Merge.vue";
import Flipbook from "./views/Flipbook.vue";
import type { VoiceCommands } from "./definitions/voice";
import DashOffset from "./views/DashOffset.vue";

type Route = {
  path: string;
  component: RouteComponent;
  name: string;
  children?: Route[];
  parse?: (speech: string) => { [param: string]: string };
};

const routes: Route[] = [
  { path: "/", component: Home, name: "Home" },
  { path: "/balls", component: Balls, name: "Balls" },
  { path: "/clock", component: Clock, name: "Clock" },
  { path: "/snake", component: Snake, name: "Snake" },
  { path: "/evolution", component: Evolution, name: "Evolution" },
  { path: "/flash", component: Flash, name: "Flash" },
  { path: "/dash-offset", component: DashOffset, name: "Dash" },
  {
    path: "/color",
    component: Color,
    name: "Color",
    children: [
      { path: "", component: ColorPages, name: "Selection" },
      {
        path: ":pageName",
        component: ColorPage,
        name: "Free",
        parse: (speech) => {
          const page = /free\s(.*)/i.exec(speech);
          return { pageName: page ? page[1].toLowerCase() : "" };
        },
      },
      {
        path: ":pageName/guided",
        component: ColorPage,
        name: "Guided",
        parse: (speech) => {
          const page = /guided\s(.*)/i.exec(speech);
          return { pageName: page ? page[1].toLowerCase() : "" };
        },
      },
    ],
  },
  {
    path: "/idle",
    component: Idle,
    name: "Idle",
    children: [
      { path: "", component: IdleGameExplanation, name: "Explanation" },
      { path: "Sell", component: Sell, name: "Sell" },
      { path: "Buy", component: Buy, name: "Buy" },
      {
        path: ":skill",
        component: Skill,
        name: "Skill",
        parse: (speech) => {
          const skill = /skill\s([^\s]*)/i.exec(speech);
          return { skill: skill ? skill[1] : "" };
        },
      },
    ],
  },
  { path: "/cube", component: Cube, name: "Cube" },
  { path: "/merge", component: Merge, name: "Merge" },
  { path: "/flipbook", component: Flipbook, name: "Flipbook" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const routeCommands: VoiceCommands[] = [];

const addRouteCommand = (route: Route, prefix: string = "") => {
  const { name, parse } = route;
  if (route.children) {
    route.children.forEach((child) =>
      addRouteCommand(child, `${prefix}${name.toLowerCase()} `)
    );
  }
  routeCommands.push([
    `go to ${prefix}${name.toLowerCase()}`,
    (speech) => {
      const params = parse?.(speech) || {};
      router.push({ name, params });
      return Object.values(params);
    },
  ]);
};

routes.forEach((route) => addRouteCommand(route));

useVoiceCommands(routeCommands, true);

export default router;
