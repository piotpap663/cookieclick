module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },    
    "extends": ["eslint:recommended"],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};