// https://github.com/chvin/formateJSON

const format = (elm, level = 0, space = 4) => {
    const getSpace = (level, space) => {
        return new Array((level + 1) * space).join(' ');
    }
    switch (getType(elm)) {
        case 'object': {
            let o = '';
            const keys = Object.keys(elm);
            const length = keys.length;
            o += `{`;
            let hasValue = false;
            keys.forEach((key, index) => { // ignore Symbol
                if (typeof elm[key] === 'symbol') {
                    return;
                }
                if (hasValue === false) {
                    o += '\n';
                    hasValue = true;
                }
                o += `${getSpace(level, space)}"${key}": ${format(elm[key], level + 1, space)}`;
                o += index === length - 1 ? '' : ',';
                o += '\n';
            });
            if (hasValue) {
                o += `${getSpace(level - 1, space)}}`;
            } else {
                o += '}';
            }
            return o;
        };
        case 'array': {
            let o = '';
            const length = elm.length;
            o += `[`;
            elm.forEach((a, index) => {
                o += '\n';
                o += getSpace(level, space);
                if (typeof a === 'symbol') {
                    o += 'null';
                } else {
                    o += format(a, level + 1, space);
                }
                if (index !== length - 1) {
                    o += ', ';
                }
                if (index === length - 1) {
                    o += '\n';
                }
            });
            o += getSpace(level - 1, space);
            o += ']';
            return o;
        }
        default: return JSON.stringify(elm);
    }
    return '';
};

function getType(e){
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}

module.exports = (elm, space = 4) => {
    const type = getType(elm);
    switch (type) {
        case 'object': {
            return format(JSON.parse(JSON.stringify(elm)), 0, space);
        }
        case 'array': {
            return format(JSON.parse(JSON.stringify(elm)), 0, space);
        }
        case 'string': {
            try {
                const temp = JSON.parse(elm);
                if (['array', 'object'].includes(getType(temp))) {
                    return format(JSON.parse(JSON.stringify(temp)), 0, space);
                } else {
                    return format(elm, 0, space);
                }
            } catch (e) {
                return format(elm, 0, space);
            }
        }
        default: {
            // undefined, symbol, null, number, string, boolean, date, regexp
            return format(elm, 0, space);
        }
    }
};
