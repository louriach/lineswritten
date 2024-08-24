// Fetch JSON data and dynamically create HTML content
fetch('design-systems.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('items-container');
        
        data.items.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';

            // Create the thumbnail image element
            if (item.listItem.thumbnail) {
                const img = document.createElement('img');
                img.src = item.listItem.thumbnail;
                img.className = 'thumbnail';
                listItem.appendChild(img);
            }

            // Create the body container
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'body';

            // Create label elements
            const labelWrap = document.createElement('div');
            labelWrap.className = 'label-wrap';

            item.listItem.body.labels.forEach(labelObj => {
                const span = document.createElement('span');
                span.className = 'label';
                span.textContent = labelObj.label;
                labelWrap.appendChild(span);
            });

            bodyDiv.appendChild(labelWrap);

            // Create content elements
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';

            // Callout (h3)
            const callout = document.createElement('h3');
            callout.className = 'callout';
            callout.textContent = item.listItem.body.content.callout;
            contentDiv.appendChild(callout);

            // Supplement paragraphs with possible links
            item.listItem.body.content.supplements.forEach(supplement => {
                const p = document.createElement('p');
                p.className = 'supplement';
                
                // Check for links in the supplement
                if (supplement.links && supplement.links.length > 0) {
                    // Split text by the word that needs to be linked
                    let currentText = supplement.text;
                    supplement.links.forEach(link => {
                        const linkIndex = currentText.indexOf(link.word);
                        if (linkIndex !== -1) {
                            // Text before the link
                            const beforeLinkText = currentText.slice(0, linkIndex);
                            p.appendChild(document.createTextNode(beforeLinkText));

                            // The link itself
                            const a = document.createElement('a');
                            a.href = link.href;
                            a.textContent = link.word;
                            a.className = 'inline-link';
                            p.appendChild(a);

                            // Update remaining text
                            currentText = currentText.slice(linkIndex + link.word.length);
                        }
                    });
                    // Append the remaining text after the last link
                    p.appendChild(document.createTextNode(currentText));
                } else {
                    // No links, add text normally
                    p.textContent = supplement.text;
                }

                contentDiv.appendChild(p);
            });

            // Buttons (links)
            item.listItem.body.content.buttons.forEach(buttonObj => {
                const a = document.createElement('a');
                a.href = buttonObj.href;
                a.className = 'button';
                a.textContent = buttonObj.text;
                contentDiv.appendChild(a);
            });

            bodyDiv.appendChild(contentDiv);
            listItem.appendChild(bodyDiv);
            container.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error loading the JSON data:', error));
