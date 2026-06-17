import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, path }) {
    const siteTitle = "Ethnotech Academy";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const baseUrl = "https://finishingshcools.jaswanthnarne.online";
    const canonicalUrl = path ? `${baseUrl}${path}` : baseUrl;
    const defaultDescription = "Ethnotech Academy is a leading ed-tech company in India providing industry-aligned skilling, corporate training, Centres of Excellence (CoE), and career placement support in emerging technologies.";
    
    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            
            <link rel="canonical" href={canonicalUrl} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={canonicalUrl} />
            
            {/* Twitter */}
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:url" content={canonicalUrl} />
        </Helmet>
    );
}
