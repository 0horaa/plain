export function Plain() {
    function create(element, options) {
        const created = document.createElement(element);
        const children = options?.children;
        const attributes = options?.attributes;
        function executeByType(element, action) {
            if (element instanceof Element) {
                element[action](created);
            }
            else if (typeof element === "string") {
                document.querySelector(element)?.[action](created);
            }
            return created.cloneNode(true);
        }
        function setAttributes(element, attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        if (children) {
            if (children instanceof Element) {
                const nodeElement = children.cloneNode(true);
                created.appendChild(nodeElement);
            }
            else if (typeof children === "string") {
                const nodeText = document.createTextNode(children);
                created.appendChild(nodeText);
            }
        }
        if (attributes) {
            setAttributes(created, attributes);
        }
        function putBefore(element) {
            return executeByType(element, "before");
        }
        function putAfter(element) {
            return executeByType(element, "after");
        }
        function putInside(element) {
            return executeByType(element, "append");
        }
        function put(element) {
            return putInside(element);
        }
        return {
            putBefore,
            putAfter,
            putInside,
            put,
            created
        };
    }
    return {
        create
    };
}
