
import "../component/graph/graph-view";

import '@greycat/web';
// initialize GreyCat SDK
await gc.sdk.init();

document.body.replaceChildren(
    <graph-view></graph-view>,
);
