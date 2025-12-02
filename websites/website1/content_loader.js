// PLAN
// get data from database using public key
// replace html content with new content

// GET /website/content
const exampleApiResponse = [
    {
        type: 'text', // primitive type
        id: 'cmsText1',
        value: 'BurgerHouse',
    },
    {
        type: 'image', // primitive type
        id: 'cmsImage1',
        value: 'images/hero-bg.jpg',
    },
    {
        type: 'list', // complex type
        id: 'cmsHeaderNav',
        path: 'li > a', // path to the target elements
        elements: [
            {
                type: 'text',
                value: 'Home',
            },
            {
                type: 'text',
                value: 'Menu'
            },
            {
                type: 'text',
                value: 'About'
            },
            {
                type: 'text',
                value: 'Home Book'
            },
            {
                type: 'text',
                value: 'Home Book2'
            }
        ]
    },
    {
        type: 'list',
        id: 'cmsFoodList',
        path: 'div > .box > div', // path to the target elements
        elements: [
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
            {
                type: 'container',
                elements: [
                    {
                        type: 'image',
                        value: 'images/f2.png',
                        path: 'div > img'
                    },
                    {
                        type: 'text',
                        value: 'DELICIOUS PIZZA22',
                        path: 'div > h5'
                    },
                    {
                        type: 'text',
                        value: 'PYSZNY BURGER',
                        path: 'div > p'
                    },
                    {
                        type: 'text',
                        value: '$2202',
                        path: 'div > h6'
                    },
                ]
            },
        ]
    },
    {
        type: 'container',
        id: 'cmsContactDetails',
        elements: [
            {
                type: 'text',
                value: 'Contact Us Bro',
                path: 'h4'
            },
            {
                type: 'text',
                value: 'Location here',
                path: 'div > a > span'
            },
            {
                type: 'text',
                value: 'Call here +01 1234567890',
                path: 'div > a > span'
            },
            {
                type: 'text',
                value: 'email@gmail.com',
                path: 'div > a > span'
            },
        ]
    }
]

const handleText = (item) => {
    const textElement = document.getElementById(item.id);
    if (!textElement) {
        console.error(`Text element with id ${item.id} not found`);
        return;
    }
    textElement.textContent = item.value;
}

const handleImage = (item) => {
    const imageElement = document.getElementById(item.id);
    if (!imageElement) {
        console.error(`Image element with id ${item.id} not found`);
        return;
    }
    imageElement.src = item.value;
}

const handleList = (item) => {
    const container = document.getElementById(item.id);
    if (!container) {
        console.error(`List container with id ${item.id} not found`);
        return;
    }

    const targetElements = container.querySelectorAll(item.path)

    // replace existing elements
    for (let i = 0; i < targetElements.length; i++) {
        const targetElement = targetElements[i];
        const itemElement = item.elements[i];

        if (!itemElement) {
            break
        }

        if (itemElement.type === 'text') {
            targetElement.textContent = itemElement.value;
        } else if (itemElement.type === 'image') {
            targetElement.src = itemElement.value;
        }else if (itemElement.type === 'container') {
            handleContainer(itemElement, targetElement);
        }
    }

    // remove extra elements from list
    if (targetElements.length > item.elements.length) {
        for (let i = item.elements.length; i < targetElements.length; i++) {
            targetElements[i].remove();
        }
    }

    // // add extra elements to list
    if (targetElements.length < item.elements.length) {
        for (let i = targetElements.length; i < item.elements.length; i++) {
            const newElement = container.children[0].cloneNode(true)
            container.appendChild(newElement);

            if (item.elements[i].type === 'text') {
                newElement.querySelector(item.path).textContent = item.elements[i].value;
            } else if (item.elements[i].type === 'image') {
                newElement.querySelector(item.path).src = item.elements[i].value;
            } else if (item.elements[i].type === 'container') {
                handleContainer(item.elements[i], newElement);
            }
            
        }
    }
}

const handleContainer = (item, targetElement) => {
    const container = item.id ? document.getElementById(item.id) : targetElement;
    if (!container) {
        console.error(`Container with id ${item.id} not found`);
        return;
    }

    for (const element of item.elements) {
        if (element.type === 'text') {
            const textElement = container.querySelector(element.path);
            if (textElement) {
                textElement.textContent = element.value;
            }
        } else if (element.type === 'image') {
            const imageElement = container.querySelector(element.path);
            if (imageElement) {
                imageElement.src = element.value;
            }
        }
    }
}


const loadContent = () => {
    for (const content of exampleApiResponse) {
        if (content.type === 'text') {
            handleText(content);
        } else if (content.type === 'image') {
            handleImage(content);
        } else if (content.type === 'list') {
            handleList(content);
        } else if (content.type === 'container') {
            handleContainer(content);
        }
    }
}

loadContent();