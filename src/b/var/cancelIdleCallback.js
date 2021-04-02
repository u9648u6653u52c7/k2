export default window.cancelIdleCallback || function (id) { clearTimeout(id); }
