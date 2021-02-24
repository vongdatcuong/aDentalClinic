 // verifies if routeName is the one active (in browser input)
const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
}

export {activeRoute};

export default {
    activeRoute: activeRoute
}