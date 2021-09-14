'use strict';

/**
 * 
 * @param {Element} element 
 */
function dispose(element) {
    if (element.remove != null) {
        element.remove();
    }
    else {
        element.parentNode.removeChild(element);
    }
}

function HTMLViewer() {
    var name = 'viewer';

    var container = document.getElementById(name);
    /**
     * @type {HTMLElement}
     */
    this.node;
    /**
     * @type {HTMLImageElement}
     */
    var media = null;

    if (container == null) {
        init();
    }
    else {
        media = document.getElementById('img-viewer');
        if (media == null) {
            dispose(container);
            init();
        }
    }
    Object.defineProperties(this, {
        name: { value: name },
        node: { get: function () { return container; } }
    });
}

/**
 * 
 * @param {Event} e 
 */
function close(e) {
    e.stopPropagation();
    if (e.target == this) {
        css(this).hide();
    }
}
/**
 * 
 * @param {string} name 
 * @returns {Promise<HTMLElement>}
 */
HTMLViewer.prototype.init = function (name) {
    var viewer = this;
    return node({
        id: name,
        append: [
            {
                class: 'prevbtn'
            },
            {
                append: {
                    tag: 'img',
                    id: 'img-viewer',
                    complete: function () {
                        media = this;
                    }
                }
            },
            {
                class: 'nextbtn'
            }
        ]
    })
        .then(function (node) {
            viewer.node = node;
            viewer.node.addEventListener('click', close);
        });
}

/**
 * @type {BaseViewer&HTMLViewer}
 */
function BaseViewer() {
    HTMLViewer.apply(this, arguments);

    /**
     * @type {string[]}
     */
    var list = [];
    var currentIndex = 0;

    /**
     * @param {...string}
     * @type {(...args:string[])=>void}
     */
    this.add = function () {
        for (var i = 0; i < arguments.length; i++) {
            list.push({ src: arguments[i] });
        }
    };

    /**
     * 
     * @param {number} index
     * @type {(index:number)=>void}
     */
    this.view = function (index) {
        if (index > -1 && index < list.length && currentIndex != index) {
            currentIndex = index;
            var item = list[index];

        }
    };

    this.next = function () {
        this.view(currentIndex + 1);
    };

    this.prev = function () {
        this.view(currentIndex - 1);
    };
}

/**
 * 
 * @param {string[]} array 
 */
BaseViewer.prototype.addRange = function(array) {
    this.add.apply(this, array);
};