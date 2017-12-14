module.exports = {
    "env": {
        "browser": true,
      },
    "extends": "airbnb-base",
    
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "quotes": ["error", "double"],
        "indent": [
            "error",
            2
        ],
        "no-param-reassign": ["error", { "props": false }],
    }
};