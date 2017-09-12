// https://github.com/chvin/formateJSON

const format = (elm, level = 0, space = 4) => {
    const getSpace = (level, space) => {
        return new Array((level + 1) * space).join(' ');
    }
    switch (getType(elm)) {
        case 'null':
            return `${elm}`;
        case 'undefined':
            return 'null';
        case 'number':
            return `${elm}`;
        case 'string':
            return `"${elm}"`;
        case 'boolean':
            return `${elm}`;
        case 'date':
            return JSON.stringify(elm);
        case 'regexp': // {}
            return JSON.stringify(elm);
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
    }
    return '';
};

function getType(e){
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}

module.exports = (elm, space = 4) => {
    const type = getType(elm);

    switch (type) {
        case 'number': // number
            return format(elm, 0, space);
        case 'object': {
            if (typeof elm === 'symbol') {
                return undefined;
            }
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
    }
};
