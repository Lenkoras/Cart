/**
 * 
 * @param {HTMLElement} element 
 */
function css(element) {
    return new StyleObject(element);
}

/**
 * 
 * @param {HTMLElement} element 
 */
function StyleObject(element) {
    if (element == null || !(element instanceof HTMLElement)) {
        return;
    }
    this.element = element;
    /**
     * @type {{hide:string}}
     */
    this.options;
}

StyleObject.prototype.options = {
    hide: 'hidden'
};

/**
 * @param {...string}
 */
StyleObject.prototype.class = function () {
    var list = this.element.classList;
    if (arguments.length > 0) {
        list.add.apply(list, arguments);
    }
    return list;
};

/**
 * @param {...{}}
 */
StyleObject.prototype.style = function () {
    var style = this.element.style;
    for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        if (obj != null) {
            for (var key in obj) {
                var value = obj[key];
                var type = typeof value;
                if (type === 'number') {
                    value = value + 'px';
                }
                else if (type !== 'string') {
                    continue;
                }
                style[key] = value;
            }
        }
    }
    return style;
};

StyleObject.prototype.hide = function () {
    if (this.options.hide != null) {
        this.class(this.options.hide);
    }
    else {
        this.style().display = 'none';
    }
    return this;
};

StyleObject.prototype.show = function () {
    if (this.options.hide != null) {
        this.class().remove(this.options.hide);
    }
    else {
        this.style().display = null;
    }
    return this;
};