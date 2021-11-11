module.exports = {
    install: function(less, pluginManager, functions) {
        functions.add('left-position-from-theta', function(theta, nodeSize) {
            return `${50 + Math.cos(theta.value) * 50 - nodeSize.value / 2}%`;
        });
        functions.add('top-position-from-theta', function(theta, nodeSize) {
            return `${50 + Math.sin(theta.value) * 50 - nodeSize.value / 2}%`;
        });
    }
};
