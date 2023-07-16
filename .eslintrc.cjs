/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {        
        "curly": "warn",        
        "prefer-const": "warn",
        "no-unused-vars": "warn",        
    }
};