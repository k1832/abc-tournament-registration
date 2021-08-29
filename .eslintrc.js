module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'parserOptions': {
        'ecmaVersion': 12,
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "function-call-argument-newline": [
            "error",
            "consistent"
        ],
        "quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "no-constant-condition": [
            "error",
            {
                "checkLoops": false
            }
        ],
        "semi": [
            "error"
        ],
        "no-var": "error",
        "prefer-const": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "no-console": "off",
        "no-undefined": "error",
        "dot-notation": "error",
        "no-extra-bind": "error",
        "no-multi-spaces": "error",
        "no-useless-return": "error",
        "no-irregular-whitespace": [
            "error",
            {
                "skipRegExps": true
            }
        ],
        "wrap-iife": "error",
        "no-lonely-if": "error",
        "space-in-parens": [
            "error",
            "never"
        ],
        "space-infix-ops": "error"
    }
};
