module.exports = {
    extends: ["eslint:recommended", "google"],
    env: {node: true},
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        }
    },
    rules: {
        'require-jsdoc': 0,
        'new-cap': 0
    }
};
