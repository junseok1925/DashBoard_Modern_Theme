import React, {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';

const Block = styled.div`

`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReportViewer = () => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
}
  return (
    <Block style={{overflow: 'auto'}}>
    <Document file={'http://localhost:4000/goseongundefined.pdf'} onLoadSuccess={onDocumentLoadSuccess} size={[1280,720]}>
    {Array.from(new Array(numPages), (el, index) => (
    <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.7} />
    ))}
</Document></Block>
  );
}

export default ReportViewer;