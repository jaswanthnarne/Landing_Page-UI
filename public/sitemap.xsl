<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap - Ethnotech Academy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap');
          
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
          }
          
          .container {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 24px;
            padding: 35px;
            box-shadow: 0 4px 20px rgba(0, 74, 173, 0.03);
          }
          
          .header {
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 25px;
            margin-bottom: 30px;
          }
          
          .logo {
            width: 48px;
            height: 48px;
            object-fit: contain;
          }
          
          h1 {
            font-size: 22px;
            font-weight: 800;
            color: #004aad;
            margin: 0;
            letter-spacing: -0.02em;
          }
          
          .subtitle {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: #64748b;
            letter-spacing: 0.1em;
            margin-top: 4px;
          }
          
          p.desc {
            font-size: 14px;
            color: #64748b;
            line-height: 1.6;
            margin: 0 0 25px 0;
          }
          
          .stats {
            display: flex;
            gap: 12px;
            margin-bottom: 30px;
          }
          
          .stat-card {
            background-color: #f1f5f9/40;
            border: 1px solid #e2e8f0;
            padding: 12px 20px;
            border-radius: 14px;
            font-size: 12px;
            font-weight: 600;
            color: #475569;
          }
          
          .stat-card strong {
            color: #004aad;
            font-size: 14px;
            margin-left: 6px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          
          th {
            background-color: #f8fafc;
            border-bottom: 1.5px solid #e2e8f0;
            color: #475569;
            font-weight: 700;
            text-align: left;
            padding: 12px 16px;
          }
          
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #f1f5f9;
            font-weight: 500;
            color: #334155;
          }
          
          tr:last-child td {
            border-bottom: none;
          }
          
          tr:hover td {
            background-color: #f8fafc;
          }
          
          a {
            color: #004aad;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.15s ease;
          }
          
          a:hover {
            color: #1565c0;
            text-decoration: underline;
          }
          
          .badge {
            display: inline-block;
            padding: 4px 8px;
            font-size: 10.5px;
            font-weight: 700;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .badge-high {
            background-color: #eff6ff;
            color: #1e40af;
          }
          
          .badge-medium {
            background-color: #f8fafc;
            color: #475569;
          }
          
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            font-weight: 600;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img class="logo" src="https://res.cloudinary.com/ddwxonjbd/image/upload/v1781584361/ethnotech/assets/swqmbatcqgwpl1lcelez.png" alt="Ethnotech Logo" />
            <div>
              <h1>Ethnotech Academy</h1>
              <div class="subtitle">XML Sitemap Directory</div>
            </div>
          </div>
          
          <p class="desc">
            This XML Sitemap contains a list of public URLs for search engine indexers. 
            Browsers render this styled page to ensure human readability of the sitemap directories.
          </p>
          
          <div class="stats">
            <div class="stat-card">Total Indexable Pages: <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong></div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Page Path / URL</th>
                <th style="width: 100px;">Priority</th>
                <th style="width: 120px;">Change Freq</th>
                <th style="width: 120px;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                  </td>
                  <td>
                    <span class="badge">
                      <xsl:attribute name="class">
                        <xsl:choose>
                          <xsl:when test="s:priority &gt;= 0.8">badge badge-high</xsl:when>
                          <xsl:otherwise>badge badge-medium</xsl:otherwise>
                        </xsl:choose>
                      </xsl:attribute>
                      <xsl:value-of select="s:priority"/>
                    </span>
                  </td>
                  <td style="text-transform: capitalize;"><xsl:value-of select="s:changefreq"/></td>
                  <td><xsl:value-of select="s:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
        <div class="footer">
          Generated programmatically for finishingschools.jaswanthnarne.online
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
