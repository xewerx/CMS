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
        type: 'image',
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
                value: 'Home'
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
]

const handleText = (item) => {
    const element = document.getElementById(item.id);
    if (!element) {
        console.error(`Element with id ${item.id} not found`);
        return;
    }
    element.textContent = item.value;
}

const handleImage = (item) => {
    const element = document.getElementById(item.id);
    if (!element) {
        console.error(`Element with id ${item.id} not found`);
        return;
    }
    element.src = item.value;
}

const handleList = (item) => {
    const container = document.getElementById(item.id);
    if (!container) {
        console.error(`Element with id ${item.id} not found`);
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
        }
    }

    // remove extra elements
    if (targetElements.length > item.elements.length) {
        for (let i = item.elements.length; i < targetElements.length; i++) {
            targetElements[i].remove();
        }
    }

    // add extra elements
    if (targetElements.length < item.elements.length) {
        for (let i = targetElements.length; i < item.elements.length; i++) {
            const newElement = container.children[0].cloneNode(true)
            newElement.querySelector(item.path).textContent = item.elements[i].value;
            container.appendChild(newElement);
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
        }
    }
}

loadContent();