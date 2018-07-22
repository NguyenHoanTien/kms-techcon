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
        'new-cap': 0,
        'no-console': 0,
        'space-before-function-paren': 0
    }
};
