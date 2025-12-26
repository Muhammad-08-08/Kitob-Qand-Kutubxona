import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.15,
  trickleSpeed: 100,
  easing: "ease",
  speed: 300,
});

export default NProgress;
