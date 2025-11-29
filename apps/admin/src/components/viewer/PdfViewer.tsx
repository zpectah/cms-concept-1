import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';
import { Box, Paper } from '@mui/material';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

interface PdfViewerProps {
  source: string;
}

const PdfViewer = ({ source }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation(['common']);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);

  const pageNumbers = numPages ? Array.from(new Array(numPages), (el, index) => index + 1) : [];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Box
      className="pdf-viewer-container"
      ref={containerRef}
      sx={{
        width: '100%',
        my: 2,
        p: 0,
        textAlign: 'center',
      }}
    >
      {containerWidth && (
        <Document
          file={source}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p>{t('label.loading')}</p>}
          error={<p>{t('label.errorWhileLoading')}</p>}
          noData={<p>{t('label.noFileToLoad')}</p>}
        >
          {pageNumbers.map((pageNumber) => (
            <Paper key={`page_${pageNumber}`} sx={{ m: '0 auto' }}>
              <Box component="p" sx={{ pt: 2, fontWeight: 'bold' }}>
                {pageNumber} / {numPages}
              </Box>
              <Page
                pageNumber={pageNumber}
                width={containerWidth}
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            </Paper>
          ))}
        </Document>
      )}
      {!containerWidth && <p>{t('label.preparing')}</p>}
    </Box>
  );
};

export default PdfViewer;
