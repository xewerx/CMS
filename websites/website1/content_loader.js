const cmsConfig = {
    apiUrl: 'http://localhost:8080',
    websiteId: 1,
    publicKey: 'public_key',
}

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


const loadContent = async () => {
    const response = await fetch(`${cmsConfig.apiUrl}/websites/${cmsConfig.websiteId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cmsConfig.publicKey}`,
        },
    });
    const data = await response.json();

    for (const content of data.content) {
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

(async () => {
    await loadContent();
})();