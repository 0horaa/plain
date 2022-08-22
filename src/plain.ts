export function Plain() {
    type ParamsType = Element | HTMLElement | Node | string | null;

    interface CreatePlainOptionsProps {
        children?: ParamsType;
        attributes?: {
            [key: string]: string;
        };
    }

    interface CreateProps {
        putBefore: (params: ParamsType) => Element | Node;
        putAfter: (params: ParamsType) => Element | Node;
        putInside: (params: ParamsType) => Element | Node;
        put: (params: ParamsType) => Element | Node;
        created: Element | Node;
    }

    function create(element: string, options?: CreatePlainOptionsProps): CreateProps {

        const created = document.createElement(element);
        const children = options?.children;
        const attributes = options?.attributes;

        function executeByType(
            element: ParamsType,
            action: "before" | "after" | "append"
        ) {
            if (element instanceof Element) {
                element[action](created);
            } else if (typeof element === "string") {
                document.querySelector(element)?.[action](created);
            }

            return created.cloneNode(true);
        }

        function setAttributes(element: Element, attributes: Object) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if (children) {
            if (children instanceof Element) {
                const nodeElement = children.cloneNode(true);
                created.appendChild(nodeElement);
            } else if (typeof children === "string") {
                const nodeText = document.createTextNode(children);
                created.appendChild(nodeText);
            }
        }

        if (attributes) {
            setAttributes(created, attributes);
        }

        function putBefore(element: ParamsType) {
            return executeByType(element, "before");
        }

        function putAfter(element: ParamsType) {
            return executeByType(element, "after");
        }

        function putInside(element: ParamsType) {
            return executeByType(element, "append");
        }

        function put(element: ParamsType) {
            return putInside(element);
        }

        return { 
            putBefore,
            putAfter,
            putInside,
            put,
            created
        }
    }

    return {
        create
    }
}