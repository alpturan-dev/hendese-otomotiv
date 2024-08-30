import React, { useEffect } from 'react';

const DynamicOGTags = ({ title, description, image, url }) => {
    useEffect(() => {
        // Update OG tags when the component mounts or props change
        document.querySelector('meta[property="og:title"]').setAttribute('content', title);
        document.querySelector('meta[property="og:description"]').setAttribute('content', description);
        document.querySelector('meta[property="og:image"]').setAttribute('content', image);
        document.querySelector('meta[property="og:url"]').setAttribute('content', url);
    }, [title, description, image, url]);

    return (
        <>
            {/* Fallback tags for when JavaScript is disabled */}
            <meta property="og:title" content="Hendese Otomotiv | Default Title" />
            <meta property="og:description" content="Default Description" />
            <meta property="og:image" content="https://www.hendeseoto.com/default-image.jpg" />
            <meta property="og:url" content="https://www.hendeseoto.com" />
            <meta property="og:type" content="website" />
        </>
    );
};

export default DynamicOGTags;