import { configure } from "mobx";

export default (() => {
  configure({
    enforceActions: "never",
  });
})();
