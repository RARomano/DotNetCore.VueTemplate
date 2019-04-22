const screensPath = './components/screens';
const routes = [
  { name: 'home', path: '/', component: require(`${screensPath}/home/home.vue.html`).default },
];

export default routes;

export const getRoutePath = (name: string, trimEnd: boolean = false) => {
  const route = routes.find(route => route.name === name);
  if (route) {
    return trimEnd ? route.path.replace(/\/([^\/]+)?$/, '') : route.path;
  }
  return '';
};
