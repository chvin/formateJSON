'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// https://github.com/chvin/formateJSON

var format = function format(elm) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var space = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

    var getSpace = function getSpace(level, space) {
        return new Array((level + 1) * space).join(' ');
    };
    switch (getType(elm)) {
        case 'null':
            return '' + elm;
        case 'undefined':
            return 'null';
        case 'number':
            return '' + elm;
        case 'string':
            return '"' + elm + '"';
        case 'boolean':
            return '' + elm;
        case 'date':
            return JSON.stringify(elm);
        case 'regexp':
            // {}
            return JSON.stringify(elm);
        case 'object':
            {
                var o = '';
                var keys = Object.keys(elm);
                var length = keys.length;
                o += '{';
                var hasValue = false;
                keys.forEach(function (key, index) {
                    // ignore Symbol
                    if (_typeof(elm[key]) === 'symbol') {
                        return;
                    }
                    if (hasValue === false) {
                        o += '\n';
                        hasValue = true;
                    }
                    o += getSpace(level, space) + '"' + key + '": ' + format(elm[key], level + 1, space);
                    o += index === length - 1 ? '' : ',';
                    o += '\n';
                });
                if (hasValue) {
                    o += getSpace(level - 1, space) + '}';
                } else {
                    o += '}';
                }
                return o;
            };
        case 'array':
            {
                var _o = '';
                var _length = elm.length;
                _o += '[';
                elm.forEach(function (a, index) {
                    _o += '\n';
                    _o += getSpace(level, space);
                    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'symbol') {
                        _o += 'null';
                    } else {
                        _o += format(a, level + 1, space);
                    }
                    if (index !== _length - 1) {
                        _o += ', ';
                    }
                    if (index === _length - 1) {
                        _o += '\n';
                    }
                });
                _o += getSpace(level - 1, space);
                _o += ']';
                return _o;
            }
    }
    return '';
};

function getType(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
}

module.exports = function (elm) {
    var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var type = getType(elm);

    switch (type) {
        case 'number':
            // number
            return format(elm, 0, space);
        case 'object':
            {
                if ((typeof elm === 'undefined' ? 'undefined' : _typeof(elm)) === 'symbol') {
                    return undefined;
                }
                return format(JSON.parse(JSON.stringify(elm)), 0, space);
            }
        case 'array':
            {
                return format(JSON.parse(JSON.stringify(elm)), 0, space);
            }
        case 'string':
            {
                try {
                    var temp = JSON.parse(elm);
                    if (['array', 'object'].indexOf(getType(temp)) !== -1) {
                        return format(JSON.parse(JSON.stringify(temp)), 0, space);
                    } else {
                        return format(elm, 0, space);
                    }
                } catch (e) {
                    return format(elm, 0, space);
                }
            }
    }
};
